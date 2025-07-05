import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";
import OurMission from "./components/OurMission";

// Home component with all the main sections
const Home = () => (
  <>
    <Header />
    <Hero />
    <Benefits />
    <Pricing />
    <Footer />
  </>
);

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:modelName" element={<Chat />} />
          <Route path="/ourmission" element={<OurMission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
