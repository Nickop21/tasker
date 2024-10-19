"use client";
import React, { useEffect, useState } from "react";
import SelectDropdown from "./selectDropdoen";
import Progressbar from "./progressBar";

function AddNewTask({ onAddTask }) {
  const [perorityTask, setPerorityTask] = useState("high");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const perority = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const onOptionPerorityChange = (e) => {
    setPerorityTask(e.target.value);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  function todoDataAdd() {
    setError("");

    // Validate input fields
    if (todoTitle === "" && todoContent === "") {
      setError("Please fill in both title and content.");
      return;
    } else if (todoTitle == "") {
      setError("Please add title ");
      return;
    } else if (todoContent == "") {
      setError("Please add content ");
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: todoTitle,
        content: todoContent,
        perority: perorityTask,
        taskStatus: false,
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      if (onAddTask) onAddTask(newTodo);

      // Clear input fields
      setTodoTitle("");
      setTodoContent("");
      setError("");
    }
  }

  return (
    <div className="flex flex-col gap-4 md:px-14 lg:px-0">
      <h1 className="font-bold text-3xl text-[#1E2026]">
        Hey ! There is no tomorrow, finish what you left{" "}
        <span className="text-[#6947BF]">You can do it!</span>
      </h1>

      {/* Adding tasks */}
      <div className="w-full flex flex-col gap-5 md:flex-row justify-between items-center rounded-sm border-2 p-2 md:p-4 border-[#D6DFE4] bg-[#FCFBFDB8] mt-6 relative overflow-hidden">
        <div className="w-full md:w-[80%] h-[250px] rounded-sm border-dashed border-2 border-[#CEC4EB] p-2 md:p-10 bg-[#FCFBFD] flex items-center justify-center flex-col">
          <input
            type="text"
            className="w-full bg-violet-100 p-2 text-black font-bold"
            value={todoTitle}
            placeholder="Enter Task Title"
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <textarea
            name="todocontent"
            maxLength={200}
            value={todoContent}
            placeholder="Enter Task Details"
            onChange={(e) => setTodoContent(e.target.value)}
            className="w-full p-2 m-2 bg-violet-100 min-h-24 text-black font-semibold  "
          ></textarea>

          {error && <div className="text-red-500 font-extrabold">{error}</div>}
          <div className="w-full flex justify-between pt-4 ">
            <SelectDropdown
              name="perorityTask"
              value={perorityTask}
              options={perority}
              onChange={onOptionPerorityChange}
              placeholder="priority"
            />

            <button
              className="px-4 md:px-8 py-2 text-black bg-violet-400 rounded-xl"
              onClick={todoDataAdd}
            >
              Add Task
            </button>
          </div>
        </div>

        <Progressbar />
      </div>
    </div>
  );
}

export default AddNewTask;
