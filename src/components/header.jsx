import React from "react";

const Header = () => {
  return (
    <header className="h-14   bg-main/[0.4] border-b border-gray-200 flex items-center justify-between px-4">
      <img
        src="/assets/logo.png"
        alt="logo"
        className=" absolute top-[6px] left-14 z-40"
      />
    </header>
  );
};

export default Header;
