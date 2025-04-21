import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Estacion } from "./types";

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
    multimedia: []
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetch(`${apiUrl}/estacion/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(() => setError("No se pudo cargar"));
    }
  }, [apiUrl, id, isEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setError(null); setSuccess(null);
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = `${apiUrl}/estacion/${isEdit ? '' : ''}`;
      const body = isEdit ? { id: Number(id), ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Error guardando");
      setSuccess("¡Guardado correctamente!");
      setTimeout(() => navigate("/admin/estaciones"), 1000);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">{isEdit ? "Editar" : "Crear"} Estación</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {(["numero", "nombre", "latitud", "longitud", "elementoInteractivo"] as const).map(field => (
          <div key={field}>
            <label className="block capitalize">{field}:</label>
            <input name={field} value={(form as any)[field]} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
        ))}
        <div>
          <label className="block">Multimedia (URLs separadas por coma):</label>
          <input
            value={form.multimedia?.join(", ")}
            onChange={e => setForm(prev => ({ ...prev, multimedia: e.target.value.split(",").map(s => s.trim()) }))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEdit ? "Actualizar" : "Crear"}</button>
          <button type="button" onClick={() => navigate("/admin/estaciones")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};