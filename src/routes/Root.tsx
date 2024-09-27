import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { STATEAUTHSELECTOR, USERDATASELECTOR } from "../store/slices/authSlice";

import { startLogoutUser } from "../store/authThunk/thunks";

const Root = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(STATEAUTHSELECTOR);
  const user = useAppSelector(USERDATASELECTOR);

  return (
    <section className="w-screen h-screen grid grid-rows-[5rem_auto]">
      <header className="w-full h-full bg-slate-200 px-4">
        <nav className="flex items-center justify-between  w-full h-full">
          <h1>{user?.name ? user.name : <span>CalendarApp</span>}</h1>

          {state === "authenticated" ? (
            <button
              className="cursor-pointer px-4 py-2 bg-slate-400 rounded-md ring-1 ring-slate-500 text-white font-bold font-mono hover:bg-slate-500"
              onClick={() => dispatch(startLogoutUser())}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to={"/auth/login"}
              className="cursor-pointer px-4 py-2 bg-slate-400 rounded-md ring-1 ring-slate-500 text-white font-bold font-mono hover:bg-slate-500"
            >
              <button className="w-full h-full">Login</button>
            </NavLink>
          )}
        </nav>
      </header>
      <main className=" h-full w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Root;
