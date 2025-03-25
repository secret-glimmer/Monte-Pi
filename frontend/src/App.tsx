import { useState } from "react";
import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [numPoints, setNumPoints] = useState<number>(0);
  const [piEstimate, setPiEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const pointsPerRequest = 10000;
      const totalPages = Math.ceil(numPoints / pointsPerRequest);
      const requests = Array.from({ length: totalPages }, (_, index) =>
        axios.post(`${apiUrl}/points`, {
          numberOfPoints:
            index === totalPages - 1
              ? numPoints % pointsPerRequest || pointsPerRequest
              : pointsPerRequest,
        })
      );

      const responses = await Promise.all(requests);
      const insideCircle = responses.reduce((count, response) => {
        const points = response.data.points;
        return (
          count +
          points.filter(
            (point: { x: number; y: number }) =>
              Math.sqrt(point.x ** 2 + point.y ** 2) <= 1
          ).length
        );
      }, 0);

      const pi = (insideCircle / numPoints) * 4;
      setPiEstimate(pi);
      toast.success("Points generated successfully!");
    } catch (error) {
      console.error("Error generating points:", error);
      toast.error("Error generating points. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <h1>Estimate Pi using Monte Carlo Method</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="number"
          value={numPoints}
          onChange={(e) => setNumPoints(Number(e.target.value))}
          placeholder="Enter number of points"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Estimate Pi"}
        </button>
      </form>
      {piEstimate !== null && <h2>Estimated Pi: {piEstimate}</h2>}
      <ToastContainer />
    </div>
  );
}

export default App;
