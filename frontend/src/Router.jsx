import { Home, PageError, Login, Register, Loading } from './pages';
import { Layout, WithAuth, WithoutAuth } from './components';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
	return (
		<Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<WithAuth />}>
            <Route index element={<Home />} />
            <Route path="loading" element={<Loading />} />
          </Route>
          <Route element={<WithoutAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<PageError />} />
          </Route>
        </Route>
      </Routes>
	)
};

export default Router;