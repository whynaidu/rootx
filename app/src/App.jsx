import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import CreatorLinks from "./components/creator/CreatorLinks";
import DashboardLinksNew from "./components/dashboard/DashboardLinksNew";

import Analytics from "./components/dashboard/Analytics";
import ProfileSettings from "./components/dashboard/ProfileSettings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<CreatorLinks />} />
        <Route exact path="/whyanidu" element={<CreatorLinks />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<DashboardLinksNew />} />
          <Route path="Analytics" element={<Analytics />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
