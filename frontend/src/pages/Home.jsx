import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  // Dynamically resolve the path to the public assets folder
  const bgImagePath = `${import.meta.env.BASE_URL}assets/images/main_page_1.png`;

  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex flex-col justify-between"
        style={{ backgroundImage: `url(${bgImagePath})` }}
      >
        {/* Dark Overlay for depth and text readability */}
        <div className="absolute inset-0 bg-primary/50 z-0" />

        {/* Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* Title / Welcoming Text */}
            <h2 className="text-pink-500 font-bold text-lg md:text-xl uppercase tracking-wider">
              Welcome everyone
            </h2>
            
            <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-tight uppercase tracking-wide">
              ourouimed
              <br />
              <span className="text-yellow-400">Midnight</span>
              <br />
              <span className="text-white">Tournament 2027</span>
            </h1>

            {/* Swahili Subtitle */}
            <p className="text-white/90 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
              Jisajiri sasa na jiunge na second edition of the tournament. Play matches, check your stats, and have fun with other players!
            </p>

            {/* Compact, Centered Pill Buttons */}
            <div className="flex flex-col gap-3 justify-center items-center pt-4 w-full max-w-xs mx-auto">
              <Link
                to="/stats"
                className="w-full py-3 bg-yellow-400 text-primary font-bold rounded-full hover:bg-yellow-300 active:scale-95 transition-all duration-200 text-sm tracking-wide shadow-md text-center"
              >
                View Statistics
              </Link>
              
              <Link
                to="/register"
                className="w-full py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 active:scale-95 transition-all duration-200 text-sm tracking-wide shadow-md text-center"
              >
                Join the Tournament
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
