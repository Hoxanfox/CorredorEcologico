import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EstacionInfo } from "./EstacionInfo";
import { EspecimenList } from "./EspecimenList";
import { ElementoInteractivo } from "./ElementoInteractivo";

// Interfaces
export interface Estacion {
  id: number;
  numero: string;
  nombre: string;
  latitud: string;
  longitud: string;
  elementoInteractivo?: string;
  especimenes?: { id: number }[];
}

export interface Especimen {
  id: number;
  nombre: string;
  reino?: {
    id: number;
    nombre: string;
  };
  etapas?: {
    id: number;
    nombre?: string;
  }[];
  imagenes?: {
    id?: number;
    direccion: string;
  }[];
}

const EstacionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [estacion, setEstacion] = useState<Estacion | null>(null);
  const [especimenes, setEspecimenes] = useState<Especimen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstacionData = async (): Promise<void> => {
      if (!id) return;

      try {
        const estacionResponse = await fetch(`http://localhost:8080/estacion/${id}`);
        if (!estacionResponse.ok) {
          throw new Error("No se pudo cargar la información de la estación");
        }
        const estacionData: Estacion = await estacionResponse.json();
        setEstacion(estacionData);

        if (estacionData.especimenes && estacionData.especimenes.length > 0) {
          const especimenesData = await Promise.all(
            estacionData.especimenes.map(async (esp) => {
              const especimenResponse = await fetch(`http://localhost:8080/especimen/${esp.id}`);
              if (!especimenResponse.ok) {
                return null;
              }
              return especimenResponse.json() as Promise<Especimen>;
            })
          );

          setEspecimenes(especimenesData.filter((esp): esp is Especimen => esp !== null));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Ocurrió un error al cargar los datos. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstacionData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Cargando información de la estación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/", { state: { zoom: 22 } })}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver al mapa
        </button>
      </div>
    );
  }

  if (!estacion) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg mb-4">Estación no encontrada</p>
        <button
          onClick={() => navigate("/", { state: { zoom: 22 } })}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver al mapa
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-4">
          <button
            onClick={() => navigate("/", { state: { zoom: 22 } })}
            className="text-white hover:underline mb-4 inline-block"
          >
            ← Volver al mapa
          </button>
          <h1 className="text-2xl font-bold mt-2">
            Estación {estacion.numero}: {estacion.nombre}
          </h1>
        </div>

        <div className="p-4">
          <EstacionInfo estacion={estacion} />
          <EspecimenList especimenes={especimenes} />
          {estacion.elementoInteractivo && <ElementoInteractivo url={estacion.elementoInteractivo} />}
        </div>
      </div>
    </div>
  );
};

export default EstacionDetail;
