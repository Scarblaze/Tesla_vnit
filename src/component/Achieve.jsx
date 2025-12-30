import React, { useEffect, useState } from "react";

function Achieve() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned HTML instead of JSON. Check API routes.");
        }
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched achievements data:", data);
        setAchievements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements data:", err);
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading achievements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error Loading Achievements</div>
          <div className="text-sm mt-2 text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 md:px-20">
      <h1 className="text-5xl font-extrabold text-center mb-4 text-cyan-400">
        Our Achievements
      </h1>
      
      <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
        Celebrating our milestones and successes in innovation and technology
      </p>

      <div className="max-w-4xl mx-auto">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center gap-8 mb-16 bg-gray-900/50 rounded-2xl p-6 border border-gray-700`}
          >
            {/* Achievement Image */}
            <div className="flex-shrink-0 w-full md:w-48 h-48 flex items-center justify-center">
              <img
                src={achievement.smallImage}
                alt={achievement.title}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  console.error(`Failed to load image: ${achievement.smallImage}`);
                  e.target.src = '/assets/achievements/placeholder.png';
                }}
              />
            </div>
            
            {/* Achievement Content */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4">
                {achievement.title}
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {achievement.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {achievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-4">No achievements to display yet.</div>
          <p className="text-gray-500">Our journey of success is just beginning!</p>
        </div>
      )}
    </div>
  );
}

export default Achieve;
