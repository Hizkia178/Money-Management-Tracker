import { useEffect } from 'react';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Hero from './components/Hero';

import ScrollToTop from './components/ScrollTopTop';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({duration: 1000, once: true});
  }, []);
  return (
    <>
    <Navbar />
    <Hero />
   
    <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
