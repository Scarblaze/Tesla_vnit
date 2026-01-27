import React, { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
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
        console.log("Fetched projects data:", data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects data:", err);
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-cyan-400 text-lg sm:text-xl text-center">
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-red-400 text-lg sm:text-xl text-center">
          <div>Error Loading Projects</div>
          <div className="text-sm mt-2 text-gray-400 break-words">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 sm:py-12 px-4 sm:px-6 md:px-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 sm:mb-8 text-cyan-400">
        Our Projects
      </h1>

      <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto px-2">
        Showcasing our past and ongoing innovative projects in autonomous systems
        and electric vehicles.
      </p>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="
              bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden
              shadow-lg transition-all duration-300 flex flex-col h-full
              hover:shadow-cyan-400/20
              sm:hover:scale-105
            "
          >
            {/* ✅ Image height responsive */}
            <div className="h-44 sm:h-48 overflow-hidden flex-shrink-0">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: ${project.image}`);
                  e.target.src = "/assets/placeholder.jpg";
                }}
              />
            </div>

            <div className="p-4 sm:p-6 flex-grow flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-2 sm:mb-3 break-words">
                {project.name}
              </h2>

              {/* ✅ Better mobile description */}
              <div className="mb-4 flex-grow">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-4 break-words">
                  {project.shortDescription}
                </p>
              </div>

              {/* Team Members */}
              <div className="mt-auto">
                <h3 className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">
                  Team Members:
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.people.map((person, index) => (
                    <span
                      key={index}
                      className="
                        bg-cyan-900/30 text-cyan-300
                        px-3 py-1 rounded-full text-xs sm:text-sm
                        border border-cyan-700/50
                        break-words
                      "
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-gray-400 text-lg sm:text-xl">
            No projects to display yet.
          </p>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Check back soon for updates!
          </p>
        </div>
      )}
    </div>
  );
}

export default Projects;
