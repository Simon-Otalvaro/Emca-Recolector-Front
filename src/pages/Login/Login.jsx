import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUser, FiLock } from "react-icons/fi";
import api from "../../api/axiosConfig";
import "./Login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { usuario, contrasena });
      login(res.data.usuario, res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas o servidor no disponible.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img
            src="/logo-color.png"
            alt="EMCA Logo"
            className="logo-image"
          />
        </div>

        <p>Sistema recolector de datos hídricos</p>
        <h2 className="login-title">Iniciar Sesión:</h2>

        <div className="input-group">
          <FiUser className="input-icon" />
          <p>Ingresa tu usuario:</p>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FiLock className="input-icon" />
          <p>Digita tu contraseña:</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-btn" type="submit">
          Ingresar
        </button>

        <p className="register-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}
