const helper=require('./helper.js');
const handleAnime=(e)=>{
    e.preventDefault();
    helper.hideError();
    let name=e.target.querySelector('#animeName').value;
    let genre=e.target.querySelector('#animeGenre').value;
    let rating=e.target.querySelector('#animeRating').value;
    const _csrf=e.target.querySelector('#_csrf').value;
    if(!name&&!genre&&!rating){
        name="Cory In The House";
        genre="Isekai";
        rating="999";
    } else if(!name||!genre||!rating){
        helper.handleError('All fields are required.');
        return false;
    }
    helper.sendPost(e.target.action, {name,genre,rating,_csrf}, loadAnimesFromServer);
    return false;
}
const AnimeForm=(props)=>{
    return (
        <form id="animeForm" onSubmit={handleAnime}
        name="animeForm" action="/maker"
        method="POST" className="animeForm">
            <input id="animeName" type="text" name="name" placeholder="Anime Title" />
            <input id="animeGenre" type="text" name="genre" placeholder="Genre" />
            <input id="animeRating" type="number" min="0" name="rating" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeAnimeSubmit" type="submit" value="Add to your list" />
        </form>
    );
}
const AnimeList=(props)=>{
    if(props.animes.length === 0){
        return (
            <div className="animeList">
                <h3 className="emptyAnime">You don't have a backlog yet.</h3>
            </div>
        );
    }
    const animeNodes=props.animes.map(anime => {
        return(
            <div key={anime._id} className="anime">
                <h3 className="animeInfo"> Title: {anime.name}; Genre: {anime.genre}; Rating: {anime.rating} </h3>
            </div>
        );
    });
    return(
        <div className="animeList">
            {animeNodes}
        </div>
    );
};
const loadAnimesFromServer=async()=>{
    const response = await fetch('/getAnimes');
    const data = await response.json();
    ReactDOM.render(
        <AnimeList animes={data.animes} />,
        document.getElementById('animes')
    );
}
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    ReactDOM.render(
        <AnimeForm csrf={data.csrfToken} />,
        document.getElementById('makeAnime')
    );
    ReactDOM.render(
        <AnimeList animes={[]} />,
        document.getElementById('animes')
    );
    loadAnimesFromServer();
}
window.onload=init;