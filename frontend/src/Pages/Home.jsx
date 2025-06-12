import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowVotingWorks from '../components/HowVotingWorks';
import Footer from '../components/Footer';
import Benifits from '../components/Benifits';
import ElectionFight from '../components/ElectionFight';
import ElectionPage from '../components/ElectionPage';
import { motion } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Home = () => {
  useEffect(() => {
    // Ensure the page scrolls to the top when it renders
    window.scrollTo(0, 0);
  }, []);

  return (

    <div>
      <Navbar />
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
      <Hero />
      <ElectionFight />
      <ElectionPage />
      <HowVotingWorks />
      <Benifits />
      <Footer />
      </motion.div>
    </div>
   
  );
};

export default Home;
