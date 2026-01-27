import "../styles/animecard.css"
import { useNavigate } from "react-router-dom";

function AnimeCard({ anime, onAddToWatchlist }){

    if(!anime) return null;

    const navigate = useNavigate();
    const {title, image, year, status} = anime;

    const isAiring = status === "RELEASING";

    return(
        <div 
            className="anime-card"
            onClick={() => navigate(`/detail/${anime.id}`)}>
            <div className="image-wrapper">
                <img 
                    src={image} 
                    alt={title}
                    loading="lazy" />
                <button
                    className="watchlist-btn"
                    onClick={() => onAddToWatchlist?.(anime)}>
                        +
                </button>
            </div>
            <h3>{title}</h3>
            <span className="anime-year">
                {isAiring ? 'currently airing' : year || "unknown"}
            </span>
        </div>
    )
}

export default AnimeCard