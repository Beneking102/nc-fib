import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import AnimatedBackground from './components/Background';
import Units from './Pages/Units';
import MostWanted from './Pages/MostWanted';
import Footer from './Pages/Footer';
import Leadership from './Pages/Leadership';

const theme = {
  text: '#DFBE5D',
  background: '#151515',
  neon: '#AC9247',
};


const LandingPage = () => (
  <>
    <Navbar />
    <AnimatedBackground />
    <main className="relative z-10">
    <Home />
      <About />
      <Units />
      <MostWanted />
      <Leadership />
      <Footer />
    </main>
  </>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;