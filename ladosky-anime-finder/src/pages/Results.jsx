import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import AnimeResultCard from '../components/AnimeResultCard'
import { useWatchlist } from '../context/WatchlistContext'
import Loader from '../components/loader'
import { searchAnime } from '../api/anilist'
import '../styles/results.css'

function Results(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addToWatchlist } = useWatchlist();

    const handleAddToWatchlist = (anime) => {
        addToWatchlist(anime);
    }

    const handleOpenDetail = (anime) => {
        navigate(`/detail/${anime.id}`);
    }

    useEffect(() => {
        if (!query) return;

        async function loadResults(){
            try{
                setLoading(true);
                setError(null);

                const data = await searchAnime(query);
                setResults(data);
            }
            catch(err){
                setError("Failed to load results. Please try again.");
            }
            finally{
                setLoading(false);
            }
        }

        loadResults();
    }, [query]);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className='results-page'>
            <h2>Results for "{query}"</h2>

            {results.length === 0 && <p>No Results Found</p>}

            <div className='results-grid'>
                {results.map(anime => (
                    <AnimeResultCard
                        key={anime.id}
                        anime={anime}
                        onAddToWatchlist={handleAddToWatchlist}
                        onOpenDetail={handleOpenDetail}/>
                    ))}
            </div>
        </div>
    );
}

export default Results