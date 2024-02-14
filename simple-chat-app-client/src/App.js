import React from 'react'
import Client from './Client'
import Home from './Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/client' Component={Client}/>
        </Routes></BrowserRouter>
     
    </div>
  )
}

export default App
