import React from "react";

const TaskCardSkeleton = () => {
  return (
    <div className="w-[100%] md:w-[48%] p-6 rounded-lg shadow-md bg-gradient-to-r from-white via-[#D8E3F4]/[32%] to-[#D8E3F4]">
      <div className="w-full h-40 bg-[#FFFFFF] rounded-[8px] border-1 border-[#EAF0F2] px-3">
        <div className="w-full h-full flex items-center justify-center text-center font-bold animate-pulse rounded-md bg-muted" >No Data Available add new one</div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
