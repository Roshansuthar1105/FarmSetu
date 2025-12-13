import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  FaWater,
  FaClock,
  FaCalendarAlt,
  FaHistory,
  FaExclamationCircle,
  FaPlus,
  FaTimes,
  FaWifi,
} from "react-icons/fa";
import { MdWaterDrop, MdTimer } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import toast from "react-hot-toast";

const DigitalParchi = () => {
  const { BACKEND_URL, authUser } = useAuthContext();

  // --- State Management ---
  const [myTurns, setMyTurns] = useState([]);
  const [liveStatus, setLiveStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false); 

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    date: "",
    duration: 60,
    reason: "",
  });

  // --- Fetch Data Logic ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setServerError(false);

        // --- FIX START: Correctly extract token ---
        // 1. Get the entire user object string
        const userStr = localStorage.getItem("user");
        let token = null;
        
        // 2. Parse it to JSON
        if (userStr) {
            const userData = JSON.parse(userStr);
            token = userData.token;
        }

        // 3. Fallback to authUser context if local storage fails
        if (!token && authUser && authUser.token) {
            token = authUser.token;
        }

        if (!token) {
            console.warn("No token found. User needs to login again.");
            // Optional: Redirect to login if critical
            return; 
        }
        // --- FIX END ---

        const headers = { Authorization: `Bearer ${token}` };

        // 1. Get My Turns
        const turnsRes = await fetch(`${BACKEND_URL}/api/parchi/my-turns`, {
          headers,
        });

        // 2. Get Live Status
        const liveRes = await fetch(`${BACKEND_URL}/api/parchi/live`, {
          headers,
        });

        if (turnsRes.status === 500 || liveRes.status === 500) {
          throw new Error("Internal Server Error");
        }

        if (turnsRes.ok) {
          const turnsData = await turnsRes.json();
          setMyTurns(turnsData);
        }

        if (liveRes.ok) {
          const liveData = await liveRes.json();
          setLiveStatus(liveData);
        }
      } catch (error) {
        console.error("Error fetching parchi data:", error);
        setServerError(true); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); 
    return () => clearInterval(interval);
  }, [BACKEND_URL, authUser]); // Added authUser dependency

  // --- Handle Application Submission ---
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const waterSourceId = liveStatus?.source?._id || "672b85b4fdf5feff81934a5a";

      // --- FIX START: Correct Token Extraction for POST request ---
      const userStr = localStorage.getItem("user");
      let token = null;
      if (userStr) {
          token = JSON.parse(userStr).token;
      }
      // --- FIX END ---

      const farmerPayload = {
        farmerId: authUser?._id,
        farmerName: authUser?.name,
        farmerEmail: authUser?.email,
      };

      const res = await fetch(`${BACKEND_URL}/api/parchi/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the corrected token variable
        },
        body: JSON.stringify({
          waterSourceId,
          preferredDate: requestData.date,
          durationMinutes: requestData.duration,
          reason: requestData.reason,
          ...farmerPayload,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Application Submitted Successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(data.error || "Application Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error: Could not submit request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex flex-col justify-center items-center text-white p-4">
        <div className="bg-gray-800 p-8 rounded-xl border border-red-500/30 shadow-2xl text-center max-w-md">
          <FaWifi className="text-6xl text-red-500 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Connection Failed</h2>
          <p className="text-gray-400 mb-6">
            We couldn't reach the FarmSetu server. Please check your internet connection or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-green-500/20"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 pt-24 px-4 pb-12 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Digital Parchi (Irrigation)
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your water turns and view live status.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-gray-800 px-4 py-2 rounded-full border border-gray-700 flex items-center">
            <FaWater className="text-blue-400 mr-2" />
            <span className="text-sm text-gray-300">
              Region:{" "}
              <span className="text-white font-semibold">
                {authUser?.location || "Rajasthan"}
              </span>
            </span>
          </div>
        </div>

        {/* LIVE STATUS WIDGET */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Status Card */}
          <div className="md:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div
              className={`absolute top-0 left-0 w-1 h-full ${
                liveStatus?.status === "Active" ? "bg-green-500" : "bg-gray-600"
              }`}
            ></div>
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center mb-4">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        liveStatus?.status === "Active"
                          ? "bg-green-400"
                          : "bg-gray-500"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        liveStatus?.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    ></span>
                  </span>
                  Live Status: {liveStatus?.status || "Idle"}
                </h2>

                {liveStatus?.status === "Active" ? (
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      Currently Irrigating
                    </p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          liveStatus.currentFarmer?.avatar ||
                          "https://cdn-icons-png.flaticon.com/128/1154/1154966.png"
                        }
                        alt="Farmer"
                        className="w-12 h-12 rounded-full border-2 border-green-500"
                      />
                      <div>
                        <span className="text-lg font-bold text-green-400 block">
                          {liveStatus.currentFarmer?.name}
                        </span>
                        <p className="text-xs text-gray-300 flex items-center mt-1">
                          <MdTimer className="mr-1 text-blue-400" />
                          Ends at:{" "}
                          {new Date(liveStatus.endsAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-gray-400 italic">
                      No active irrigation at this source right now.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      The water source is free for allocation.
                    </p>
                  </div>
                )}
              </div>
              <MdWaterDrop className="text-9xl text-blue-500/5 absolute -bottom-8 -right-4 group-hover:text-blue-500/10 transition-all duration-500" />
            </div>
          </div>

          {/* Quick Stats / Info */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <WiHumidity className="text-8xl text-blue-400" />
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">
              Source Health
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-3xl font-bold text-white mb-1">Good</p>
                <p className="text-xs text-green-400">Flow Rate Optimal</p>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Pressure</span>
                <span>85%</span>
              </div>
            </div>

            <button className="w-full mt-auto py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors flex items-center justify-center border border-gray-600 hover:border-gray-500">
              <FaExclamationCircle className="mr-2 text-red-400" /> Report Issue
            </button>
          </div>
        </div>

        {/* MY UPCOMING TURNS */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaCalendarAlt className="mr-3 text-green-500" /> Your Allocations
              (Bari)
            </h2>

            {/* REQUEST BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transform transition hover:-translate-y-0.5 hover:shadow-green-500/25"
            >
              <FaPlus className="mr-2" /> Request Water
            </button>
          </div>

          {myTurns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTurns.map((turn) => (
                <div
                  key={turn._id}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-green-500 hover:shadow-xl transition-all duration-300 group relative"
                >
                  <div className="absolute top-4 right-4 text-gray-600 group-hover:text-green-500/20 transition-colors">
                    <MdWaterDrop size={40} />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`text-xs px-2 py-1 rounded border ${
                        turn.status === "active"
                          ? "bg-green-900/30 text-green-400 border-green-800"
                          : "bg-blue-900/30 text-blue-400 border-blue-800"
                      }`}
                    >
                      {turn.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {new Date(turn.startTime).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-3xl font-light text-green-400 mb-2">
                    {new Date(turn.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <FaClock className="mr-2 text-blue-400" />
                    Duration: {turn.durationMinutes} mins
                  </div>

                  <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Source:{" "}
                      <span className="text-gray-300 font-mono">
                        {turn.waterSource?.sourceId || "Tube Well"}
                      </span>
                    </div>
                    {turn.isMLOptimized && (
                      <span
                        className="text-xs text-purple-400 flex items-center bg-purple-900/20 px-2 py-0.5 rounded-full"
                        title="Optimized by AI"
                      >
                        ✨ AI Optimized
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-700">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-2xl text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No Scheduled Turns
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                You don't have any upcoming irrigation slots. Check back later
                when the weekly roster is generated, or click "Request Water"
                above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL (POPUP FORM) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gray-800 rounded-xl border border-gray-600 w-full max-w-md p-8 shadow-2xl relative animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <FaTimes size={16} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">
              Apply for Water
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Request an ad-hoc water turn for your crops.
            </p>

            <form onSubmit={handleApply} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setRequestData({ ...requestData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Duration (Minutes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="15"
                    max="180"
                    defaultValue="60"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    onChange={(e) =>
                      setRequestData({
                        ...requestData,
                        duration: e.target.value,
                      })
                    }
                  />
                  <span className="absolute right-4 top-3 text-gray-500 text-sm">
                    mins
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Min: 15 mins, Max: 180 mins
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Reason (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Vegetables need extra water due to heat wave..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                  onChange={(e) =>
                    setRequestData({ ...requestData, reason: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 mt-2"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalParchi;