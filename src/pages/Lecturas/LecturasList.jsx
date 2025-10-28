import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import "./LecturasList.css";

function LecturasList() {
  const { token } = useAuth();
  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecturas = async () => {
      try {
        const res = await api.get("/lecturas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLecturas(res.data);
      } catch (error) {
        console.error("Error al obtener lecturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturas();
  }, [token]);

  if (loading) return <p>Cargando lecturas...</p>;

  return (
    <div className="lecturas-list">
      <h2>📋 Lecturas registradas</h2>
      {lecturas.length === 0 ? (
        <p>No hay lecturas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Distrito</th>
              <th>Sector</th>
              <th>Tipo de punto</th>
              <th>Presión PSI</th>
              <th>Observación</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {lecturas.map((lectura) => (
              <tr key={lectura.id}>
                <td>{lectura.id}</td>
                <td>{lectura.usuario?.nombre}</td>
                <td>{lectura.distrito?.nombre}</td>
                <td>{lectura.sector?.nombre}</td>
                <td>{lectura.tipoPunto}</td>
                <td>{lectura.presionPsi}</td>
                <td>{lectura.observacion}</td>
                <td>
                  {new Date(lectura.fechaLectura).toLocaleDateString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LecturasList;
