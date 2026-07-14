import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CheckCircle, AlertCircle } from "lucide-react";
// Import your local country codes file directly!
import { countryCodes } from "../utils/countryCodes";
import bgImage from "../../assets/images/main_page_1.png";

const Register = () => {
  const API_URL = 'https://efootball-tz.onrender.com';
  const navigate = useNavigate();

  // State for form data
  const [inscription, setInscription] = useState({
    teamName: "",
    phoneNum: "",
    userName: "",
    countryCode: "+255", // Default to Tanzania
  });

  const [statusMsg, setStatusMsg] = useState(null);
  const [status, setStatus] = useState(null);

  // Auto-switch code helper if they type TZ prefixes, but leave their input numbers intact!
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Digits only

    let detectedCode = inscription.countryCode;

    // If they type a local TZ prefix, auto-select the "+255" code dropdown
    if (value.startsWith("255") || value.startsWith("07") || value.startsWith("06")) {
      detectedCode = "+255";
    }

    setInscription({
      ...inscription,
      phoneNum: value,
      countryCode: detectedCode
    });
  };

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    const { teamName, phoneNum, userName, countryCode } = inscription;

    if (!teamName || !phoneNum || !userName) {
      setStatusMsg("Please fill all fields!");
      setStatus(false);
      return;
    }

    if (teamName.length < 3) {
      setStatusMsg("Team name must be at least 3 characters long");
      setStatus(false);
      return;
    }

    // Clean up any leading '0' if they selected +255 and typed '07xxxxxx' or '06xxxxxx'
    let finalPhoneNum = phoneNum.replace(/\s/g, "");
    if (countryCode === "+255" && (finalPhoneNum.startsWith("07") || finalPhoneNum.startsWith("06"))) {
      finalPhoneNum = finalPhoneNum.substring(1); // strip the leading 0 (e.g. 0623... becomes 623...)
    }

    // Combine code + clean number for your backend
    const fullPhone = `${countryCode}${finalPhoneNum}`;

    try {
      const response = await axios.post(`${API_URL}/teams/register`, {
        ...inscription,
        phoneNum: fullPhone // Send the full concatenated number
      });
      
      setStatusMsg(response.data.message);
      setStatus(true);
      setTimeout(() => navigate("/stats"), 1500);
    } catch (err) {
      setStatusMsg(err.response?.data?.error || "Failed to register team");
      setStatus(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-md border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200";

  const bgImagePath = `${import.meta.env.BASE_URL}assets/images/main_page_1.png`;

  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex flex-col justify-between"
        style={{ backgroundImage: `url(${bgImagePath})` }}
      >
        <div className="absolute inset-0 bg-primary/60 z-0" />

        <div className="relative z-10 bg-primary/40 p-4 min-h-screen flex items-center justify-center w-full">
          <div className="w-full max-w-xl bg-primary/95 rounded-2xl p-6 md:p-8 shadow-xl border border-white/5 backdrop-blur-md">
            <form onSubmit={handleRegisterTeam} className="space-y-4 md:space-y-6">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-yellow-400 uppercase tracking-wider">Register Now</h3>
                <p className="text-sm md:text-base text-white mt-2 font-medium">
                  Ready for <span className="text-pink-500 font-semibold">Second edition</span>? Join the{" "}
                  <span className="text-yellow-400 font-semibold">eFootball</span> tournament!
                </p>
              </div>

              <div className="space-y-4">
                {/* Team Name */}
                <input
                  type="text"
                  placeholder="Team Name"
                  className={inputStyle}
                  value={inscription.teamName}
                  onChange={(e) => setInscription({ ...inscription, teamName: e.target.value.trimStart() })}
                />

                {/* PES Username */}
                <input
                  type="text"
                  placeholder="Username in PES"
                  className={inputStyle}
                  value={inscription.userName}
                  onChange={(e) => setInscription({ ...inscription, userName: e.target.value.trimStart() })}
                />

                {/* Phone Number Group */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-white/60 ml-1">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      className="w-[110px] px-2 py-3 bg-white/10 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer text-sm"
                      value={inscription.countryCode}
                      onChange={(e) => setInscription({ ...inscription, countryCode: e.target.value })}
                    >
                      {countryCodes.map((c, i) => (
                        <option key={i} value={c.code} className="bg-primary text-white">
                          {c.code} {c.flag}
                        </option>
                      ))}
                    </select>
                    
                    <input
                      type="tel"
                      placeholder="612345678"
                      className={`${inputStyle} flex-1`}
                      value={inscription.phoneNum}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-4 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 hover:scale-[1.01] active:scale-95 transition-all duration-200 shadow-lg uppercase tracking-wider"
              >
                Register Now
              </button>

              {statusMsg && (
                <div
                  className={`flex items-center gap-2 text-sm sm:text-base font-medium px-4 py-3 rounded-md border animate-in fade-in zoom-in duration-300
                    ${status 
                      ? "bg-green-500/20 text-green-400 border-green-500/50" 
                      : "bg-red-500/20 text-red-400 border-red-500/50"
                    }`}
                >
                  {status ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{statusMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
