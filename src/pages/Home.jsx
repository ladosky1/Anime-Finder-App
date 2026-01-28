import { useState, useEffect } from 'react'
import { getAnimeCategories } from '../api/anilist';
import '../styles/home.css'
import CategoryRow from '../components/Category'


function Home() {

    const [heroVisible, setHeroVisible] = useState(false);
    const [popularAnime, setPopularAnime] = useState([]);
    const [actionAnime, setActionAnime] = useState([]);
    const [adventureAnime, setAdventureAnime] = useState([]);
    const [isekaiAnime, setIsekaiAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadAll() {
           try{ 
                const result = await getAnimeCategories(10, 10);
                setPopularAnime(result.top);
                setActionAnime(result.action);
                setAdventureAnime(result.adventure);
                setIsekaiAnime(result.isekai);
            }catch(err){
                setError("Failed to Load Anime. Please Refresh the page!!");
            }
            finally {setLoading(false);}
        };
        loadAll();
        setHeroVisible(true)
    }, [])

    return(
        <main className='home'>          
            <section className={`hero ${heroVisible ? 'visible' : ''}`}>
                <h3>Welcome to aNiMeLad🌀</h3>
                <p>Discover and create a watchlist for your favourite anime.</p>
            </section>

            <section className='categories'>
                <CategoryRow 
                    title="Popular Anime"
                    animeList={popularAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Action Filled Anime"
                    animeList={actionAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Adventure Anime"
                    animeList={adventureAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Isekai Anime"
                    animeList={isekaiAnime}
                    loading={loading}
                    error={error} />
            </section>
        </main>
    )
}

export default Home