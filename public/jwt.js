const localtoken = window.localStorage.getItem('auth-token')
var accountDiv = document.querySelector("#accountDiv")
var createNodeForm = document.getElementById("createNodeForm")
var notesDiv = document.getElementById("allNotes")
var base64Url = localtoken.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

var token = JSON.parse(jsonPayload);

var vh = 0;

const findNotes = {
    owner: token.name,
};

fetch('/user/notes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(findNotes)
})
.then(res => res.json())
.then(response => {
    for(var i of response){
        vh += 5
        notesDiv.insertAdjacentHTML("beforeend", `<button onclick="showNoteDiv('`+ i.name + `'` + `,` + `'` + i.content + `')" class="styleButton">` + i.name + `</button>`)
    }
})

function showNoteDiv(name, content){
    const accountDiv = document.getElementById("accountDiv")
    const homeDiv = document.getElementById("homeDiv")
    const notesDiv = document.getElementById("notesDiv")
    const createNoteDiv = document.getElementById("createNoteDiv")
    var noteName = document.getElementById("noteName")
    var noteContent = document.getElementById("noteContent")

    noteName.innerHTML = name
    noteContent.innerHTML = content
    accountDiv.style.display = "none"
    homeDiv.style.display = "none"
    notesDiv.style.display = "block"
    createNoteDiv.style.display = "none"

}

accountDiv.insertAdjacentHTML("beforeend", "<h3> First name: " + token.first_name + "</h3>")
accountDiv.insertAdjacentHTML("beforeend", "<h3> Last name: " + token.last_name + "</h3>")
accountDiv.insertAdjacentHTML("beforeend", "<h3> Name: " + token.name + "</h3>")
accountDiv.insertAdjacentHTML("beforeend", "<h3> Email: " + token.email + "</h3>")

console.log(token)

function BlueTheme(){
    const theme = document.querySelector("#Theme")
    theme.setAttribute("href", "BlueTheme.css")
}

function DarkTheme(){
    const theme = document.querySelector("#Theme")
    theme.setAttribute("href", "DarkTheme.css")
}

function LightTheme(){
    const theme = document.querySelector("#Theme")
    theme.setAttribute("href", "LightTheme.css")
}

function openStyle(){
    const stylebox = document.getElementById("changeStyle")
    const accountMenu = document.getElementById("accountMenu")
    if(stylebox.style.display == "block"){
        stylebox.style.display = "none"
        stylebox.style.height = "0"
        accountMenu.style.marginTop = "0"
    }else{
        stylebox.style.display = "block"
        stylebox.style.height = "15vh"
        accountMenu.style.marginTop = "15vh"
    }
}

function openNotes(){
    const noteDiv = document.getElementById("allNotes")
    const createNote = document.getElementById("createNote")

    if(noteDiv.style.display == "block"){
        noteDiv.style.display = "none"
        noteDiv.style.height = "0"
        createNote.style.marginTop = "0"
    }else{
        noteDiv.style.display = "block"
        noteDiv.style.height = "fit-content"
        createNote.style.marginTop = vh + "vh"
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px"
    document.getElementById("secureMain").style.marginLeft = "250px"
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
    document.getElementById("secureMain").style.marginLeft = "0"
    document.getElementById("changeStyle").style.display = "none"
    document.getElementById("changeStyle").style.height = "0"
    document.getElementById("allNotes").style.display = "none"
    document.getElementById("accountMenu").style.marginTop = "0"
    document.getElementById("createNote").style.marginTop = "0"
}

function showAccountInfo(){
    const accountDiv = document.getElementById("accountDiv")
    const homeDiv = document.getElementById("homeDiv")
    const notesDiv = document.getElementById("notesDiv")
    const createNoteDiv = document.getElementById("createNoteDiv")

    accountDiv.style.display = "block"
    homeDiv.style.display = "none"
    notesDiv.style.display = "none"
    createNoteDiv.style.display = "none"
}

function Home(){
    const accountDiv = document.getElementById("accountDiv")
    const homeDiv = document.getElementById("homeDiv")
    const notesDiv = document.getElementById("notesDiv")
    const createNoteDiv = document.getElementById("createNoteDiv")

    accountDiv.style.display = "none"
    homeDiv.style.display = "block"
    notesDiv.style.display = "none"
    createNoteDiv.style.display = "none"
}

function showNotes(){

}

function createNote(){
    const accountDiv = document.getElementById("accountDiv")
    const homeDiv = document.getElementById("homeDiv")
    const notesDiv = document.getElementById("notesDiv")
    const createNoteDiv = document.getElementById("createNoteDiv")

    accountDiv.style.display = "none"
    homeDiv.style.display = "none"
    notesDiv.style.display = "none"
    createNoteDiv.style.display = "block"
}

var noteName = document.getElementById("cnoteName")
var noteContent = document.getElementById("cnoteContent")

createNodeForm.addEventListener('submit', e => {
    e.preventDefault();
    const noteDetails = {
        owner: token.name,
        name: noteName.value,
        content: noteContent.value
    };

    fetch('/user/createNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error) {
            alert(response.error);
        } else {
            location.href = response.redirect;
        }
    });
});