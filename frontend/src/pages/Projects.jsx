import { useEffect, useState } from "react";
import api from "../api/axios";

function Projects() {
const [projects, setProjects] = useState([]);
const [clients, setClients] = useState([]);
const [search, setSearch] = useState("");
const [editingId, setEditingId] = useState(null);

const [form, setForm] = useState({
client: "",
title: "",
description: "",
budget: "",
deadline: "",
status: "Pending",
});

useEffect(() => {
fetchProjects();
fetchClients();
}, []);

const fetchProjects = async () => {
try {
const response = await api.get(
`projects/?search=${search}`
);

  
  setProjects(response.data);
} catch (error) {
  console.log(error.response?.data);
}
  

};

const fetchClients = async () => {
try {
const response = await api.get("clients/");
setClients(response.data);
} catch (error) {
console.log(error.response?.data);
}
};

const handleSubmit = async (e) => {
e.preventDefault();

  
try {
  if (editingId) {
    await api.put(
      `projects/${editingId}/`,
      form
    );

    setEditingId(null);
  } else {
    await api.post(
      "projects/",
      form
    );
  }

  setForm({
    client: "",
    title: "",
    description: "",
    budget: "",
    deadline: "",
    status: "Pending",
  });

  fetchProjects();

} catch (error) {
  console.log(error.response?.data);
}
  

};

const deleteProject = async (id) => {
if (
!window.confirm(
"Delete this project?"
)
) {
return;
}

  
try {
  await api.delete(
    `projects/${id}/`
  );

  fetchProjects();
} catch (error) {
  console.log(error.response?.data);
}
  

};

const editProject = (project) => {
setEditingId(project.id);

  
setForm({
  client: project.client,
  title: project.title,
  description: project.description,
  budget: project.budget,
  deadline: project.deadline,
  status: project.status,
});

window.scrollTo({
  top: 0,
  behavior: "smooth",
});
  

};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-300 border border-green-500/30";

    case "In Progress":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

    default:
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
  }
};
return ( 
<div className="min-h-screen bg-[#070B14] text-white relative overflow-hidden p-6">

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
    Projects
  </h1>
<p className="text-gray-400 mt-2">
  Manage projects, budgets, deadlines and deliveries.
</p>
  <span className="
  bg-purple-500/20
  text-purple-300
  px-5
  py-3
  rounded-full
  font-semibold
  border
  border-purple-500/30
  shadow-lg
  shadow-purple-500/20
  ">
    {projects.length} Projects
  </span>

</div>

<div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-white/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">
    <p className="text-cyan-300">Total Projects</p>
    <h2 className="text-4xl font-bold mt-2">
      {projects.length}
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6">
    <p className="text-yellow-300">In Progress</p>
    <h2 className="text-4xl font-bold mt-2">
      {projects.filter(
        p => p.status === "In Progress"
      ).length}
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6">
    <p className="text-green-300">Completed</p>
    <h2 className="text-4xl font-bold mt-2">
      {projects.filter(
        p => p.status === "Completed"
      ).length}
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6">
   <p className="text-pink-300">
  Total Revenue
</p>
<p className="text-xs text-gray-400 mt-2">
  Combined project value
</p>
    <h2 className="text-2xl font-bold mt-2">
      ₹
      {projects
        .reduce(
          (sum, p) =>
            sum +
            Number(p.budget || 0),
          0
        )
        .toLocaleString()}
    </h2>
  </div>
  

</div>
<div className="flex flex-wrap gap-3 mb-8">

  <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
    💼 {projects.length} Records
  </span>

  <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
    ✅ {
      projects.filter(
        p => p.status === "Completed"
      ).length
    } Delivered
  </span>

  <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
    🚀 {
      projects.filter(
        p => p.status === "In Progress"
      ).length
    } Active
  </span>

</div>
    <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
p-6
mb-8
">

      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 bg-black/20
border
border-white/10
rounded-2xl
p-3
text-white
placeholder-gray-500
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={fetchProjects}
          className="
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
hover:shadow-lg
transition-all
duration-300
shadow-lg
 px-4
                    py-2
                    rounded-xl
                    hover:scale-105
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

        <select style={{
  backgroundColor: "#0F172A",
}}
          value={form.client}
          onChange={(e) =>
            setForm({
              ...form,
              client:
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
outline-none
border"
        >
          <option value="">
            Select Client
          </option>

          {clients.map(
            (client) => (
              <option
                key={client.id}
                value={
                  client.id
                }
              >
                {client.name}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
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
outline-none
border"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
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
outline-none
border md:col-span-2"
        />

        <input
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) =>
            setForm({
              ...form,
              budget:
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
outline-none
border"
        />

        <input
          type="date"
          value={form.deadline}
          onChange={(e) =>
            setForm({
              ...form,
              deadline:
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
outline-none
border"
        />

        <select style={{
  backgroundColor: "#0F172A",
}}
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
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
outline-none
border"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

        <div className="flex gap-3">

          <button
            type="submit"
            className="
relative
overflow-hidden
group
bg-gradient-to-r
from-cyan-500
via-blue-500
to-purple-600
text-white
px-8
py-3
rounded-2xl
font-semibold
shadow-lg
shadow-cyan-500/25
hover:shadow-cyan-500/40
hover:scale-105
transition-all
duration-300
"
          >
            <span className="
absolute
top-0
left-[-100%]
w-full
h-full
bg-gradient-to-r
from-transparent
via-white/20
to-transparent
group-hover:left-[100%]
transition-all
duration-700
"></span>
            {editingId
  ? "✏️ Update Project"
  : "🚀 Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(
                  null
                );

                setForm({
                  client: "",
                  title: "",
                  description:
                    "",
                  budget: "",
                  deadline:
                    "",
                  status:
                    "Pending",
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
text-white
px-6
py-3
rounded-2xl
"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>

    <div
  className="
  bg-white/10
  backdrop-blur-2xl
  border
  border-white/10
  rounded-3xl
  shadow-2xl
  overflow-hidden
  overflow-x-auto
  "
>
  <table className="w-full">
    <thead className="bg-slate-900 border-b border-white/10">
      <tr>
        <th className="text-left p-4 text-cyan-300 font-semibold">
          Title
        </th>

        <th className="text-left p-4 text-cyan-300 font-semibold">
          Client
        </th>

        <th className="text-left p-4 text-cyan-300 font-semibold">
          Description
        </th>

        <th className="text-left p-4 text-cyan-300 font-semibold">
          Budget
        </th>

        <th className="text-left p-4 text-cyan-300 font-semibold">
          Deadline
        </th>

        <th className="text-left p-4 text-cyan-300 font-semibold">
          Status
        </th>
        <th className="text-left p-4 text-cyan-300 font-semibold">
  Progress
</th>

        <th className="text-center p-4 text-cyan-300 font-semibold">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {projects.length > 0 ? (
        projects.map((project) => (
          <tr
            key={project.id}
            className="
              border-t
              border-white/10
              hover:bg-cyan-500/5
              transition-all
              duration-300
              align-middle
            "
          >
            {/* Title */}
            <td className="p-4 text-white font-semibold max-w-xs break-words">
              {project.title}
            </td>

            {/* Client */}
            <td className="p-4 text-cyan-300">
              👤 {project.client_name}
            </td>

            {/* Description */}
            <td className="p-4 text-slate-300 max-w-xs break-words">
              {project.description}
            </td>

            {/* Budget */}
            <td className="p-4 font-bold text-green-300 whitespace-nowrap">
              ₹{Number(project.budget).toLocaleString("en-IN")}
            </td>

            {/* Deadline */}
            <td className="p-4 whitespace-nowrap">
              <div className="text-white">
                {project.deadline}
              </div>

              <div
                className={`text-xs ${
                  new Date(project.deadline) < new Date()
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {new Date(project.deadline) < new Date()
                  ? "⚠ Overdue"
                  : "✓ On Track"}
              </div>
            </td>

            {/* Status */}
            <td className="p-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </td>
            <td className="p-4 min-w-[180px]">

  <div className="flex justify-between text-xs mb-1">
    <span>{project.progress}%</span>
  </div>

  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

    <div
      className="
      bg-gradient-to-r
      from-cyan-500
      via-blue-500
      to-purple-500
      h-3
      rounded-full
      transition-all
      duration-700
      "
      style={{
        width: `${project.progress}%`,
      }}
    ></div>

  </div>

</td>
            {/* Actions */}
            <td className="p-4">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => editProject(project)}
                  className="
                    bg-gradient-to-r
                    from-yellow-500
                    to-orange-600
                    text-white
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
                  onClick={() => deleteProject(project.id)}
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
                  "
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="text-center p-16"
          >
            <div className="text-7xl mb-5">
              🚀
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              No Projects Yet
            </h2>

            <p className="text-slate-300">
              Start by creating your first client project.
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

export default Projects;
