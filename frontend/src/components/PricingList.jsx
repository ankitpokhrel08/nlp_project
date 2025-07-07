import { pricing } from "../constants";
import pokhrelBg from "../assets/team/pokhrel.jpg";
import dhaubanjarBg from "../assets/team/dhaubanjar.jpg";
import kisiBg from "../assets/team/kisi.jpg";
import satyalBg from "../assets/team/satyal.jpg";

const PricingList = () => {
  // Function to get the background image based on the pricing item id
  const getBackgroundImage = (id) => {
    switch (id) {
      case "0":
        return pokhrelBg;
      case "1":
        return dhaubanjarBg;
      case "2":
        return kisiBg;
      case "3":
        return satyalBg;
    }
  };

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-[22rem] px-6 py-10 bg-n-8 border border-n-6 rounded-[2rem] relative overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0 opacity-50"
            style={{
              backgroundImage: `url(${getBackgroundImage(item.id)})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="-mt-1">
              <h4
                className={`text-2xl font-bold mb-3 ${
                  item.id === "0"
                    ? "white"
                    : item.id === "1"
                    ? "white"
                    : "white"
                }`}
              >
                {item.title}
              </h4>
            </div>

            <div className="mt-auto">
              <p className="body-2 text-n-1/70 italic">"{item.description}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
