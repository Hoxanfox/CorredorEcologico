
import { Estacion, Especimen } from "./EstacionDetail";

interface EspecimenCardProps {
    especimen: Especimen;
  }
  
  export const EspecimenCard: React.FC<EspecimenCardProps> = ({ especimen }) => {
    return (
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg mb-1">{especimen.nombre}</h3>
        <p className="text-sm text-gray-600">
          Reino: {especimen.reino?.nombre || "No especificado"}
        </p>
        
        {especimen.etapas && especimen.etapas.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Etapas:</p>
            <ul className="list-disc pl-5 text-sm">
              {especimen.etapas.map((etapa, idx) => (
                <li key={idx}>{etapa.nombre || `Etapa ${etapa.id}`}</li>
              ))}
            </ul>
          </div>
        )}
        
        {especimen.imagenes && especimen.imagenes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Imágenes:</p>
            <div className="flex flex-wrap gap-2">
              {especimen.imagenes.map((img, idx) => (
                <div key={idx} className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={img.direccion} 
                    alt={`${especimen.nombre} - imagen ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };