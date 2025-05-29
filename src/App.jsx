import { useEffect } from 'react';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';

import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({duration: 1000, once: true});
  }, []);
  return (
    <>
    <Navbar />
    <Hero />
    <Problem />
      <Footer />
    </>
  )
}

export default App
