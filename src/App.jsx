import { useEffect } from 'react';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Method from './components/Method';
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
    <Problem />
    <Method />
    <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
