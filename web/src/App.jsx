const stock = [
  { id: 1, name: "Paracetamol 500mg", quantity: 240, sellingPrice: 0.10, expiryDate: "2027-06-30" },
  { id: 2, name: "Amikacin Injection 250mg/ml", quantity: 250, sellingPrice: 43.50, expiryDate: "2027-10-30" },
  { id: 3, name: "Abidec drop", quantity: 50, sellingPrice: 210, expiryDate: "2027-06-30" }
];

function App() {
  return (
    <main>
      <h1>Meditrack Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Selling Price (GH₵)</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.sellingPrice.toFixed(2)}</td>
              <td>{item.expiryDate}</td>
            </tr>
          ))}
        </tbody>
          
      </table>
    </main>
  )
};

export default App;