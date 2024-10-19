import React, { useState } from "react";
import Link from "next/link";

function TaskCard({ taskData, onTaskDeleted }) {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const colors = [
    "border-[rgba(233,216,244,1)] bg-gradient-to-r from-transparent via-[rgba(233,216,244,0.32)] to-[rgba(255,255,255,0)]",
    "bg-gradient-to-r from-white via-[#D8E3F4]/[32%] to-[#D8E3F4]",
    "border-[rgba(244,234,216,1)] bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(244,234,216,0.32)]",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  function DeleteTask() {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskData.id);
    localStorage.setItem("todos", JSON.stringify(updatedTasks)); // Update local storage

    onTaskDeleted(); // Notify parent to update state
    setIsToastOpen(false); // Close the toast
  }

  function Popup() {
    return (
      <div
        className={`absolute inset-0 items-center justify-center z-20 backdrop-blur duration-200 ${
          isToastOpen ? "flex animate-fade-in" : "hidden"
        }`}
      >
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
            <div className="md:flex items-center">
              <div className="md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold text-red-700 animate-pulse">Warning!</p>
                <p className="text-sm text-gray-700 mt-1">
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
                className="p-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm"
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

  return (
    <div
      className={`relative md:w-[48%] flex gap-5 p-6 rounded-lg border-[1px] ${colors[randomIndex]} shadow-md transition-all duration-300 transform ${
        isDeleting ? "opacity-0 scale-90" : "opacity-100 scale-100"
      }`}
    >
      <Popup />
      <div className="h-auto px-2 hidden lg:flex bg-[#FFFFFF] rounded-[8px] border-2 border-[#EAF0F2]">
        <img src="/paper.svg" alt="paper" className="w-20 h-20" />
      </div>
      <div className="w-[100%] relative">
        <img
          src="/dustbin.png"
          className="absolute w-8 -right-5 -top-3 z-10 text-2xl hover:animate-bounce cursor-pointer"
          onClick={() => setIsToastOpen(true)}
        />
        <div className="lg:w-[68%] cursor-pointer">
          <Link href={`evaluation/${taskData?.id}`}>
            <h3 className="font-extrabold text-[18px] line-clamp-2 text-black">
              {taskData?.title}
            </h3>
            <p className="text-[11px] text-[#7A8196] font-semibold">
              {taskData?.content}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
