import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { LoginPage } from "./pages/authentication/LoginPage";
import { AuthProvider } from "./utils/AuthProvider";

function App() {
  const location = useLocation();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") | location.pathname.includes("blank");
  return (
    <AuthProvider>
      {isAuthPath ? (
        <AppRoutes>
            <LoginPage/>
          </AppRoutes>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </AuthProvider>
  );
}

export default App;
