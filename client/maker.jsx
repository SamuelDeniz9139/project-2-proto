const helper=require('./helper.js');
const handleDomo=(e)=>{
    e.preventDefault();
    helper.hideError();
    let name=e.target.querySelector('#domoName').value;
    let age=e.target.querySelector('#domoAge').value;
    let color=e.target.querySelector('#domoColor').value;
    const _csrf=e.target.querySelector('#_csrf').value;
    if(!name&&!age&&!color){
        name="Are you trying to be funny by not naming me?";
        age="69";
        color="Purple, I guess";
    } else if(!name||!age||!color){
        helper.handleError('All fields are required.');
        return false;
    }
    helper.sendPost(e.target.action, {name,age,color,_csrf}, loadDomosFromServer);
    return false;
}
const DomoForm=(props)=>{
    return (
        <form id="domoForm" onSubmit={handleDomo}
        name="domoForm" action="/maker"
        method="POST" className="domoForm">
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <label htmlFor="color">Color: </label>
            <input id="domoColor" type="text" name="color" placeholder="Domo Color" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
}
const DomoList=(props)=>{
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet.</h3>
            </div>
        );
    }
    const domoNodes=props.domos.map(domo => {
        return(
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoInfo"> {domo.name}, the {domo.age}-year old {domo.color} Domo. </h3>
            </div>
        );
    });
    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );
};
const loadDomosFromServer=async()=>{
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );
    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );
    loadDomosFromServer();
}
window.onload=init;