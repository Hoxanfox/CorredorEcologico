

interface ElementoInteractivoProps {
    url: string;
  }
  
  export const ElementoInteractivo: React.FC<ElementoInteractivoProps> = ({ url }) => {
    return (
      <div className="mt-6 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-3">Elemento Interactivo</h2>
        <p className="mb-3">
          Esta estación cuenta con un elemento interactivo que puedes explorar.
        </p>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          onClick={() => window.open(url, '_blank')}
        >
          Abrir elemento interactivo
        </button>
      </div>
    );
  };