import { useAuth } from "../../context/AuthContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>EMCA</h2>
        <nav>
          <Link to="/dashboard/lecturas">📊 Lecturas</Link>
          <Link to="/dashboard/registrar">🧾 Registrar Lectura</Link>
          <Link to="/dashboard/catalogos">⚙️ Catálogos</Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <span>👋 Hola, {user?.nombre || "Usuario"}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
