export * from "./auth";
export * from "./contact";
export * from "./admin";
export * from "./info";

import { AuthProvider } from "./auth";
import { ContactProvider } from "./contact";
import { AdminProvider } from "./admin";
import { InfoProvider } from "./info";

export const ContextProvider = ({ children }) => {
  return (
    <>
      <InfoProvider>
        <AuthProvider>
          <AdminProvider>
            <ContactProvider>
              {children}
            </ContactProvider>
          </AdminProvider>
        </AuthProvider>
      </InfoProvider>
    </>
  );
};
