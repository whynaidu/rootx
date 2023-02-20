import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import CreatorLinks from "./components/creator/CreatorLinks";
import DashboardLinksNew from "./components/dashboard/DashboardLinksNew";

import Analytics from "./components/dashboard/Analytics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<CreatorLinks />} />
        <Route exact path="/whyanidu" element={<CreatorLinks />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="DashboardLinksNew" element={<DashboardLinksNew />} />
          <Route path="Analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
