const regName = document.querySelector("#regName")
const regFirst = document.querySelector("#regFirst")
const regLast = document.querySelector("#regLast")
const regEmail = document.querySelector("#regEmail")
const regPassword = document.querySelector("#regPassword")
const regForm = document.querySelector("#regForm")
const errorMsg = document.querySelector("#errormsg")

const loginForm = document.querySelector('#loginform');
const loginEmail = document.querySelector("#loginEmail")
const loginPassword = document.querySelector("#loginPassword")

regForm.addEventListener('submit', e => {
    e.preventDefault();
    const regDetails = {
        first_name: regFirst.value,
        last_name: regLast.value,
        name: regName.value,
        email: regEmail.value,
        password: regPassword.value
    };

    fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(regDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.error) {
            errorMsg.innerHTML = response.error;
        } else {
            console.log(response);
            errorMsg.innerHTML = '';
            localStorage.setItem('auth-token', response.token);
            location.href = response.redirect;
        }
    });
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value
    };

    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error) {
            errorMsg.innerHTML = response.error;
        } else {
            errorMsg.innerHTML = '';
            localStorage.setItem('auth-token', response.token);
            location.href = response.redirect;
        }
    });
});