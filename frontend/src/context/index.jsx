export * from './auth';
export * from './contact';

import { AuthProvider } from './auth';
import { ContactProvider } from './contact';

export const ContextProvider = ({ children }) => {
	return (
		<>	
			<AuthProvider>
				<ContactProvider>
					{children}					
				</ContactProvider>
			</AuthProvider>
		</>
	)
}