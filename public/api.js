const getButton = document.getElementById("user_form")
getButton.addEventListener("submit", getRequest)

function getRequest(event) {
    event.preventDefault()
    let noteId = event.target.noteId.value

    fetch(`/notes/${noteId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(notes){
            if(!noteId){
                document.getElementById("results").innerHTML = ''
                for(let note in notes) {
                    document.getElementById("results").innerHTML += notes[note]._id + "<br>"
                    document.getElementById("results").innerHTML += notes[note].noteDetails + "<br>"
                    document.getElementById("results").innerHTML += notes[note].noteCreateDate + "<br>"
                    document.getElementById("results").innerHTML += notes[note].noteDueDate + "<br>"
                }
            } else {
                document.getElementById("results").innerHTML = ''
                document.getElementById("results").innerHTML += notes._id + "<br>"
                document.getElementById("results").innerHTML += notes.noteDetails + "<br>"
                document.getElementById("results").innerHTML += notes.noteCreateDate + "<br>"
                document.getElementById("results").innerHTML += notes.noteDueDate + "<br>"
            }
        })
}

const postButton = document.getElementById("user_form_post")
postButton.addEventListener("submit", newPost)

function newPost(event, post) {
    event.preventDefault()
    let noteDetails = event.target.noteDetails.value
    let noteDueDate = event.target.noteDueDate.value
    post = {
        noteDetails: noteDetails,
        noteDueDate:noteDueDate,
    }
    const options = {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }
    return fetch('/notes', options)
        .then(res => res.json())
        .then(error => console.log('note Posted: ', post))
}

const deleteButton = document.getElementById("user_form_delete")
deleteButton.addEventListener("submit", deletePost)

function deletePost(event){
    event.preventDefault()
    let noteId = event.target.noteId.value

    const options = {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            noteId: noteId
        })
    }
    const URL = `/notes/${noteId}`
    fetch(URL, options)
        .then(response => response.json())
        .then(data => console.log("note to delete ", data))
}

const putButton = document.getElementById("user_form_put")
putButton.addEventListener("submit", putPost)

function putPost(event){
    event.preventDefault()
    let noteId = event.target.noteId.value
    let noteDetails = event.target.noteDetails.value
    let noteDueDate = event.target.noteDueDate.value


    post = {
        noteDetails: noteDetails,
        // noteDirector: noteCreateDate,
        noteDueDate: noteDueDate
    }

    const options = {
        method: "PATCH",
        body: JSON.stringify(post),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }
    const URL = `/notes/${noteId}`
    return fetch(URL, options)
        .then(response => response.json())
        .then(data => console.log("note to Update: ", data))
}