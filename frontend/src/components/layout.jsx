import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useAuth } from "../context";

import { Navbar } from './navbar';

import * as S from '../styles';

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

const withAuth = items.filter((item) => item.private === true);
const withoutAuth = items.filter((item) => item.private === false);

export const Layout = ({ children }) => {
  const auth = useAuth();

  return (
    <>
      <Navbar exist={auth.token} items={withAuth} />
      <S.Container>
        {children}
      </S.Container>
    </>
  );
};
