
import { Estacion, Especimen } from "./EstacionDetail";
import { EspecimenCard } from "./EspecimenCard"; // Ensure this path is correct
interface EspecimenListProps {
    especimenes: Especimen[];
  }
  
  export const EspecimenList: React.FC<EspecimenListProps> = ({ especimenes }) => {
    if (!especimenes || especimenes.length === 0) {
      return (
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Especímenes</h2>
          <p className="text-gray-600">No hay especímenes registrados en esta estación.</p>
        </div>
      );
    }
  
    return (
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Especímenes en esta estación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {especimenes.map((especimen) => (
            <EspecimenCard key={especimen.id} especimen={especimen} />
          ))}
        </div>
      </div>
    );
  };