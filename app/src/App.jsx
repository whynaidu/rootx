import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import CreatorLinks from "./components/creator/CreatorLinks";
import DashboardLinksNew from "./components/dashboard/DashboardLinksNew";
import Analytics from "./components/dashboard/Analytics";
import ProfileSettings from "./components/dashboard/ProfileSettings";
import NotFound from "./components/dashboard/NotFound";
import Login from "./components/dashboard/Login";
import SignUp from "./components/dashboard/SignUp";
// import Guard from "./Guard";
import { AuthProvider } from "./auth/auth";
import SocialHub from "./components/dashboard/SocialLinks";
import { RequireAuth } from "./auth/requireAuth";



function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/whynaidu" element={<CreatorLinks />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardLinksNew />
              </RequireAuth>
            }
          />
          <Route
            path="analytics"
            element={
              <RequireAuth>
                <Analytics />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfileSettings />
              </RequireAuth>
            }
          />
          <Route
            path="socialhub"
            element={
              <RequireAuth>
                <SocialHub />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
