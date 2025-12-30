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
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-cyan-400 text-xl">Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-red-400 text-xl text-center">
                    <div>Error Loading Projects</div>
                    <div className="text-sm mt-2 text-gray-400">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-12 px-6 md:px-20">
            <h1 className="text-5xl font-extrabold text-center mb-12 text-cyan-400">
                Our Projects
            </h1>

            <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                Showcasing our past and ongoing innovative projects in autonomous systems and electric vehicles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-105 flex flex-col h-full"
                    >
                        {/* Project Image - Fixed height */}
                        <div className="h-48 overflow-hidden flex-shrink-0">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.error(`Failed to load image: ${project.image}`);
                                    e.target.src = '/assets/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Project Content - Flexible height */}
                        <div className="p-6 flex-grow flex flex-col">
                            <h2 className="text-2xl font-bold text-cyan-300 mb-3">
                                {project.name}
                            </h2>

                            {/* Description - No height limit */}
                            <div className="mb-4 flex-grow">
                                <p className="text-gray-300 leading-relaxed line-clamp-4">
                                    {project.shortDescription}
                                </p>
                            </div>

                            {/* People Working on Project */}
                            <div className="mt-auto">
                                <h3 className="text-cyan-400 font-semibold mb-2">Team Members:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.people.map((person, index) => (
                                        <span
                                            key={index}
                                            className="bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-700/50"
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

            {/* Empty State */}
            {projects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-xl">No projects to display yet.</p>
                    <p className="text-gray-500 mt-2">Check back soon for updates!</p>
                </div>
            )}
        </div>
    );
}

export default Projects;