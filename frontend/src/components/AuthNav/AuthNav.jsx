import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      <NavLink className={css.authText} to="/register">
        Register
      </NavLink>
      <NavLink className={css.authText} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
