import { useState, useEffect } from "react";
import HomePreloader from "../design/HomePreloader";
import Header from "./Header";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Collaboration from "./Collaboration";
import Services from "./Services";
import Divider from "../design/Divider";
import Roadmap from "./Roadmap";
import Footer from "./Footer";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate loading time
    }, 5000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <HomePreloader isLoading={isLoading}>
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
    </HomePreloader>
  );
};

export default HomePage;
