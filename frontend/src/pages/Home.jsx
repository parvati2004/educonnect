import React from "react";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl mb-4">Welcome {user?.username || "Guest"}</h1>
      <p>Role: {user?.role || "None"}</p>
    </div>
  );
};

export default Home;
