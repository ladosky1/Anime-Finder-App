import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { searchAnimePreview } from '../api/anilist';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar(){
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [preview, setPreview] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceQuery = useDebounce(query);
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPreview(){
            if(!debounceQuery){
                setPreview([]);
                return;
            }

            const results = await searchAnimePreview(debounceQuery);
            setPreview(results);
        }

        loadPreview();
    }, [debounceQuery]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [preview]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current &&  !searchRef.current.contains(e.target)){
                setSearchOpen(false);
                setPreview([]);
                setActiveIndex(-1);
            }  
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
            if(!searchOpen) return;

            if (e.key === "ArrowDown"){
                e.preventDefault();
                setActiveIndex(prev => 
                    prev < preview.length - 1 ? prev + 1 : 0
                );
            }
            if (e.key === "ArrowUp"){
                e.preventDefault();
                setActiveIndex(prev => 
                    prev > 0 ? prev - 1 : preview.length - 1
                );
            }

            if(e.key === "Enter"){
                e.preventDefault();
                if (activeIndex >= 0 && preview[activeIndex]){
                    navigate(`/results?q=${preview[activeIndex].title}`)
                } else {
                    navigate(`results?q=${query}`)
                }
                setSearchOpen(false);
            }
    }

    
    return(
        <nav className='navbar'>
            <div className='logo'>
                <Link to='/' className='logo'>
                    LadoSky Anime Finder🌀
                </Link>
            </div>

            <div className='navbar-right'>
                <div 
                    ref={searchRef}
                    className={`search-container ${searchOpen ? 'active' : ''}`}>
                    <span 
                        className='search-icon'
                        onClick={() => {
                            setSearchOpen(true);
                            setTimeout(() => inputRef.current?.focus(), 0)}}>
                            🔍︎
                    </span>
                    <input 
                        type="text"
                        autoComplete='off'
                        placeholder='Search anime...'
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(-1);}}
                        onKeyDown={handleKeyDown}
                        className='search-input' />

                    {searchOpen && preview.length > 0 && (
                        <div className='search-preview'>
                            {preview.map((anime, index)=> (
                                <div 
                                    key={anime.id}
                                    className={`preview-item ${index === activeIndex ? "active" : ""}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => navigate(`/results?q=${anime.title}`)}>
                                <img src={anime.image} alt={anime.title} />
                                <div>
                                    <p>{anime.title}</p>
                                    <span>{anime.year}</span>
                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className='login-btn'>Login</button> {/* Placeholder for future login functionality */}

                <div className='menu-dropdown'>
                    <button 
                        className='menu-btn'
                        onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>
                    {menuOpen && (
                        <div className='dropdown-content'>
                            <Link to='/'>Home</Link>
                            <Link to='/watchlist'>Watchlist</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;