import { useState } from "react";
import { Link } from "react-router-dom"; // Añadimos Link para el enlace de Login
import "./Register.css";
import api from "../../api/axiosConfig";
import { FiUser, FiLock, FiMail } from "react-icons/fi"; // Asumiendo que ya instalaste react-icons

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("operador");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/usuarios", {
        nombre,
        usuario,
        contrasena,
        rol,
      });
      console.log("Usuario creado:", response.data);
      setMensaje(`✅ Usuario "${nombre}" creado correctamente`);
      setNombre("");
      setUsuario("");
      setContrasena("");
    } catch (error) {
      console.error("Error al registrar:", error);
      // Asume que el backend devuelve un error específico. Si no, usa el genérico.
      const errorMsg = error.response?.data?.message || "❌ Error al registrar el usuario";
      setMensaje(errorMsg);
    }
  };

  return (
    <div className="login-container"> {/* Usamos login-container para consistencia */}
      <form className="login-form" onSubmit={handleSubmit}> {/* Usamos login-form */}
        
        <h2 className="login-title">Registrar Usuario</h2>

        {mensaje && <p className="login-error">{mensaje}</p>} {/* Usamos login-error */}

        {/* Input Nombre */}
        <div className="input-group">
          <p>Nombre Completo</p>
          <span className="input-icon"><FiMail size={20} /></span>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        {/* Input Usuario */}
        <div className="input-group">
          <p>Nombre de Usuario</p>
          <span className="input-icon"><FiUser size={20} /></span>
          <input
            type="text"
            placeholder="Ej: jper_01"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        {/* Input Contraseña */}
        <div className="input-group">
          <p>Contraseña</p>
          <span className="input-icon"><FiLock size={20} /></span>
          <input
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        
        {/* Select Rol (Ajustamos el estilo para que se parezca al input) */}
        <div className="input-group">
          <p>Rol del Usuario</p>
          <select 
            value={rol} 
            onChange={(e) => setRol(e.target.value)}
            className="styled-select" // Nueva clase para el select
          >
            <option value="admin">Administrador</option>
            <option value="operador">Operador</option>
          </select>
        </div>


        <button type="submit" className="login-btn">Registrar</button> {/* Usamos login-btn */}

        <p className="register-text">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>

      </form>
    </div>
  );
}