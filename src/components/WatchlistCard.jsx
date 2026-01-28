import { useNavigate } from "react-router-dom";
import "../styles/watchlistcard.css";

function WatchlistCard({ anime, onRemove}){
    const navigate = useNavigate();

    return(
        <div className="watchlist-card">
            <img 
                src={anime.image} 
                alt={anime.title}/>
            
            <div className="watchlist-info">
                <h3>{anime.title}</h3>
                <span>{anime.status === 
                            "CURRENTLY AIRING" ? 
                            "Currently Airing" : 
                            anime.year || "Unknown Year"}</span>

                <div className="watchlist-actions">
                    <button
                        className="view-btn"
                        onClick={() => navigate(`/detail/${anime.id}`)}>
                        View Details
                    </button>

                    <button
                        className="remove-btn"
                        onClick={() => onRemove(anime.id)}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )

}

export default WatchlistCard