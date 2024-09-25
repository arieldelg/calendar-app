import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <section className="w-screen h-screen grid grid-rows-[5rem_auto]">
      <header className="w-full h-full bg-slate-200 px-4">
        <nav className="flex items-center justify-between  w-full h-full">
          <h1>Calendar App</h1>
          <button>Login</button>
        </nav>
      </header>
      <main className=" h-full w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Root;
