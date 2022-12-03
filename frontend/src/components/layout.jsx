import { Outlet, Link } from 'react-router-dom';
import { Navbar as NavbarChakra } from './chakra';

export const Layout = ({ children }) => {
	return (
		<>
			<NavbarChakra />
			{children}
		</>
	)
}