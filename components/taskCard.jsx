import React, { useState, useRef, useEffect } from "react";

function TaskCard({ taskData, onTaskDeleted, onTaskCompleted ,onTaskUpdated}) {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastOpenForEdit, setIsToastOpenForEdit] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState(taskData.title || "");
  const [contentUpdate, setContentUpdate] = useState(taskData.content || "");
  const [isCompleted, setIsCompleted] = useState(taskData.taskStatus || false);

  const titleInputRef = useRef(null);
  const contentTextAreaRef = useRef(null);

  useEffect(() => {
    if (isToastOpenForEdit && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [titleUpdate,isToastOpenForEdit]);

  useEffect(() => {
    if (isToastOpenForEdit && contentTextAreaRef.current) {
      contentTextAreaRef.current.focus();
    }
  }, [contentUpdate,isToastOpenForEdit]);

  const colors = [
    "border-[rgba(233,216,244,1)] bg-gradient-to-r from-transparent via-[rgba(233,216,244,0.32)] to-[rgba(255,255,255,0)]",
    "bg-gradient-to-r from-white via-[#D8E3F4]/[32%] to-[#D8E3F4]",
    "border-[rgba(244,234,216,1)] bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(244,234,216,0.32)]",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  function DeleteTask() {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== taskData.id);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    onTaskDeleted();
    setIsToastOpen(false);
  }

  function completedTask() {
    onTaskCompleted();
    setIsCompleted(!isCompleted);
  }

  function Popup() {
    return (
      <div
        className={`absolute inset-0 items-center justify-center z-20 backdrop-blur duration-200 ${
          isToastOpen ? "flex animate-fade-in" : "hidden"
        }`}
      >
        <div className="relative px-4 md:flex md:items-center md:justify-center">
          <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
            <div className="md:flex items-center">
              <div className="md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold text-red-700 animate-pulse">Warning!</p>
                <p className="text-sm text-black mt-1">
                  You will lose your data by deleting this. This action cannot
                  be undone.
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 flex gap-5 justify-end">
              <button
                id="confirm-delete-btn"
                className="p-3 bg-red-200 text-red-700 rounded-lg font-semibold text-sm"
                onClick={() => DeleteTask()}
              >
                Delete
              </button>
              <button
                id="confirm-cancel-btn"
                className="p-3 md:py-2 bg-gray-600 rounded-lg font-semibold text-sm"
                onClick={() => setIsToastOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function EditCurrentTodo() {
    return (
      <div
        className={`absolute inset-0 items-center justify-center z-20 backdrop-blur duration-200 ${
          isToastOpenForEdit ? "flex animate-fade-in" : "hidden"
        }`}
      >
        <div className="w-full h-full relative px-4 md:flex md:items-center md:justify-center">
          <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="w-full bg-white rounded-lg md:max-w-md md:mx-auto p-2 px-6 fixed inset-x-0 bottom-0 z-50 md:mb-4 md:relative shadow-lg">
            <div className="md:mt-0 text-center md:text-left">
              <p className="font-bold text-green-800 animate-pulse">Update!</p>
              <div className="flex gap-4 flex-col box-border">
                <input
                  type="text"
                  value={titleUpdate}
                  placeholder="Update your title"
                  className="w-full mt-2 p-1 bg-violet-100 text-black font-normal"
                  onChange={(e) => setTitleUpdate(e.target.value)}
                  ref={titleInputRef}
                />
                <input
                type="text"
                  name="updated Task"
                  maxLength={200}
                  value={contentUpdate}
                  placeholder="Update your content"
                  className="w-full p-1 resize-none bg-violet-100 min-h-16 text-black font-normal text-sm"
                  onChange={(e) => setContentUpdate(e.target.value)}
                  ref={contentTextAreaRef}
                />
              </div>
            </div>
            <div className="text-center md:text-right mt-4 flex gap-5 justify-end">
              <button
                id="confirm-delete-btn"
                className="p-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm"
                onClick={() => UpdateTaskDetails()}
              >
                Update
              </button>
              <button
                id="confirm-cancel-btn"
                className="p-2 md:py-2 bg-gray-600 rounded-lg font-semibold text-sm"
                onClick={() => setIsToastOpenForEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function UpdateTaskDetails() {
    
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    
    // Update the specific task based on task ID
    const updatedTasks = tasks.map((task) =>
      task.id === taskData.id
        ? { ...task, title: titleUpdate, content: contentUpdate }
        : task
    );
  
    // Save the updated tasks back to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  
    if (onTaskUpdated) {
      onTaskUpdated({ ...taskData, title: titleUpdate, content: contentUpdate });
    }
  
    setIsToastOpenForEdit(false);
  }
  
  return (
    <div
      className={`relative w-full min-h-[180px] md:w-[48%] flex gap-5 p-6 rounded-lg border-[1px]  ${taskData.perority=="high" && "bg-gradient-to-r from-red-100 "}   ${taskData.perority=="medium" && "bg-gradient-to-r from-yellow-100 via-yellow-100"} ${taskData.perority=="low" && "bg-gradient-to-r from-green-100 via-green-200"} shadow-md transition-all duration-300 transform ${
         "opacity-100 scale-100"
      }`}
    >
      <Popup />
      <EditCurrentTodo />
      <div className="h-[80px] px-2 hidden lg:flex items-center justify-center bg-[#FFFFFF] border-2 border-[#EAF0F2] rounded-xl">
        <img src="/paper.svg" alt="paper" className="w-20 h-20" />
      </div>
      <div className="w-[100%] relative">
        <img
          src="/dustbin.png"
          className="absolute w-8 -right-5 -top-3 z-10 text-2xl hover:animate-bounce cursor-pointer"
          onClick={() => setIsToastOpen(true)}
        />
        <div
          className="absolute w-8 -right-5 -bottom-3 z-10 text-2xl hover:animate-bounce cursor-pointer"
        >
          {isCompleted ? (
            <div onClick={() => completedTask(false)}>❌</div>
          ) : (
            <div onClick={() => completedTask(true)}>✅</div>
          )}
        </div>
        <div
          className="absolute w-8 right-6 -top-3 z-10 text-2xl hover:animate-bounce cursor-pointer"
          onClick={() => setIsToastOpenForEdit(true)}
        >
          ✏️
        </div>
        <div
          className={`lg:w-[68%] cursor-pointer ${
            isCompleted ? "line-through opacity-50" : ""
          }`}
        >
          <h3 className="font-extrabold text-[18px] line-clamp-2 text-black">
            {taskData?.title}
          </h3>
          <p className="text-[11px] text-[#7A8196] font-semibold">
            {taskData?.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
