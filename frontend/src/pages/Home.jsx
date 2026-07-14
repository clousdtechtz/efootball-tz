import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex flex-col justify-between"
        style={{ backgroundImage: "url('../../assets/images/main_page_1.png')" }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/60 z-0" />

        {/* Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Title / Welcoming Text */}
            <h2 className="text-pink-500 font-bold text-xl md:text-2xl uppercase tracking-wider">
              Welcome everyone
            </h2>
            
            <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-tight uppercase tracking-wide">
              ourouimed <span className="text-yellow-400">Midnight</span>
              <br />
              <span className="text-white">Tournament 2027</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Jisajiri sasa na jiunge na second edition of the tournament. Play matches, check your stats, and have fun with other players!
            </p>

            {/* Interactive Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                to="/stats"
                className="w-full sm:w-auto px-8 py-4 bg-yellow-400 text-primary font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 uppercase tracking-wider text-sm shadow-lg text-center"
              >
                View Statistics
              </Link>
              
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-all duration-200 uppercase tracking-wider text-sm shadow-lg text-center"
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
