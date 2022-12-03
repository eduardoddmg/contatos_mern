import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useEffect, useState } from "react";
import { LoadingComponent } from "./loading";

export const WithAuth = () => {
  const [loading, setLoading] = useState(true);
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <LoadingComponent /> : <Outlet />;
};
