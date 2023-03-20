import "./App.css"
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import CreatorLinks from "./components/creator/CreatorLinks";
import DashboardLinksNew from "./components/dashboard/DashboardLinksNew";
import Analytics from "./components/dashboard/Analytics";
import ProfileSettings from "./components/dashboard/ProfileSettings";
import NotFound from "./components/dashboard/NotFound";
import Login from "./components/dashboard/Login";
import SignUp from "./components/dashboard/SignUp";
import { AuthProvider } from "./auth/auth";
import SocialHub from "./components/dashboard/SocialLinks";
import { RequireAuth } from "./auth/requireAuth";
import Themes from "./components/dashboard/Themes";
import Settings from "./components/dashboard/Settings";
import ChangePassword from "./components/dashboard/ChangePassword";
import ForgotPassword from "./components/dashboard/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/:username" element={<CreatorLinks />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:token" element={<ResetPassword />} />

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
            path="setting/profile"
            element={
              <RequireAuth>
                <ProfileSettings />
              </RequireAuth>
            }
          />
          <Route
            path="setting/themes"
            element={
              <RequireAuth>
                <Themes />
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
          <Route
            path="setting"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="setting/changepassword"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
