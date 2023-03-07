import * as P from "./pages";
import { Routes, Route } from "react-router-dom";
import * as C from "./components";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<C.Wait />}>
        <Route
          element={<C.PrivateRoute role="user" redirectTo="/login" />}
        >
          <Route index element={<P.Home />} />

          <Route path="form/">
            <Route path="contact" element={<P.FormContact />} />
            <Route index element={<C.Redirect path="/" />} />
          </Route>

          <Route path="/logout" element={<P.Logout />} />
        </Route>

        <Route
          element={
            <C.PrivateRoute role="admin" redirectTo="/admin/login" />
          }
        >
          <Route path="admin" element={<P.AdminHome />} />
          <Route
            path="admin/user"
            element={<C.Redirect path="/admin" />}
          />
          <Route path="admin/user/:id" element={<P.AdminUser />} />
        </Route>

        <Route element={<C.PublicRoute />}>
          <Route path="login" element={<P.Login />} />
          <Route path="register" element={<P.Register />} />
        </Route>
        <Route path="*" element={<P.PageError />} />
        <Route path="/unauthorized" element={<P.Unauthorized />} />
      </Route>
    </Routes>
  );
};

export default Router;
