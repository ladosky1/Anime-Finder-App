import WatchlistCard from '../components/WatchlistCard'
import { useWatchlist } from '../context/WatchlistContext'
import '../styles/watchlist.css'

function Watchlist(){
    
    const { watchlist, removeFromWatchlist } = useWatchlist();


    return( 
        <div className='watchlist-page'>
            <h2>My Watchlist</h2>

            {watchlist.length === 0 && (<p>Your watchlist is empty.</p>)}

            <div className='watchlist-grid'>
                {watchlist.map(anime => (
                    <WatchlistCard
                        key={anime.id}
                        anime={anime}
                        onRemove={removeFromWatchlist}/>
                ))}
            </div>    
        </div>
    )
}

export default Watchlist