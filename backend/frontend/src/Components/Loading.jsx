import React from "react";

function Loading() {
  return (
    <>
      <div className="h-full flex justify-center items-center">
        {/* <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-lg "></span>
        <span className="loading loading-ring loading-sm"></span> */}

        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
