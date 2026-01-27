import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAnimeDetail } from '../api/anilist'
import Loader from '../components/loader'
import { useWatchlist } from '../context/WatchlistContext'
import '../styles/detail.css'

function Detail(){
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const inWatchlist = anime ? isInWatchlist(anime.id) : false;

    useEffect(() => {
        async function loadAnime(){
            try {
                setLoading(true);
                const data = await getAnimeDetail(Number(id));
                setAnime(data);
            } catch (err) {
                setError("Failed to load anime details.");
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        loadAnime();
    }, [id])

    if (loading) return <Loader />;
    if (error) return <p className='page-state'>{error}</p>;
    if (!anime) return null;

    return(
        <div className='detail-page'>
            <section className='detail-hero'>
                <img src={anime.image} alt={anime.title} />

                <div className='detail-info'>
                    <h1>{anime.title}</h1>

                    <div className='meta'>
                        <span>{anime.year || "Unknown Year"}</span>
                        <span>{anime.status}</span>
                        <span>{anime.episodes ? `${anime.episodes} eps` : "Ongoing"}</span>
                        <span>⭐ {anime.score || "N/A"}</span>
                    </div>

                    <div className='genres'>
                        {anime.genres.map(g => (
                            <span key={g}>{g}</span>
                        ))}
                    </div>

                    <button 
                        className='detail-watchlist-btn'
                        onClick={() => inWatchlist ? 
                                        removeFromWatchlist(anime.id) : 
                                        addToWatchlist(anime)}>
                        {inWatchlist ? '✔️ In watchlist' : '➕ add to watchlist'}
                    </button>
                </div>
            </section>

            <section className='detail-content'>
                <h2>Description</h2>
                <div 
                    className='anime-description'
                    dangerouslySetInnerHTML={{__html: anime.description}}>
                </div>
            </section>
        </div>
    )
}

export default Detail