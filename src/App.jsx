import { useState, useEffect } from "react";
import Preloader from "./components/design/preLoader";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate loading time
    }, 5000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Preloader isLoading={isLoading}>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Divider />
        <Roadmap />
        <Footer />
      </div>

      <ButtonGradient />
    </Preloader>
  );
};

export default App;