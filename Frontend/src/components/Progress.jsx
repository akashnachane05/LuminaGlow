const Progress = ({ value, className }) => (
    <div className={`relative ${className} bg-gray-200 rounded-full`}>
      <div
        className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
export default Progress;  