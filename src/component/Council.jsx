import React, { useEffect, useState } from "react";

function Council() {
  const [council, setCouncil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/council")
      .then((res) => {
        const contentType = res.headers.get("content-type");

        // Check if response is JSON
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned HTML instead of JSON. Check API routes.");
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched council data:", data);
        setCouncil(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching council data:", err);
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      });
  }, []);

  const professor = council.find((m) =>
    m.role?.toLowerCase().includes("president")
  );

  // ✅ Fix: exclude president properly, but keep vice president
  const members = council.filter(
    (m) =>
      !m.role?.toLowerCase().includes("president") ||
      m.role?.toLowerCase().includes("vice president")
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-cyan-400 text-lg sm:text-xl text-center">
          Loading council data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-red-400 text-lg sm:text-xl text-center">
          <div>Error Loading Council Data</div>
          <div className="text-sm mt-2 text-gray-400 break-words">{error}</div>
          <div className="text-sm mt-4 text-gray-300">
            Please check if the server is running on port 4000
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 sm:py-12 px-4 sm:px-6 md:px-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-12 text-cyan-400">
        Our Council
      </h1>

      {/* Professor In-Charge */}
      {professor && (
        <div className="max-w-xl mx-auto mb-12 sm:mb-16 text-center px-2">
          <img
            src={professor.profilePic}
            alt={professor.name}
            className="mx-auto w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
            onError={(e) => {
              console.error(`Failed to load image: ${professor.profilePic}`);
              e.target.src = "/assets/placeholder.jpg";
            }}
          />

          <h2 className="text-xl sm:text-2xl font-semibold mt-4">
            {professor.name}
          </h2>

          <p className="text-cyan-300 text-sm sm:text-base">{professor.role}</p>

          <p className="mt-2 text-gray-300 text-sm sm:text-base break-words">
            {professor.email}
          </p>

          <p className="text-gray-400 text-sm sm:text-base">{professor.phone}</p>
        </div>
      )}

      {/* Council Members */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-cyan-300">
        Council Members
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
        {members.map((member) => (
          <div
            key={member.id}
            className="w-full max-w-[320px] bg-gray-900 border border-gray-700 rounded-2xl p-5 sm:p-6 text-center shadow-md hover:shadow-cyan-400/30 transition"
          >
            <img
              src={member.profilePic}
              alt={member.name}
              className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-cyan-400"
              onError={(e) => {
                console.error(`Failed to load image: ${member.profilePic}`);
                e.target.src = "/assets/placeholder.jpg";
              }}
            />

            <h3 className="text-lg sm:text-xl font-semibold mt-4 text-cyan-300">
              {member.name}
            </h3>

            <p className="text-gray-400 text-sm sm:text-base">{member.role}</p>

            <p className="text-xs sm:text-sm text-gray-400 mt-2 break-words">
              {member.email}
            </p>

            <p className="text-xs sm:text-sm text-gray-500">{member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Council;
