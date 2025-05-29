import { useEffect } from 'react';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
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
    <Pricing />
    <Testimonials />
    <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
