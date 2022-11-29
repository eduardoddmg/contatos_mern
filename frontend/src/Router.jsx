import { Home, PageError, Login, Register, Loading } from './pages';
import { Layout } from './components';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
	return (
		<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageError />} />
        </Route>
        <Route path="/loading" element={<Loading />} />
      </Routes>
	)
};

export default Router;