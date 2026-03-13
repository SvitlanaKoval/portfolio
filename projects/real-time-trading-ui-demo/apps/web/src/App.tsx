import { useEffect } from "react";
import { startWs } from "./lib/ws/client";
import { useStore } from "./state/store";
import "./App.css";

function App() {
  const quotesBySymbol = useStore((s) => s.quotesBySymbol);
  const connection = useStore((s) => s.connection);

  useEffect(() => {
    startWs();
  }, []);

  const quotes = Object.values(quotesBySymbol);

  return (
    <main style={{ padding: 20 }}>
      <h1>Real-Time Trading UI</h1>
      <p>Live market data dashboard</p>

      <div style={{ marginBottom: 20 }}>
        <strong>Status:</strong> {connection}
      </div>

      <h2>Watchlist</h2>

      {quotes.length === 0 ? (
        <p>Waiting for market data...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 16,
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: 8 }}>Symbol</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Price</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Bid</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Ask</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Change</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Change %</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: 8 }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.symbol}>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{q.symbol}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", textAlign: "right" }}>{q.price.toFixed(2)}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", textAlign: "right" }}>{q.bid.toFixed(2)}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", textAlign: "right" }}>{q.ask.toFixed(2)}</td>
                <td
                  style={{
                    padding: 8,
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                    color: q.change >= 0 ? "green" : "red",
                  }}
                >
                  {q.change.toFixed(2)}
                </td>
                <td
                  style={{
                    padding: 8,
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                    color: q.changePct >= 0 ? "green" : "red",
                  }}
                >
                  {q.changePct.toFixed(2)}%
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", textAlign: "right" }}>
                  {q.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;