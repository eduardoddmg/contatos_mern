import { useNavigate, useHref, Outlet } from "react-router-dom";
import { useAuth, useContact } from "../context";
import { useEffect } from "react";
import { Layout } from "./layout";
import { Loading } from "./loading";

const items = [
  {
    role: "user",
    link: "/",
  },
  {
    role: "admin",
    link: "/admin",
  },
];

export const PrivateRoute = ({ role, redirectTo }) => {
  const navigate = useNavigate();
  const href = useHref();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.token) navigate(redirectTo);
    else if (!auth.loading) {
      const item = items.find((item) => item.role === auth.role);

      if (!auth.token || !auth.role) navigate(redirectTo);
      else if (href != item.link) navigate(item.link);
      else if (item.role !== auth.role) navigate("/unauthorized");
    }
  }, [auth.token, auth.loading]);

  return <Layout>{!auth.loading ? <Outlet /> : <Loading />}</Layout>;
};
