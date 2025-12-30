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

  const professor = council.find((m) => m.role.toLowerCase().includes("president"));
  const members = council.filter((m) => !m.role.toLowerCase().includes("president") || m.role.toLowerCase().includes("vice president"));

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading council data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error Loading Council Data</div>
          <div className="text-sm mt-2 text-gray-400">{error}</div>
          <div className="text-sm mt-4">
            Please check if the server is running on port 4000
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 md:px-20">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-cyan-400">
        Our Council
      </h1>

      {/* Professor In-Charge */}
      {professor && (
        <div className="max-w-xl mx-auto mb-16 text-center">
          <img
            src={professor.profilePic}
            alt={professor.name}
            className="mx-auto w-40 h-40 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
            onError={(e) => {
              console.error(`Failed to load image: ${professor.profilePic}`);
              e.target.style.display = 'none';
            }}
          />
          <h2 className="text-2xl font-semibold mt-4">{professor.name}</h2>
          <p className="text-cyan-300">{professor.role}</p>
          <p className="mt-2 text-gray-300">{professor.email}</p>
          <p className="text-gray-400">{professor.phone}</p>
        </div>
      )}

      {/* Council Members */}
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-300">
        Council Members
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center shadow-md hover:shadow-cyan-400/30 transition"
          >
            <img
              src={member.profilePic}
              alt={member.name}
              className="mx-auto w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
              onError={(e) => {
                console.error(`Failed to load image: ${member.profilePic}`);
                e.target.src = '/assets/placeholder.jpg';
              }}
            />
            <h3 className="text-xl font-semibold mt-4 text-cyan-300">
              {member.name}
            </h3>
            <p className="text-gray-400">{member.role}</p>
            <p className="text-sm text-gray-400 mt-2">{member.email}</p>
            <p className="text-sm text-gray-500">{member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Council;