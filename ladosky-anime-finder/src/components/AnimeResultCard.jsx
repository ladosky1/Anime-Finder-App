import "../styles/anime-result-card.css"

function AnimeResultCard({ anime, onAddToWatchlist, onOpenDetail }){
    if(!anime) return null;

    const {
        title,
        image,
        year,
        status,
        episodes,
        genres,
        score,
    } = anime;

    return(
        <article className="result-card">
            <div className="result-image" onClick={() => onOpenDetail?.(anime)}>
                <img src={image} alt={title} loading="lazy"/>
            </div>

            <div className="result-content">
                <header className="result-header">
                    <h3 onClick={() => onOpenDetail?.(anime)}>
                        {title}
                    </h3>

                    <span className="result-meta">
                        {year || "UnKnown"} &bull; {status}
                    </span>
                </header>

                <div className="result-stats">
                    {episodes && <span>{episodes} eps</span>}
                    {score && <span> ⭐ {score}</span>}
                </div>

                {genres?.length > 0 && (
                    <div className="result-genres">
                        {genres.slice(0, 4).map(genre => (
                            <span key={genre}>{genre}</span>
                        ))}
                    </div>
                )}

                <div className="result-action">
                    <button onClick={() => onAddToWatchlist?.(anime)}>
                        + watchlist
                    </button>
                </div>
            </div>
        </article>
    )
}

export default AnimeResultCard