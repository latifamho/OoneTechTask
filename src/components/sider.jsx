import React, { useState } from "react";

const Sider = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: open ? "150px" : "50px",
      }}
      className=" bg-main   h-screen  p-3  transition-all"
    >
      <img
        src="/assets/side-icon.png"
        alt="icon"
        className="cursor-pointer absolute top-4"
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default Sider;
