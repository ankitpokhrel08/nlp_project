import Section from "./Section";

const About = () => {
  return (
    <Section
      className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50"
      id="about"
      crosses
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              About <span className="text-brand-primary">Us</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We are the{" "}
              <span className="font-semibold text-brand-primary">079BCTA</span>{" "}
              batch of Pulchowk Campus, and this project was developed as part of our 5th semester{" "}
              <span className="font-semibold text-brand-secondary">Software Engineering Project</span>
              . Under the expert guidance of{" "}
              <a
                href="https://scholar.google.com/citations?user=tmzff0YAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-secondary underline font-semibold transition-colors duration-200"
              >
                Mr. Aman Sakya
              </a>
              , our esteemed professor, we built this comprehensive platform.
              This project showcases the remarkable work done by students under
              his mentorship as part of their Bachelor's and Master's projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Academic Excellence
              </h3>
              <p className="text-gray-600">
                Combining theoretical knowledge with practical implementation to
                create innovative NLP solutions
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Student Community
              </h3>
              <p className="text-gray-600">
                Building bridges between undergraduate and graduate research to
                foster collaborative learning
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Knowledge Showcase
              </h3>
              <p className="text-gray-600">
                Presenting cutting-edge research in an accessible platform for
                the broader community
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
