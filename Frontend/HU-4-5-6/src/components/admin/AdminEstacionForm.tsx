import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Estacion {
  id?: number;
  numero: string;
  nombre: string;
  latitud: string;
  longitud: string;
  elementoInteractivo: string;
  especimenes: { id: number }[];
}

interface Props {
  apiUrl: string;
}

export const AdminEstacionForm: React.FC<Props> = ({ apiUrl }) => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<Estacion>({
    numero: "",
    nombre: "",
    latitud: "",
    longitud: "",
    elementoInteractivo: "",
    especimenes: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetch(`${apiUrl}/estacion/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("No autorizado");
          return res.json();
        })
        .then(data => setForm(data))
        .catch(() => setError("No se pudo cargar la estación"));
    }
  }, [apiUrl, id, isEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEspecimenesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lista = e.target.value
      .split(",")
      .map(s => ({ id: Number(s.trim()) }))
      .filter(o => !isNaN(o.id));
    setForm(prev => ({ ...prev, especimenes: lista }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${apiUrl}/estacion/${id}`
        : `${apiUrl}/estacion`;
      const body = isEdit
        ? { id: Number(id), ...form }
        : form;

      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        throw new Error("No autorizado. Por favor inicia sesión.");
      }
      if (!res.ok) throw new Error("Error guardando estación");

      setSuccess("¡Guardado correctamente!");
      setTimeout(() => navigate("/admin/estaciones"), 1000);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Editar" : "Crear"} Estación
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {(["numero", "nombre", "latitud", "longitud", "elementoInteractivo"] as const).map(field => (
          <div key={field}>
            <label className="block capitalize">{field}:</label>
            <input
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block">Especímenes (IDs separados por coma):</label>
          <input
            value={form.especimenes.map(e => e.id).join(", ")}
            onChange={handleEspecimenesChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/estaciones")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
