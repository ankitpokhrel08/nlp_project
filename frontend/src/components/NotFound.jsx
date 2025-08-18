import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  const navigate = useNavigate();

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <Section className="min-h-screen flex items-center justify-center">
        <div className="container relative z-2 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center rounded-full bg-n-6">
              <span className="text-6xl">🤖</span>
            </div>

            <Heading className="mb-6" title="404 - Page Not Found" />

            <p className="body-1 text-n-3 mb-8 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>

            <div className="flex justify-center gap-4">
              <Button
                onClick={goHome}
                className="px-8 py-3 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg border border-n-5/50"
              >
                Go Home
              </Button>
              <button
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-xl transition-all duration-200 font-code text-sm font-semibold border border-n-5/50 hover:border-n-4"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default NotFound;
