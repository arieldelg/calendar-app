import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { STATEAUTHSELECTOR } from "../store/slices/authSlice";

const Root = () => {
  const state = useAppSelector(STATEAUTHSELECTOR);
  return (
    <section className="w-screen h-screen grid grid-rows-[5rem_auto]">
      <header className="w-full h-full bg-slate-200 px-4">
        <nav className="flex items-center justify-between  w-full h-full">
          <h1>Calendar App</h1>
          <NavLink
            to={"/auth/login"}
            className="cursor-pointer px-4 py-2 bg-slate-400 rounded-md ring-1 ring-slate-500 text-white font-bold font-mono hover:bg-slate-500"
          >
            <button
              disabled={state === "authenticated" ? true : false}
              className="w-full h-full"
            >
              Login
            </button>
          </NavLink>
        </nav>
      </header>
      <main className=" h-full w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Root;
