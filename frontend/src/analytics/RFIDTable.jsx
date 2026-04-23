import Card from "./Card";

export default function RFIDTable({ data }) {
  if (!data) return null;

  return (
    <Card title="Inventory Details">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Tag</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.rfid.items.map((item) => (
            <tr key={item._id} className="border-t">
              <td>{item.name}</td>
              <td>{item.tag_id}</td>
              <td
                className={
                  item.in_stock
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {item.in_stock ? "In Stock" : "Missing"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}