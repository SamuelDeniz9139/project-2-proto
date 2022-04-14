const helper=require('./helper.js');
const handleLogin=(e)=>{
    e.preventDefault();
    helper.hideError();
    const user=e.target.querySelector('#user').value;
    const pass=e.target.querySelector('#pass').value;
    const _csrf=e.target.querySelector('#_csrf').value;
    if(!user||!pass){
        helper.handleError('All fields are required.');
        return false;
    }
    helper.sendPost(e.target.action,{user,pass,_csrf});
    return false;
}
const handleSignup=(e)=>{
    e.preventDefault();
    helper.hideError();
    const user=e.target.querySelector('#user').value;
    const pass=e.target.querySelector('#pass').value;
    const pass2=e.target.querySelector('#pass2').value;
    const _csrf=e.target.querySelector('#_csrf').value;
    if(!user||!pass||!pass2){
        helper.handleError('All fields are required.');
        return false;
    }
    if(pass!==pass2){
        helper.handleError('Passwords must match.');
        return false;
    }
    helper.sendPost(e.target.action,{user,pass,pass2,_csrf});
    return false;
}
const LoginWindow=(props)=>{
    return(
        <form id="loginForm" name="loginForm"
        onSubmit={handleLogin} action="/login"
        method="POST" className="mainForm">
            <input id="user" type="text" name="username" placeholder="Username" />
            <input id="pass" type="password" name="pass" placeholder="Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};
const SignupWindow=(props)=>{
    return(
        <form id="signupForm" name="signupForm"
        onSubmit={handleSignup} action="/signup"
        method="POST" className="mainForm">
            <input id="user" type="text" name="username" placeholder="Username" />
            <input id="pass" type="password" name="pass" placeholder="Password" />
            <input id="pass2" type="password" name="pass2" placeholder="Retype Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};
const init=async()=>{
    const response=await fetch('/getToken');
    const data=await response.json();
    const loginButton=document.getElementById('loginButton');
    const signupButton=document.getElementById('signupButton');
    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, document.getElementById('content'));
        return false;
    });
    signupButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />, document.getElementById('content'));
        return false;
    });
    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, document.getElementById('content'));
};
window.onload=init;