import { Button } from "@/Components/ui/button";
import { useGetEmployeeTasksQuery } from "@/redux/features/employee/task/task.api";
import { Link } from "react-router-dom";

const TaskEmployee = () => {
  const { data: tasks, isLoading } = useGetEmployeeTasksQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks?.results.map((task: any) => (
          <div key={task.id} className="border rounded-lg p-4">
            <h3 className="font-bold text-xl mb-2">{task.title}</h3>
            <p className="text-gray-500 mb-2">{task.description}</p>
            <p className="text-gray-500 mb-2">Client: {task.client.name}</p>
            <Link to={`/employee/communication?taskId=${task.id}&chatWith=${task.client.username}`}>
              <Button>Chat with Client</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskEmployee;