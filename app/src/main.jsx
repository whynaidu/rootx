import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";



ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="392108795050-28us09ng9mhp1c0kjnrrakju1loht2ea.apps.googleusercontent.com">
    <Router>
      <App style={{backgroundImage: "linear-gradient(120deg, #fcfcfc 10%, #ebadff 100%)"}} />
    </Router>
  </GoogleOAuthProvider>
);
