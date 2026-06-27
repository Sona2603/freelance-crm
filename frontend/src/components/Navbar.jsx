import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }
  if(location.pathname==="/register"){
    return null;
  }

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

 const linkClass = (path) =>
  `px-4 py-2 rounded-xl transition-all duration-300 ${
    location.pathname === path
      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;
  return (
    <nav className="
sticky top-0 z-50
bg-gradient-to-r
from-[#0F172A]/95
via-[#111827]/95
to-[#1E1B4B]/95
backdrop-blur-xl
border-b border-white/10
shadow-2xl
">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          <h1 className="
text-2xl font-black
bg-gradient-to-r
from-cyan-400
via-blue-400
to-purple-500
bg-clip-text
text-transparent
">
  Freelance CRM
</h1>

          <div className="flex items-center gap-3">

            <Link
              to="/dashboard"
              className={linkClass("/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/clients"
              className={linkClass("/clients")}
            >
              Clients
            </Link>

            <Link
              to="/projects"
              className={linkClass("/projects")}
            >
              Projects
            </Link>

            <Link
              to="/tasks"
              className={linkClass("/tasks")}
            >
              Tasks
            </Link>

            <button
  onClick={logout}
  className="
  bg-gradient-to-r
  from-red-500
  to-pink-600
  text-white
  px-4
  py-2
  rounded-xl
  hover:scale-105
  transition-all
  duration-300
  shadow-lg
"
>
  Logout
</button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;