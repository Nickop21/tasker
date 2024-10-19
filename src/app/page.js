"use client";
import Image from "next/image";
import styles from "./page.module.css";
import AddNewTask from "../../components/addNewTask";
import TaskCard from "../../components/taskCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentActive, setCurrentActive] = useState(0);

  const options = ["All", "High Priority", "Medium Priority", "Low Priority"];

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTasks);
  }, []);

  // Function to handle task deletion
  function handleTaskDelete(deletedTaskId) {
    const updatedTasks = todos.filter((task) => task.id !== deletedTaskId);
    setTodos(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  }

  // Function to handle adding a new task
  function handleAddTask(newTask) {
    const updatedTasks = [...todos, newTask];
    setTodos(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  }

  // Function to handle search input change
  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  // Function to filter tasks based on the active priority filter
  function filterByPriority(task) {
    if (currentActive === 1) return task.perority === "high";
    if (currentActive === 2) return task.perority === "medium";
    if (currentActive === 3) return task.perority === "low";
    return true;
  }

  // Combine search and priority filtering
  const filteredTasks = todos
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(filterByPriority);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <AddNewTask onAddTask={handleAddTask} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mt-4 p-2 border rounded w-full bg-white text-black outline-dotted"
      />
      <div className="flex items-center sm:gap-4 flex-wrap mb-4 ">
        {options.map((opt, index) => (
          <div
            className={`p-4 font-bold text-xs rounded-xl cursor-pointer mt-10 ${
              currentActive === index
                ? "bg-[#FFFFFF] text-[#6947BF] transition-colors ease-linear duration-500"
                : "text-[#98A1BB]"
            }`}
            key={index}
            onClick={() => setCurrentActive(index)}
          >
            {opt}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-10 flex-wrap">
        {filteredTasks.map((data) => (
          <TaskCard
            key={data.id}
            taskData={data}
            onTaskDeleted={() => handleTaskDelete(data.id)}
          />
        ))}
      </div>
    </main>
  );
}
