import { useState, useEffect, createContext, useContext, useRef } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = localStorage.getItem("watchlist");
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    function addToWatchlist(anime){
        setWatchlist(prev => {
            const exists = prev.some(item => item.id === anime.id);
            if (exists) return prev;
            return [...prev, anime];
        })
    }

    function removeFromWatchlist(id){
        setWatchlist(prev => prev.filter(anime => anime.id !== id));
    }

    function isInWatchlist(id){
        return watchlist.some(anime => anime.id === id);
    }

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist(){
    return useContext(WatchlistContext);
}