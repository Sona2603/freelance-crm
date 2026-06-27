import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("dashboard/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
        <div className="text-center">
  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

  <h1 className="text-2xl font-bold text-cyan-300">
    Loading Dashboard...
  </h1>
</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white relative overflow-hidden p-6">

      <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]"></div>

  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]"></div>

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px]"></div>
</div>

      <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
mb-8
">

  <p className="uppercase tracking-[4px] text-cyan-300 text-sm mb-2">
    CRM COMMAND CENTER
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
    Dashboard
  </h1>

  <p className="text-gray-400 mt-3">
    Monitor clients, projects and team progress in one place.
  </p>

</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
border-cyan-500/20
shadow-xl
hover:scale-105
transition-all
duration-300">
          <h3 className="text-gray-500 text-sm ">
            Clients
          </h3>

          <p className="text-5xl font-bold mt-3 text-cyan-300">
            {data.clients}
          </p>
        </div>

        <div className="bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
shadow-xl
hover:scale-105
transition-all
duration-300 border-purple-500/20">
          <h3 className="text-gray-500 text-sm">
            Projects
          </h3>

          <p className="text-5xl font-bold mt-3 text-purple-300">
            {data.projects}
          </p>
        </div>

        <div className="bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
border-yellow-500/20
shadow-xl
hover:scale-105
transition-all
duration-300">
          <h3 className="text-gray-500 text-sm">
            Tasks
          </h3>

          <p className="text-5xl font-bold mt-3 text-yellow-300">
            {data.tasks}
          </p>
        </div>

        <div className="bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
border-green-500/20
shadow-xl
hover:scale-105
transition-all
duration-300">
          <h3 className="text-gray-500 text-sm">
            Completed Tasks
          </h3>

          <p className="text-5xl font-bold mt-3 text-green-300">
            {data.completed_tasks}
          </p>
        </div>

      </div>
      <div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-white/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-5">
    <p className="text-gray-400">
      Completion Rate
    </p>

    <h3 className="text-3xl font-bold text-cyan-300 mt-2">
      {data.tasks > 0
        ? Math.round(
            (data.completed_tasks /
              data.tasks) *
              100
          )
        : 0}
      %
    </h3>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5">
    <p className="text-gray-400">
      Avg Tasks / Project
    </p>

    <h3 className="text-3xl font-bold text-purple-300 mt-2">
      {data.projects > 0
        ? (
            data.tasks /
            data.projects
          ).toFixed(1)
        : 0}
    </h3>
  </div>

  <div className="bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-5">
    <p className="text-gray-400">
      Active Projects
    </p>

    <h3 className="text-3xl font-bold text-green-300 mt-2">
      {data.projects}
    </h3>
  </div>
  <div className="bg-white/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-5">
  <p className="text-gray-400">
    Overdue Tasks
  </p>

  <h3 className="text-3xl font-bold text-red-300 mt-2">
    {data.overdue_tasks}
  </h3>
</div>

</div>

<div className="grid md:grid-cols-3 gap-5 mb-8">

  <div className="
  bg-white/10
  backdrop-blur-xl
  border
  border-red-500/20
  rounded-3xl
  p-5
  ">
    <p className="text-red-300">
      High Priority
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {data.high_priority}
    </h3>
  </div>

  <div className="
  bg-white/10
  backdrop-blur-xl
  border
  border-yellow-500/20
  rounded-3xl
  p-5
  ">
    <p className="text-yellow-300">
      Medium Priority
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {data.medium_priority}
    </h3>
  </div>

  <div className="
  bg-white/10
  backdrop-blur-xl
  border
  border-green-500/20
  rounded-3xl
  p-5
  ">
    <p className="text-green-300">
      Low Priority
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {data.low_priority}
    </h3>
  </div>

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

        <h2 className="text-2xl font-bold text-cyan-300 mb-5">
          Recent Tasks
        </h2>

        {data.recent_tasks.length > 0 ? (
          data.recent_tasks.map((task) => (
            <div
              key={task.id}
              className="
border-b
border-white/10
py-4
flex
justify-between
items-center
"
            >
              <span className="font-medium">
                {task.title}
              </span>

             <span
className="
px-3
py-1
rounded-full
text-xs
bg-cyan-500/20
text-cyan-300
"
>
  {task.status}
</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No recent tasks
          </p>
        )}

      </div>

      <div className="
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
shadow-2xl
p-6
">

        <h2 className="text-2xl font-bold text-purple-300 mb-5">Project Progress</h2>

        {data.project_progress.length > 0 ? (
          data.project_progress.map((project) => (
            <div
              key={project.id}
              className="mb-5"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {project.name}
                </span>

                <span>
                  {project.progress}%
                </span>
              </div>

              <div className="
w-full
bg-slate-800
rounded-full
h-4
overflow-hidden
">

                <div
                  className="
bg-gradient-to-r
from-cyan-500
via-blue-500
to-purple-500
h-4
rounded-full
transition-all
duration-700
"
                  style={{
                    width: `${project.progress}%`,
                  }}
                ></div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No project progress data
          </p>
        )}

      </div>

      <div
  className="
  bg-white/10
  backdrop-blur-2xl
  border
  border-white/10
  rounded-3xl
  shadow-2xl
  p-6
  mt-8
  "
>

  <h2 className="text-2xl font-bold text-pink-300 mb-5">
    Activity Timeline
  </h2>

  {data.recent_activities?.length > 0 ? (
    data.recent_activities.map((activity) => (
      <div
        key={activity.id}
        className="
        border-b
        border-white/10
        py-4
        flex
        justify-between
        items-center
        "
      >
        <span className="text-gray-300">
          {activity.message}
        </span>

        <span className="text-xs text-gray-500">
          {new Date(
            activity.created_at
          ).toLocaleDateString()}
        </span>
      </div>
    ))
  ) : (
    <p className="text-gray-500">
      No recent activity
    </p>
  )}

</div>

    </div>
  );
}

export default Dashboard;