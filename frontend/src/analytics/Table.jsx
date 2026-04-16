export default function Table({ data }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Time</th>
          <th>Temp</th>
          <th>Humidity</th>
          <th>AQI</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(-10).map((d) => (
          <tr key={d._id}>
            <td>{new Date(d.timestamp).toLocaleTimeString()}</td>
            <td>{d.temperature}</td>
            <td>{d.humidity}</td>
            <td>{d.gas?.aqi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}