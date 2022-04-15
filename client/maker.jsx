const helper=require('./helper.js');
const handleAnime=(e)=>{
    e.preventDefault();
    helper.hideError();
    let name=e.target.querySelector('#animeName').value;
    let genre=e.target.querySelector('#animeGenre').value;
    let year=e.target.querySelector('#animeYear').value;
    const _csrf=e.target.querySelector('#_csrf').value;
    if(!name||!genre||!year){
        helper.handleError('All fields are required.');
        return false;
    }
    helper.sendPost(e.target.action, {name,genre,year,_csrf}, loadAnimesFromServer);
    return false;
}
const AnimeForm=(props)=>{
    return (
        <form id="animeForm" onSubmit={handleAnime}
        name="animeForm" action="/maker"
        method="POST" className="animeForm">
            <input id="animeName" type="text" name="name" placeholder="Anime Title" /><br></br><br></br>
            <label for="animeGenre">Genre: </label>
            <select className='animeField' id="animeGenre" name="genre">
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Isekai">Isekai</option>
                <option value="Mecha">Mecha</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Shonen">Shonen</option>
                <option value="Slice of Life">Slice of Life</option>
            </select><br></br><br></br>
            <input id="animeYear" type="number" min="0" name="year" placeholder="Year released" /><br></br><br></br>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeAnimeSubmit" type="submit" value="Add to list" />
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
                <h3 className="animeInfo"> Title: {anime.name}; Genre: {anime.genre}; Year released: {anime.year} </h3>
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