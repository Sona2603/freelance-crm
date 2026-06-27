import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

function Register() {
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [form, setForm] = useState({
username: "",
email: "",
password: "",
confirmPassword: "",
});

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

if (
  form.password !==
  form.confirmPassword
) {
  toast.error("Passwords do not match");
  return;
}

setLoading(true);

try {
  await api.post("accounts/register/", {
    username: form.username,
    email: form.email,
    password: form.password,
  });

  toast.success(
    "Registration successful. Please login."
  );

  navigate("/");
} catch (error) {
  console.log(error.response?.data);
  toast.error("Registration failed");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden flex items-center justify-center p-6">
<div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]"></div>

  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]"></div>

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px]"></div>
</div>

 <div
  className="
  w-full
  max-w-5xl
  grid
  md:grid-cols-2
  bg-white/10
  backdrop-blur-2xl
  border
  border-white/10
  rounded-3xl
  overflow-hidden
  shadow-2xl
"
>

    <div
  className="
  hidden
  md:flex
  flex-col
  justify-center
  p-12
  bg-gradient-to-br
  from-cyan-500/20
  via-purple-500/20
  to-pink-500/20
"
>

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

      <p className="text-slate-300 text-lg leading-relaxed">
        Create your account and start
        managing clients, projects and
        tasks efficiently.
      </p>

    </div>

    <div className="p-10">

      <h2 className="text-4xl font-black text-white text-center mb-2">
        Create Account
      </h2>

      <p className="text-slate-400 text-center mb-8">
        Register to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          className="
w-full
bg-black/20
border
border-white/10
rounded-2xl
p-4
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="
w-full
bg-black/20
border
border-white/10
rounded-2xl
p-4
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
"
          required
        />

        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={form.password}
    onChange={(e) =>
      setForm({
        ...form,
        password: e.target.value,
      })
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
    text-slate-300
    "
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </button>
</div>

        <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={form.confirmPassword}
    onChange={(e) =>
      setForm({
        ...form,
        confirmPassword: e.target.value,
      })
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
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
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
    text-slate-300
    "
  >
    {showConfirmPassword ? (
      <FiEyeOff />
    ) : (
      <FiEye />
    )}
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
hover:scale-[1.02]
transition-all
duration-300
shadow-lg
shadow-cyan-500/25
disabled:opacity-50

"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </div>

  </div>

</div>


);
}

export default Register;
