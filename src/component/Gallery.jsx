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
    document.body.style.overflow = "hidden"; // ✅ stop background scroll
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // ✅ allow scroll again
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-cyan-400 text-lg sm:text-xl text-center">
          Loading gallery...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-red-400 text-lg sm:text-xl text-center">
          <div>Error Loading Gallery</div>
          <div className="text-sm mt-2 text-gray-400 break-words">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 sm:py-12 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Gallery
        </h1>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
          Visual journey through our innovations and collaborations
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {gallery.map((item, index) => (
          <div
            key={item.id}
            className={`group cursor-pointer relative overflow-hidden rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-500 
              ${index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            `}
            onClick={() => openModal(item)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  console.error(`Failed to load image: ${item.src}`);
                  e.target.src = "/assets/gallery/placeholder.jpg";
                }}
              />
            </div>

            {/* ✅ On Mobile: show caption by default (hover doesn't exist on mobile) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-3 sm:p-4 w-full transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white font-semibold text-xs sm:text-sm text-center">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Shine Effect (only meaningful on larger screens) */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {gallery.length === 0 && (
        <div className="text-center py-14 sm:py-20 px-4">
          <div className="text-gray-400 text-xl sm:text-2xl mb-3 sm:mb-4">
            Gallery Empty
          </div>
          <p className="text-gray-500 text-sm sm:text-base">
            Stay tuned for amazing moments from our journey!
          </p>
        </div>
      )}

      {/* ✅ Mobile Friendly Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-400/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="w-full max-h-[65vh] sm:max-h-[70vh] object-contain"
              />

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white bg-red-500 hover:bg-red-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-lg sm:text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
              <h3 className="text-cyan-300 text-lg sm:text-2xl font-bold text-center break-words">
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
