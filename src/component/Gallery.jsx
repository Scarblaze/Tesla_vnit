import React, { useEffect, useState } from "react";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
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
        console.log("Fetched gallery data:", data);
        setGallery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery data:", err);
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error Loading Gallery</div>
          <div className="text-sm mt-2 text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Gallery
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Visual journey through our innovations and collaborations
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {gallery.map((item, index) => (
          <div
            key={item.id}
            className={`group cursor-pointer relative overflow-hidden rounded-2xl border-2 border-gray-700 hover:border-cyan-400 transition-all duration-500 ${
              index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
            onClick={() => openModal(item)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  console.error(`Failed to load image: ${item.src}`);
                  e.target.src = '/assets/gallery/placeholder.jpg';
                }}
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white font-semibold text-sm text-center">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {gallery.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 text-2xl mb-4">Gallery Empty</div>
          <p className="text-gray-500">Stay tuned for amazing moments from our journey!</p>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="max-w-6xl max-h-full bg-gray-900 rounded-3xl overflow-hidden border border-cyan-400/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="w-full max-h-[70vh] object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
              <h3 className="text-cyan-300 text-2xl font-bold text-center">
                {selectedImage.caption}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

