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
import { TestLogin } from "./components/dashboard/testlogin";
import { TestProfile } from "./components/dashboard/testProfile";


function App() {
  
  return (
    <AuthProvider>
        <Routes>
          <Route exact path="/whynaidu" element={<CreatorLinks />} />

          <Route path="/" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardLinksNew />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testlogin" element={<TestLogin />} />
          <Route path="/testProfile" element={<TestProfile />} />

          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
