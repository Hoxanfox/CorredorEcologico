import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { senderoCoords } from "../environment/processSendero";
import { useNavigate, useLocation } from "react-router-dom";

// Importa íconos
import icon1 from "../assets/images.png";
import icon2 from "../assets/images.png";
import icon3 from "../assets/images.png";
import iconImg from "../assets/images.png";

// Interfaces
interface Estacion {
  id: number;
  position: [number, number];
  label: string;
  numero: string;
  resumen: string;
  iconUrl?: string;
}

interface EstacionAPI {
  id: number;
  numero: string;
  nombre: string;
  latitud: string;
  longitud: string;
}

// Funciones para cálculo de distancia
const getDistanceFromLatLonInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // Radio de la Tierra en metros
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const isNearSendero = (
  lat: number,
  lon: number,
  threshold = 100 // metros
) => {
  return senderoCoords.some(([sLat, sLon]) => {
    const dist = getDistanceFromLatLonInMeters(lat, lon, sLat, sLon);
    return dist <= threshold;
  });
};

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const center: L.LatLngTuple = [4.074410, -73.584087];
  const [zoom] = useState<number>(location.state?.zoom || 22);
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/estacion/");
        if (!res.ok) throw new Error("Error al cargar estaciones");
        const data: EstacionAPI[] = await res.json();

        const getIconByNumero = (numero: string): string => {
          switch (numero) {
            case "1":
              return icon1;
            case "2":
              return icon2;
            case "3":
              return icon3;
            default:
              return iconImg;
          }
        };

        const mapped = data.map<Estacion>((e) => ({
          id: e.id,
          position: [parseFloat(e.latitud), parseFloat(e.longitud)],
          label: e.nombre,
          numero: e.numero,
          resumen: `Estación ${e.numero}: ${e.nombre}`,
          iconUrl: getIconByNumero(e.numero),
        }));

        setEstaciones(mapped);
      } catch (err) {
        console.error("❌ Error al cargar estaciones:", err);
        setEstaciones([
          {
            id: 13,
            position: senderoCoords[0],
            label: "Estacion 13",
            numero: "13",
            resumen: "esta estacion es donde se hacen lacteos ",
            iconUrl: icon1,
          },
          {
            id: 14,
            position: senderoCoords[1],
            label: "Estacion 14",
            numero: "14",
            resumen: "en esta estacion se guardan tesoros y plantas",
            iconUrl: icon2,
          },
          {
            id: 15,
            position: senderoCoords[senderoCoords.length - 1],
            label: "Estacion 15",
            numero: "15",
            resumen: "en esta estacion esta la historia y esqueletos",
            iconUrl: icon3,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("📵 Geolocalización no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("📍 Ubicación actual:", latitude, longitude);

        if (isNearSendero(latitude, longitude)) {
          console.log("✅ Cerca del sendero, mostrando ubicación");
          setUserPosition([latitude, longitude]);
        } else {
          console.log("🚫 Lejos del sendero");
        }
      },
      (err) => {
        console.error("❌ Error de geolocalización:", err.message);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const navigateToEstacionDetail = (id: number) => {
    window.location.href = `http://localhost:4200/estacion/${id}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando mapa...
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className="h-screen w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={senderoCoords} color="blue" weight={4} opacity={0.7} />

      {estaciones.map((est) => {
        const icon = new L.Icon({
          iconUrl: est.iconUrl || iconImg,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        return (
          <Marker key={est.id} position={est.position} icon={icon}>
            <Popup>
              <h2 className="font-bold">{est.label}</h2>
              <p>{est.resumen}</p>
              <button
                onClick={() => navigateToEstacionDetail(est.id)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              >
                Ver detalles
              </button>
            </Popup>
          </Marker>
        );
      })}

      {userPosition && (
        <Marker position={userPosition}>
          <Popup>
            <strong>📍 Estás aquí</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
