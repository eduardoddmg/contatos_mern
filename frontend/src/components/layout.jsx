import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useAuth } from "../context";

import Navbar from "./navbar";

const items = [
  {
    link: "/",
    name: "Home",
    private: true,
  },
  {
    link: "/login",
    name: "Login",
    private: false,
  },
  {
    link: "/register",
    name: "Registro",
    private: false,
  },
  {
    link: "/logout",
    name: "Sair",
    private: true,
  },
];

const NavbarWithAuth = () => {
  return (
    <>
      {items
        .filter((item) => item.private === true)
        .map((item, index) => {
          return (
            <Link to={item.link} key={index}>
              {item.name}
            </Link>
          );
        })}
    </>
  );
};

const NavbarWithoutAuth = () => {
  return (
    <>
      {items
        .filter((item) => item.private === false)
        .map((item, index) => {
          return (
            <Link to={item.link} key={index}>
              {item.name}
            </Link>
          );
        })}
    </>
  );
};

export const Layout = ({ children }) => {
  const auth = useAuth();

  return (
    <>
      {auth.token ? (
        <Navbar items={items.filter((item) => item.private === true)} />
      ) : (
        <Navbar items={items.filter((item) => item.private === false)} />
      )}
      {children}
    </>
  );
};
