import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Links from "./components/Links"
import SociaLinks from './components/SociaLinks'
import CreatorProifileCard from './components/CreatorProifileCard'
import { Routes, Route } from "react-router";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">



      <CreatorProifileCard/>
      <Links />
      <Links /> <Links /> <Links /> <Links /> <Links /> <Links /> <Links />
      <Links /> <Links /> <Links /> <Links /> <Links /> <Links /> <Links />
      <Links />
      <SociaLinks/>
    </div>
  );
}

export default App
