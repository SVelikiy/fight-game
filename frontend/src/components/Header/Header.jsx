import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";


export default function Header() {

  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <div className={css.headerContainer}>
      <NavLink to="/">Fight game</NavLink>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}
