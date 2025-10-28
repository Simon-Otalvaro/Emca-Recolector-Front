import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import "./LecturaForm.css";

function LecturaForm() {
  const { token } = useAuth();

  const [distritos, setDistritos] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [formData, setFormData] = useState({
    distritoId: "",
    sectorId: "",
    tipoPunto: "",
    presionPsi: "",
    observacion: "",
  });

  // 🔹 Cargar distritos al iniciar
  useEffect(() => {
    const fetchDistritos = async () => {
      try {
        const res = await api.get("/catalogos/distritos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDistritos(res.data);
      } catch (error) {
        console.error("Error al cargar distritos:", error);
      }
    };
    fetchDistritos();
  }, [token]);

  // 🔹 Cargar sectores cuando cambia el distrito
  useEffect(() => {
    const fetchSectores = async () => {
      if (!formData.distritoId) return;
      try {
        const res = await api.get(
          `/catalogos/sectores/${formData.distritoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSectores(res.data);
      } catch (error) {
        console.error("Error al cargar sectores:", error);
      }
    };
    fetchSectores();
  }, [formData.distritoId, token]);

  // 🔹 Manejador de cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post(
        "/lecturas",
        {
          distritoId: Number(formData.distritoId),
          sectorId: Number(formData.sectorId),
          tipoPunto: formData.tipoPunto,
          presionPsi: parseFloat(formData.presionPsi),
          observacion: formData.observacion,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje("✅ Lectura registrada correctamente");
      console.log("Lectura creada:", res.data);

      setFormData({
        distritoId: "",
        sectorId: "",
        tipoPunto: "",
        presionPsi: "",
        observacion: "",
      });
      setSectores([]);
    } catch (error) {
      console.error("Error al registrar lectura:", error);
      setMensaje("❌ Error al registrar la lectura");
    }
  };

  return (
    <div className="lectura-form">
      <h2>➕ Registrar Lectura</h2>
      <form onSubmit={handleSubmit}>
        <label>Distrito:</label>
        <select
          name="distritoId"
          value={formData.distritoId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un distrito</option>
          {distritos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        <label>Sector:</label>
        <select
          name="sectorId"
          value={formData.sectorId}
          onChange={handleChange}
          required
          disabled={!formData.distritoId}
        >
          <option value="">Seleccione un sector</option>
          {sectores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>

        <label>Tipo de punto:</label>
        <input
          type="text"
          name="tipoPunto"
          value={formData.tipoPunto}
          onChange={handleChange}
          required
        />

        <label>Presión PSI:</label>
        <input
          type="number"
          name="presionPsi"
          value={formData.presionPsi}
          onChange={handleChange}
          required
        />

        <label>Observación:</label>
        <textarea
          name="observacion"
          value={formData.observacion}
          onChange={handleChange}
        />

        <button type="submit">Guardar Lectura</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default LecturaForm;
