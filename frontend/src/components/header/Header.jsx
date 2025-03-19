import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="border-2 bg-card h-16 flex justify-between p-4 mx-4 rounded-xl">
      <NavLink to="/">MedPred</NavLink>
      <div className="flex gap-3">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
