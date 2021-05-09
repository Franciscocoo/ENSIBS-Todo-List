function addTache() {
    fetch('/taches', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ "libelle": document.getElementById("libelle").value })
    }).then(function (res) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {
                    // Supprime tous les éléments de la liste "taches".
                    document.getElementById("taches").innerHTML = "";
                    // Ajoute à la liste "taches" chaque nouveaux éléments.
                    JSON.parse(ajax.responseText).forEach(function (tache) {
                        document.getElementById("taches").innerHTML +=
                            "<li class=" + tache.status + " id=" + tache.id + ">" +
                            "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                            "<span class='supprimer' onclick='deleteTache(this)'>✕</span>" +
                            "</li>"
                    });
                } else {
                    alert('Problème côté serveur.');
                }
            }
        };
        ajax.open("GET", "/taches", true);
        ajax.send();
    });
}

function setStatus(element) {

    let statut = element.parentNode.className == "A_FAIRE" ? "FAIT" : "A_FAIRE";

    fetch('/taches/' + element.parentNode.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ "statut": statut })
    }).then(function (res) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {
                    // Supprime tous les éléments de la liste "taches".
                    document.getElementById("taches").innerHTML = "";
                    // Ajoute à la liste "taches" chaque nouveaux éléments.
                    JSON.parse(ajax.responseText).forEach(function (tache) {
                        document.getElementById("taches").innerHTML +=
                            "<li class=" + tache.status + " id=" + tache.id + ">" +
                            "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                            "<span class='supprimer' onclick='deleteTache(this)'>✕</span>" +
                            "</li>"
                    });
                } else {
                    alert('Problème côté serveur.');
                }
            }
        };
        ajax.open("GET", "/taches", true);
        ajax.send();
    });
}

function deleteTache(element) {
    fetch('/taches/' + element.parentNode.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(function (res) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {
                    // Supprime tous les éléments de la liste "taches".
                    document.getElementById("taches").innerHTML = "";
                    // Ajoute à la liste "taches" chaque nouveaux éléments.
                    JSON.parse(ajax.responseText).forEach(function (tache) {
                        document.getElementById("taches").innerHTML +=
                            "<li class=" + tache.status + " id=" + tache.id + ">" +
                            "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                            "<span class='supprimer' onclick='deleteTache(this)'>✕</span>" +
                            "</li>"
                    });
                } else {
                    alert('Problème côté serveur.');
                }
            }
        };
        ajax.open("GET", "/taches", true);
        ajax.send();
    });
}