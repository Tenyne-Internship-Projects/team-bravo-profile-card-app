// src/components/FavoriteToggle.jsx
import { useState } from "react";
import { favoriteProject, unfavoriteProject } from "@/api/favoriteApi";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

const FavoriteToggle = ({ projectId, isInitiallyFavorited }) => {
  const [favorited, setFavorited] = useState(isInitiallyFavorited);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (favorited) {
        await unfavoriteProject(projectId);
      } else {
        await favoriteProject(projectId);
      }
      setFavorited(!favorited);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const HeartIcon = favorited ? FilledHeart : OutlineHeart;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-purple-600 hover:text-purple-800 transition"
      title={favorited ? "Remove from favorites" : "Save to favorites"}
    >
      <HeartIcon className="w-6 h-6" />
    </button>
  );
};

export default FavoriteToggle;
