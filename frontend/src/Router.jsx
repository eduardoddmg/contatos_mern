import * as Page from "./pages";
import { Routes, Route } from "react-router-dom";
import * as Component from "./components";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Component.Wait />}>
        <Route
          element={<Component.PrivateRoute role="user" redirectTo="/login" />}
        >
          <Route index element={<Page.Home />} />

          <Route path="form/">
            <Route path="contact" element={<Page.FormContact />} />
            <Route index element={<Component.Redirect path="/" />} />
          </Route>

          <Route path="/logout" element={<Page.Logout />} />
        </Route>

        <Route
          element={
            <Component.PrivateRoute role="admin" redirectTo="/admin/login" />
          }
        >
          <Route path="admin" element={<Page.AdminHome />} />
          <Route
            path="admin/user"
            element={<Component.Redirect path="/admin" />}
          />
          <Route path="admin/user/:id" element={<Page.AdminUser />} />
        </Route>

        <Route element={<Component.PublicRoute />}>
          <Route path="login" element={<Page.Login />} />
          <Route path="register" element={<Page.Register />} />
          <Route path="admin/login" element={<Page.AdminLogin />} />
          <Route path="admin/register" element={<Page.AdminRegister />} />
        </Route>
        <Route path="*" element={<Page.PageError />} />
        <Route path="/unauthorized" element={<Page.Unauthorized />} />
      </Route>
    </Routes>
  );
};

export default Router;
