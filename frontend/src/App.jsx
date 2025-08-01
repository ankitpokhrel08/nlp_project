import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Chat from "./components/Chat";
import NERChat from "./components/NERChat";
import NotFound from "./components/NotFound";
import OurMission from "./components/OurMission";

// Home component with all the main sections
const Home = () => (
  <>
    <Header />
    <Hero />
    <About />
    <Benefits />
    <Footer />
  </>
);

const App = () => {
  return (
    <>
      <div className="pt-[4.5rem] lg:pt-[5rem] overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:modelName" element={<Chat />} />
          <Route path="/ner/:modelName" element={<NERChat />} />
          <Route path="/ourmission" element={<OurMission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
