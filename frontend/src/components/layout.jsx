import { Outlet, Link } from 'react-router-dom';
import { Navbar as NavbarChakra } from './chakra';

export const Layout = () => {
	return (
		<>
			<NavbarChakra />
			<Outlet />
		</>
	)
}