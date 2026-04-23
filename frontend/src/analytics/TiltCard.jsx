import Card from "./Card";

export default function TiltCard({ data }) {
  if (!data) return null;

  const { pitch, roll } = data.tilt;

  let status = "Stable";
  let color = "bg-green-100 text-green-600";
  let border = "border-green-300";

  if (Math.abs(roll) > 45) {
    status = "Danger";
    color = "bg-red-100 text-red-600";
    border = "border-red-300";
  } else if (Math.abs(roll) > 25) {
    status = "Warning";
    color = "bg-yellow-100 text-yellow-600";
    border = "border-yellow-300";
  }

  return (
    <Card title="Tilt Monitoring">
      <div className="flex flex-col items-center justify-center space-y-4">

        <div className="relative w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center">
          
          <div
            className="absolute w-1 h-10 bg-[#3B82F6] origin-bottom"
            style={{
              transform: `rotate(${roll}deg)`,
            }}
          />

          <span className="text-xs text-gray-400 absolute bottom-1">
            Roll
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Pitch: <span className="font-semibold text-[#1E3A8A]">{pitch}°</span>
          </p>
          <p className="text-sm text-gray-500">
            Roll: <span className="font-semibold text-[#1E3A8A]">{roll}°</span>
          </p>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${color} ${border}`}>
          {status}
        </div>
      </div>
    </Card>
  );
}