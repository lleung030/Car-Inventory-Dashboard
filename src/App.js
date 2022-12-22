import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Inventory from './components/Inventory'
import Profile from './components/Profile'
import Details from './components/Details'
import Blog from './views/Blog';
import BlogSingle from './views/BlogSingle';
import Log from './views/Log';
import LogSingle from './views/LogSingle';




export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/details">Details</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/log">Log</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/inventory" element={<Inventory />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/details" element={<Details />}/>
        <Route path="/blog">
            <Route path=":id" element={<BlogSingle />}></Route>
            <Route path="" element={<Blog />} />
          </Route>

        <Route path="/log">
            <Route path=":id" element={<LogSingle />}></Route>
            <Route path="" element={<Log />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}


