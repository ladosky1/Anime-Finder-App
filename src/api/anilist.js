const ANILIST_URL = "https://graphql.anilist.co";

async function fetchAniList(query, variables ={}) {

    try{
        const response = await fetch(ANILIST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query, variables,
            }),
        });

        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }

        const result = await response.json();

        if(result.errors ){
            const message = result.error.map(e => e.message).join("; ");
            throw new Error(`GraphQL error: ${message}`);
        }
        return result.data
    } catch(error){
        throw error;
    }
    
    
}

export async function getAnimeCategories(topLimit = 10, genreLimit = 10){

    const query = `
        query ($topLimit: Int, $genreLimit: Int){
            top: Page(perPage: $topLimit){
                media(type: ANIME, sort: SCORE_DESC){
                    id
                    title { romaji }
                    coverImage { large }
                    startDate { year }
                    status
                }
            }
            action: Page(perPage: $genreLimit){
                media(type: ANIME, genre_in: ["Action"], sort: SCORE_DESC){
                    id
                    title {romaji}
                    coverImage {large}
                    startDate {year}
                    status
                }
            }
            adventure: Page(perPage: $genreLimit){
                media(type: ANIME, genre_in: ["Adventure"], sort: SCORE_DESC){
                    id
                    title {romaji}
                    coverImage {large}
                    startDate {year}
                    status
                }
            }
            isekai: Page(perPage: $genreLimit){
                media(type: ANIME, tag_in: ["Isekai"], sort: SCORE_DESC){
                    id
                    title {romaji}
                    coverImage {large}
                    startDate {year}
                    status
                }
            }
        }`;

    const data = await fetchAniList(query, {topLimit, genreLimit});
    
    function normalize(list){
        return list.map(anime => ({
            id: anime.id,
            title: anime.title.romaji,
            image: anime.coverImage.large,
            year: anime.startDate.year,
            status: anime.status === "RELEASING" ? "CURRENTLY AIRING" : "Finished",
        }));
    }

    return {
        top: normalize(data.top.media),
        action: normalize(data.action.media),
        adventure: normalize(data.adventure.media),
        isekai: normalize(data.isekai.media)
    }

}

    const SEARCH_PREVIEW_QUERY = `
        query($search: String) {
            Page(perPage: 6) {
                media(type: ANIME, search: $search) {
                    id
                    title {romaji}
                    coverImage {medium}
                    startDate {year}
                }
            }
        }`

export async function searchAnimePreview(search){
    
    if(!search) return [];

    const data = await fetchAniList(SEARCH_PREVIEW_QUERY, {search});

    return data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.medium,
        year: anime.startDate.year
    }));
}

export async function searchAnime(query){

    if (!query) return [];

    const searchQuery = `
        query($search: String) {
            Page(perPage: 20) {
                media(search: $search, type: ANIME) {
                    id
                    title {romaji}
                    coverImage {large}
                    description(asHtml: false)
                    startDate {year}
                    status
                    episodes
                    genres
                    averageScore
                }
            }
        }`;

    const data = await fetchAniList(searchQuery, {search: query});

    return data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.large,
        year: anime.startDate.year,
        status: anime.status,
        episodes: anime.episodes,
        genres: anime.genres,
        score: anime.averageScore,
        description: anime.description,
    }))
}

const ANIME_DETAIL_QUERY = `
    query($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {romaji}
            coverImage {extraLarge}
            description
            startDate {year}
            status
            episodes
            genres
            averageScore
        }
    }`;

export async function getAnimeDetail(id) {
    const data = await fetchAniList(ANIME_DETAIL_QUERY, {id});

    const anime = data.Media;

    return {
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.extraLarge,
        year: anime.startDate.year,
        status: anime.status,
        episodes: anime.episodes,
        genres: anime.genres,
        score: anime.averageScore,
        description: anime.description,
    }
}