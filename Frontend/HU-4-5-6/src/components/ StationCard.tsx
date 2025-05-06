interface StationCardProps {
    id: number;
    name: string;
    description: string;
    image: string;
    onClick?: () => void;
  }
  
  const StationCard: React.FC<StationCardProps> = ({ id, name, description, image, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition"
      >
        <img src={image} alt={name} className="w-full h-32 object-cover rounded-md mb-2" />
        <h3 className="text-lg font-semibold text-emerald-800">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    );
  };
  
  export default StationCard;
  