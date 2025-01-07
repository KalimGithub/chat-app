import React from "react";
import Left from "../left/Left";
import Right from "../right/Right.jsx";

function Home() {
  return (
    <>
      <div className="flex h-screen w-full justify-between text-white">
        <Left />
        <Right />
      </div>
    </>
  );
}

export default Home;
