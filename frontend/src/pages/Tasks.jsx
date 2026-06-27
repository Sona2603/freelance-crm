import { useEffect, useState } from "react";
import api from "../api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    project: "",
    title: "",
    description: "",
    due_date: "",
    status: "Todo",
    priority: "Medium"
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get(
        `tasks/?search=${search}&status=${statusFilter}`
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("projects/");
      setProjects(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`tasks/${editingId}/`, form);
        setEditingId(null);
      } else {
        await api.post("tasks/", form);
      }

      setForm({
        project: "",
        title: "",
        description: "",
        due_date: "",
        status: "Todo",
        priority: "Medium",
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const editTask = (task) => {
    setEditingId(task.id);

    setForm({
      project: task.project,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
      priority: task.priority,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "bg-green-500/20 text-green-300 border border-green-500/30";

    case "In Progress":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

    default:
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
  }
};

  const getProjectName = (projectId) => {
    const project = projects.find(
      (p) => p.id === taskProjectId(projectId)
    );

    return project ? project.title : "No Project";
  };

  const taskProjectId = (id) => Number(id);

  return (
    <div className="min-h-screen bg-[#070B14] text-white relative overflow-hidden">

      <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]"></div>

  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]"></div>

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px]"></div>
</div>
      {/* Header */}

     <div className="
relative
overflow-hidden
bg-white/10
backdrop-blur-2xl
border-b
border-white/10
shadow-2xl
">

  <div className="max-w-7xl mx-auto px-6 py-10">

    <p className="
    uppercase
    tracking-[4px]
    text-cyan-300
    text-sm
    mb-2
    ">
      PRODUCTIVITY WORKSPACE
    </p>

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
      Task Command Center
    </h1>

    <p className="text-gray-400 mt-3 text-lg">
      Track progress, manage projects and stay productive.
    </p>
    <div className="flex gap-4 mt-5 flex-wrap">
  <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
    {tasks.length} Tasks
  </span>

  <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
    {projects.length} Projects
  </span>
</div>

  </div>
</div>

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-white/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6  shadow-xl">
    <p className="text-cyan-300">Total Tasks</p>
    <h2 className="text-4xl font-bold mt-2">
      {tasks.length}
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 shadow-xl">
    <p className="text-yellow-300">In Progress</p>
    <h2 className="text-4xl font-bold mt-2">
      {
        tasks.filter(
          task =>
            task.status === "In Progress"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6 shadow-xl">
    <p className="text-green-300">Completed</p>
    <h2 className="text-4xl font-bold mt-2">
      {
        tasks.filter(
          task => task.status === "Done"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-xl">
    <p className="text-purple-300">Projects</p>
    <h2 className="text-4xl font-bold mt-2">
      {projects.length}
    </h2>
  </div>

</div>
        {/* Search & Filters */}

        <div className="bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
p-6 mb-8">
         <h2 className="text-xl font-bold text-white mb-4">
  Search Workspace
</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search task title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
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
outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select  style={{
    backgroundColor: "#0F172A",
  }}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
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
            >
              <option value="">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Done">Done</option>
            </select>

            <button
              onClick={fetchTasks}
              className="
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
transition-all
duration-300
text-white
px-6
rounded-2xl
shadow-lg
"
            >
              Search
            </button>
          </div>
<div>
          <button
  onClick={() => {
    window.open(
      "http://127.0.0.1:8000/api/projects/export/"
    );
  }}
  className="
  mt-4
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
        </div>

        {/* Form */}

        <div className="bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
p-6 mb-10">
          <h2 className="text-2xl font-bold text-white mb-5">
            {editingId
              ? "Update Task"
              : "Create New Task"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
            <select  style={{
    backgroundColor: "#0F172A",
  }}
              value={form.project}
              onChange={(e) =>
                setForm({
                  ...form,
                  project: e.target.value,
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
            >
              <option value="">
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
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

            <textarea
              placeholder="Task Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              rows="4"
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
outline-none md:col-span-2"
            />

            <input
              type="date"
              value={form.due_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  due_date: e.target.value,
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

            <select
            style={{
    backgroundColor: "#0F172A",
  }}
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
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
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Done">Done</option>
            </select>

<select
  style={{
    backgroundColor: "#0F172A",
  }}
  value={form.priority}
  onChange={(e) =>
    setForm({
      ...form,
      priority: e.target.value,
    })
  }
  className="
  bg-black/20
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
  "
>
  
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High"> High</option>
</select>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="
bg-gradient-to-r
from-cyan-500
via-blue-500
to-purple-600
hover:scale-105
transition-all
duration-300
text-white
px-8
py-3
rounded-2xl
font-semibold
shadow-lg
"
              >
                {editingId
                  ? "Update Task"
                  : "Add Task"}
              </button>
            </div>
          </form>
        </div>

        {/* Task Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
               className="
group
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
shadow-xl
p-6
hover:scale-[1.03]
hover:border-cyan-500/40
transition-all
duration-300
hover:shadow-cyan-500/20
"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="
text-xl
font-bold
text-white
group-hover:text-cyan-300
transition
flex
items-center
gap-2
">
  ⚡ {task.title}
</h3>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <p className="text-gray-300 mb-4">
                {task.description}
              </p>

              <div className="space-y-3 text-sm text-gray-300 mb-5">
                <p>
                <span className="
inline-flex
items-center
px-3
py-1
rounded-full
bg-purple-500/20
text-purple-300
text-xs
">
  📁 {getProjectName(task.project)}
</span>
                </p>

                <div>
  <p>
    📅 Due Date: {task.due_date}
  </p>

  {new Date(task.due_date) < new Date() &&
    task.status !== "Done" && (
      <span className="
      inline-block
      mt-2
      px-3
      py-1
      rounded-full
      bg-red-500/20
      text-red-300
      text-xs
      ">
        ⚠ Overdue
      </span>
  )}
</div>
              </div>
              <div className="flex items-center gap-2">
  <span className="text-sm text-gray-400">
    Priority:
  </span>

  <span
  className={`px-3 py-1 rounded-full text-xs ${
    task.priority === "High"
      ? "bg-red-500/20 text-red-300"
      : task.priority === "Medium"
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-green-500/20 text-green-300"
  }`}
>
  {task.priority}
</span>
</div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={async () => {
                    await api.patch(
                      `tasks/${task.id}/`,
                      {
                        status: "In Progress",
                      }
                    );
                    fetchTasks();
                  }}
                  className="
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
transition
text-white
px-4
py-2
rounded-xl
"
                >
                  Start
                </button>

                <button
                  onClick={async () => {
                    await api.patch(
                      `tasks/${task.id}/`,
                      {
                        status: "Done",
                      }
                    );
                    fetchTasks();
                  }}
                  className="
bg-gradient-to-r
from-green-500
to-emerald-600
hover:scale-105
transition
text-white
px-4
py-2
rounded-xl
"
                >
                  Done
                </button>

                <button
                  onClick={() =>
                    editTask(task)
                  }
                 className="
bg-gradient-to-r
from-yellow-500
to-orange-600
hover:scale-105
transition
text-white
px-4
py-2
rounded-xl
"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="
bg-gradient-to-r
from-red-500
to-pink-600
hover:scale-105
transition
text-white
px-4
py-2
rounded-xl
"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
         <div className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
shadow-xl
p-16
text-center
mt-6
">

  <div className="text-6xl mb-4">
    🚀
  </div>

  <h3 className="text-2xl font-bold text-white mb-2">
    No Tasks Found
  </h3>

  <p className="text-gray-400">
    Create your first task and start tracking progress.
  </p>

</div>
        )}
      </div>
    </div>
  );
}

export default Tasks;