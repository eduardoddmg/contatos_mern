import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
	return (
		<>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</nav>
			<Outlet />
		</>
	)
}