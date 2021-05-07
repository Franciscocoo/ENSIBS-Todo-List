function addTache() {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
     }).then(
        document.location.reload()
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

function deleteTache() {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'delete',
     }).then(
            document.location.reload()
    );
}