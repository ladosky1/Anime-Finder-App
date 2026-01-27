import "../styles/category.css"
import AnimeCard from "./AnimeCard"
import Loader from '../components/loader'
import { useWatchlist } from "../context/WatchlistContext"


function CategoryRow({title, animeList, loading, error}){
    
    const { addToWatchlist} = useWatchlist();
    
    const handleAddToWatchlist = (anime) => {
        addToWatchlist(anime);
    }

    return(
        <div className="categroy-row">
            <div className="category-header">
                <h2>{title}</h2>
            </div>

            <div className="category-list">
                {loading ? 
                            <Loader /> :
                            animeList.map(anime => (
                                <AnimeCard 
                                    key={anime.id} 
                                    anime={anime}
                                    onAddToWatchlist={handleAddToWatchlist}/>
                            ))}
                {error && (<p className="error-message">{error}</p>)}           
            </div>
        </div>

    )
}

export default CategoryRow