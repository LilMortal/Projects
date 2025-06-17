import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChirpProvider } from './context/ChirpContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';

function App() {
  return (
    <ChirpProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ChirpProvider>
  );
}

export default App;