import { useEffect, useState } from "react";
import api from "../api/axios";

function Clients() {
const [clients, setClients] = useState([]);
const [search, setSearch] = useState("");
const [editingId, setEditingId] = useState(null);

const [form, setForm] = useState({
name: "",
email: "",
company: "",
phone: "",
});

useEffect(() => {
fetchClients();
}, []);

const fetchClients = async () => {
try {
const response = await api.get(
`clients/?search=${search}`
);

  setClients(response.data);
} catch (error) {
  console.log(error.response?.data);
}


};


useEffect(() => {
  const delay = setTimeout(() => {
    fetchClients();
  }, 400);

  return () => clearTimeout(delay);
}, [search]);

const handleSubmit = async (e) => {
e.preventDefault();


try {
  if (editingId) {
    await api.put(
      `clients/${editingId}/`,
      form
    );

    setEditingId(null);
  } else {
    await api.post(
      "clients/",
      form
    );
  }

  setForm({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  fetchClients();

} catch (error) {
  console.log(error.response?.data);
}
  

};

const deleteClient = async (id) => {
if (
!window.confirm(
"Delete this client?"
)
) {
return;
}

  
try {
  await api.delete(
    `clients/${id}/`
  );

  fetchClients();
} catch (error) {
  console.log(error.response?.data);
}
  

};

const editClient = (client) => {
setEditingId(client.id);

  
setForm({
  name: client.name,
  email: client.email,
  company: client.company,
  phone: client.phone,
});

window.scrollTo({
  top: 0,
  behavior: "smooth",
});
  

};

return ( <div className="min-h-screen bg-[#070B14] text-white relative overflow-hidden p-6">

  <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]"></div>

  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]"></div>

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px]"></div>
</div>

  
  <div className="max-w-7xl mx-auto">

   <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
mb-8
flex
flex-col
md:flex-row
justify-between
items-center
gap-4
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
">
        Clients
      </h1>

      <span className="
bg-cyan-500/20
text-cyan-300
px-5
py-3
rounded-full
font-semibold
border
border-cyan-500/30
shadow-lg
shadow-cyan-500/20
">
        {clients.length} Clients
      </span>

    </div>

<div className="grid md:grid-cols-3 gap-5 mb-8">

  <div className="
bg-white/10
backdrop-blur-xl
border
border-cyan-500/20
rounded-3xl
p-6
shadow-xl
hover:scale-105
transition-all
duration-300
">
    <p className="text-cyan-300">
      Total Clients
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {clients.length}
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6 shadow-xl">
    <p className="text-green-300">
      Companies
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {
        clients.filter(
          c => c.company
        ).length
      }
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-xl">
    <p className="text-purple-300">
      Contacts
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {
        clients.filter(
          c => c.phone
        ).length
      }
    </h2>
  </div>

</div>
    <div className="bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
p-6
mb-8">

 <div className="flex flex-col md:flex-row gap-4 mb-8">

  <div className="relative flex-1">

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search by name, email, company..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
      w-full
      pl-12
      pr-4
      py-4
      bg-black/20
      border
      border-white/10
      rounded-2xl
      text-white
      placeholder-gray-500
      backdrop-blur-xl
      focus:border-cyan-500
      focus:ring-2
      focus:ring-cyan-500/20
      outline-none
      transition-all
      duration-300
      "
    />

  </div>

  <button
    type="button"
    onClick={fetchClients}
    className="
    px-8
    py-4
    rounded-2xl
    font-semibold
    text-white
    bg-gradient-to-r
    from-cyan-500
    via-blue-500
    to-purple-600
    hover:scale-105
    hover:shadow-xl
    hover:shadow-cyan-500/30
    transition-all
    duration-300
    "
  >
    Search
  </button>

  <button
  onClick={() => {
    window.open(
      "http://127.0.0.1:8000/api/projects/export/"
    );
  }}
  className="
  bg-gradient-to-r
  from-green-500
  to-emerald-600
  px-6
  py-3
  rounded-2xl
  text-white
  "
>
  Export CSV
</button>

</div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          placeholder="Client Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="bg-black/20
border
border-white/10
rounded-2xl
p-3
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none"
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
          className="bg-black/20
border
border-white/10
rounded-2xl
p-3
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none"
        />

        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({
              ...form,
              company:
                e.target.value,
            })
          }
          className="bg-black/20
border
border-white/10
rounded-2xl
p-3
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value,
            })
          }
          className="bg-black/20
border
border-white/10
rounded-2xl
p-3
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none"
        />

        <div className="md:col-span-2 flex gap-3">

          <div className="relative inline-block">

  <div className="
  absolute
  -inset-1
  bg-gradient-to-r
  from-cyan-500
  via-blue-500
  to-purple-500
  rounded-2xl
  blur
  opacity-40
  group-hover:opacity-70
  transition
  "></div>

  <button
    type="submit"
    className="
    relative
    bg-slate-900
    text-white
    px-8
    py-3
    rounded-2xl
    border
    border-cyan-500/20
    hover:border-cyan-400
    transition-all
    duration-300
    "
  >
    {editingId
      ? "✏️ Update Client"
      : "➕ Add Client"}
  </button>

</div>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(
                  null
                );

                setForm({
                  name: "",
                  email: "",
                  company: "",
                  phone: "",
                });
              }}
             className="
bg-gradient-to-r
from-slate-500
to-slate-700
hover:scale-105
hover:shadow-lg
transition-all
duration-300
"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>

    <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
hover:shadow-cyan-500/10
transition-all
duration-300
overflow-hidden
">

      <table className="w-full">

        <thead className="
bg-white/5
backdrop-blur-xl
border-b
border-white/10
">

          <tr>
            <th className="
text-left
p-4
text-cyan-300
font-semibold
">
              Name
            </th>

            <th className="
text-left
p-4
text-cyan-300
font-semibold
">
              Email
            </th>

            <th className="
text-left
p-4
text-cyan-300
font-semibold
">
              Company
            </th>

            <th className="
text-left
p-4
text-cyan-300
font-semibold
">
              Phone
            </th>

            <th className="
text-center
p-4
text-cyan-300
font-semibold
">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {clients.length > 0 ? (
            clients.map(
              (client) => (
                <tr
                  key={client.id}
                  className="
border-t
border-white/10
hover:bg-white/5
transition-all
duration-300
"
                >
                  <td className="p-4 font-medium text-white">
                    {client.name}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.email}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.company ||
                      "-"}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.phone ||
                      "-"}
                  </td>

                  <td className="p-4 text-gray-300">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          editClient(
                            client
                          )
                        }
                        className="
bg-gradient-to-r
from-yellow-500
to-orange-600
hover:scale-105
hover:shadow-lg
transition-all
duration-300
 px-4
                    py-2
                    rounded-xl
                    hover:scale-105
                    transition-all
                    duration-300
"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteClient(
                            client.id
                          )
                        }
                        className="
bg-gradient-to-r
from-red-500
to-pink-600
hover:scale-105
hover:shadow-lg
transition-all
duration-300
 px-4
                    py-2
                    rounded-xl
                    hover:scale-105
                    transition-all
                    duration-300
"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
             <td
  colSpan="5"
  className="text-center p-16"
>
  <div className="text-6xl mb-4">
    👥
  </div>

  <h3 className="text-2xl font-bold text-white mb-2">
    No Clients Found
  </h3>

  <p className="text-gray-400">
    Add your first client to get started.
  </p>
</td>
            </tr>
          )}

        </tbody>

      </table>

    </div>

  </div>

</div>
  

);
}

export default Clients;
