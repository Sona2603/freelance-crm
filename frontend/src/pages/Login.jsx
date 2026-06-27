import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

useEffect(() => {
const token = localStorage.getItem("access");


if (token) {
  navigate("/dashboard");
}


}, [navigate]);

const handleSubmit = async (e) => {
e.preventDefault();


setLoading(true);

try {
  const response = await api.post("token/", {
    username,
    password,
  });

  localStorage.setItem(
    "access",
    response.data.access
  );

  localStorage.setItem(
    "refresh",
    response.data.refresh
  );

  navigate("/dashboard");
} catch (error) {
  console.log(error.response?.data);
  toast.error("Invalid username or password");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-6 relative overflow-hidden">
<div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]"></div>

<div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]"></div>

<div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px]"></div>

  <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
overflow-hidden
shadow-2xl
w-full
max-w-5xl
grid
md:grid-cols-2
">
    <div className="
hidden
md:flex
flex-col
justify-center
bg-gradient-to-br
from-cyan-600/30
via-blue-600/20
to-purple-600/30
backdrop-blur-xl
text-white
p-10
">
  <h1 className="
text-5xl
font-black
bg-gradient-to-r
from-cyan-400
via-purple-400
to-pink-400
bg-clip-text
text-transparent
mb-4
">
  Freelance CRM
</h1>

      <p className="text-slate-300 text-lg">
  Manage clients, projects and tasks from a single dashboard.
</p>
    </div>

    <div className="p-10 text-white">

     <h2 className="text-4xl font-bold text-center mb-2">
  Welcome Back
</h2>

<p className="text-slate-400 text-center mb-8">
  Login to your account
</p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
w-full
bg-black/20
border
border-white/10
rounded-2xl
p-4
text-white
placeholder-slate-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
"
        />

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
w-full
bg-black/20
border
border-white/10
rounded-2xl
p-4
text-white
placeholder-slate-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
"
            required
          />

          <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="
    absolute
    right-3
    top-1/2
    -translate-y-1/2
    w-10
    h-10
    rounded-xl
    bg-white/5
    hover:bg-cyan-500/20
    border
    border-white/10
    flex
    items-center
    justify-center
    transition-all
    duration-300
  "
>
  {showPassword ? <FiEyeOff /> : <FiEye />}
</button>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
w-full
bg-gradient-to-r
from-cyan-500
via-blue-500
to-purple-600
text-white
font-semibold
p-4
rounded-2xl
shadow-lg
shadow-cyan-500/25
hover:scale-[1.02]
transition-all
duration-300
disabled:opacity-50
"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      <p className="text-center mt-6 text-slate-400">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-cyan-400 hover:text-cyan-300 font-semibold"
  >
    Register
  </Link>
</p>
    </div>

  </div>

</div>


);
}

export default Login;
