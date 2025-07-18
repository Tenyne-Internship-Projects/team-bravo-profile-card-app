// src/components/FavoriteToggle.jsx
import { useState } from "react";
import { favoriteProject, unfavoriteProject } from "@/api/favoriteApi";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import "../styles/FavoriteToggle.css";

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
      className={`favorite-toggle-button ${favorited ? "favorited" : ""}`}
      aria-label={favorited ? "Unfavorite project" : "Favorite project"}
    >
      <HeartIcon className="favorite-icon" />
    </button>
  );
};

export default FavoriteToggle;
