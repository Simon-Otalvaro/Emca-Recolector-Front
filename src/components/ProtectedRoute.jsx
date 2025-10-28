import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.rol)) {
    // Si tiene rol, pero no está autorizado para esta ruta
    return <Navigate to="/dashboard" />;
  }

  // Si pasa todas las validaciones, renderiza la página
  return children;
}

export default ProtectedRoute;
