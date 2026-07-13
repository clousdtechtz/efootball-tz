import { Link, useNavigate } from "react-router-dom";
// Swapped Material UI icons for Lucide React to match your project!
import { ArrowLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-primary text-white p-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-third animate-bounce">404</h1>
          <p className="text-2xl md:text-3xl mt-2 font-medium">
            Sorry, The Page You Searched For Was Not Found!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer home-btn bg-third text-white flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-third/80 transition-all duration-200 w-full sm:w-auto"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
            <Link
              to="/"
              className="home-btn bg-white/10 text-white border border-gray-600 flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 w-full sm:w-auto"
            >
              <Home size={18} /> Go Back To Home Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
