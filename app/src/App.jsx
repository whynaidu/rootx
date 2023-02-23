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

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/whynaidu" element={<CreatorLinks />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardLinksNew />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
