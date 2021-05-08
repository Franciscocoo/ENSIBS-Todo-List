function addTache() {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify( {"libelle": document.getElementById("libelle").value})
     }).then(
        window.location.reload()
    );
}

function setStatus() {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'patch',
     }).then(
            document.location.reload()
    );
}

function deleteTache(element) {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify( {"id": element.parentNode.id})
     }).then(
           document.location.reload()
    );
}