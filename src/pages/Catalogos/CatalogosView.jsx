import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import "./CatalogosView.css";

function CatalogosView() {
  const { token } = useAuth();
  const [distritos, setDistritos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const res = await api.get("/catalogos/distritos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDistritos(res.data);
      } catch (error) {
        console.error("Error al obtener catálogos:", error);
      }
    };
    fetchCatalogos();
  }, [token]);

  const preloadCatalogos = async () => {
    try {
      const res = await api.post(
        "/catalogos/preload",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje(res.data.message || "Catálogos precargados correctamente ✅");
      setTimeout(() => setMensaje(""), 4000);
    } catch (error) {
      console.error("Error al precargar catálogos:", error);
      setMensaje("❌ Error al precargar catálogos");
    }
  };

  return (
    <div className="catalogos-view">
      <h2>📚 Catálogos</h2>
      <button onClick={preloadCatalogos}>Precargar Catálogos</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="distritos-lista">
        {distritos.map((d) => (
          <div key={d.id} className="distrito-card">
            <h3>{d.nombre || "Sin nombre"}</h3>
            <ul>
              {d.sectores.length > 0 ? (
                d.sectores.map((s) => <li key={s.id}>{s.nombre}</li>)
              ) : (
                <li>Sin sectores</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogosView;
