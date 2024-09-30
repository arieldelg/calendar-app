import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="h-auto animate-fadeInEffect  bg-slate-200 lg:w-full lg:max-w-2xl ring-1 ring-slate-300 rounded-md p-6 grid grid-cols-1 justify-items-center content-evenly shadow-lg md:max-w-xl md:w-full w-5/6 space-y-4">
        {children}
      </div>
    </section>
  );
};

export default Layout;
