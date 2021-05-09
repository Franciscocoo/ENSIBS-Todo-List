// Script en mode strict. 
"use strict";

// -- -- -- -- -- -- -- -- -- -- Partie JS basique -- -- -- -- -- -- -- -- -- //

// Permet d'ajouter une tâche lors de l'appui sur "Entrer".
document.getElementById("newtacheInput").addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        addTache();
    }
})

// -- -- -- -- -- -- -- -- -- -- Partie FETCH -- -- -- -- -- -- -- -- -- -- //

// Permet d'ajouter une tâche.
function addTache() {

    // La fonction est appelé seulement si la tâche n'est pas vide.
    if (document.getElementById("newtacheInput").value != "") {

        // Utilisation de la méthode POST avec en corps de la requête le libellé de la tâche.
        fetch('/taches', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "libelle": document.getElementById("newtacheInput").value })
        }).then(() => {

            // Appel AJAX après la réponse du serveur, il permet de mettre à jour le contenu de la page sans rafraîchir celle-ci
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {

                // Si la requête AJAX est bien passée.
                if (ajax.readyState == XMLHttpRequest.DONE) {
                    if (ajax.status == 200) {

                        // Supprime tous les éléments de la division "taches".
                        document.getElementById("taches").innerHTML = "";

                        // Ajoute à la division "taches" chaque nouveaux éléments.
                        JSON.parse(ajax.responseText).forEach(function(tache) {
                            document.getElementById("taches").innerHTML +=
                                "<div class=" + tache.status + " id=" + tache.id + ">" +
                                "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                                "<img src='assets/img/delete.png' onclick='deleteTache(this)'>" +
                                "</div>"
                        });
                    } else {
                        alert('Problème côté serveur.');
                    }
                }
            };
            ajax.open("GET", "/taches", true);
            ajax.send();

            // Nettoie l'entrée utilisateur pour le libellé de la tâche. 
            document.getElementById("newtacheInput").value = "";
        });
    }
}

// Permet de modifier le statut actuel d'une tâche.
function setStatus(element) {

    // Le statut est modifié selon le statut précédent.
    let statut = element.parentNode.className == "A_FAIRE" ? "FAIT" : "A_FAIRE";

    // Utilisation de la méthode PATCH avec en corps de la requête le statut souhaité.
    fetch('/taches/' + element.parentNode.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ "statut": statut })
    }).then(() => {

        // Appel AJAX après la réponse du serveur, il permet de mettre à jour le contenu de la page sans rafraîchir celle-ci
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {

            // Si la requête AJAX est bien passée.
            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {

                    // Supprime tous les éléments de la division "taches".
                    document.getElementById("taches").innerHTML = "";

                    // Ajoute à la division "taches" chaque nouveaux éléments.
                    JSON.parse(ajax.responseText).forEach(function(tache) {
                        document.getElementById("taches").innerHTML +=
                            "<div class=" + tache.status + " id=" + tache.id + ">" +
                            "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                            "<img src='assets/img/delete.png' onclick='deleteTache(this)'>" +
                            "</div>"
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

// Permet de supprimer une tâche.
function deleteTache(element) {

    // Utilisation de la méthode DELETE.
    fetch('/taches/' + element.parentNode.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(() => {

        // Appel AJAX après la réponse du serveur, il permet de mettre à jour le contenu de la page sans rafraîchir celle-ci
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {

            // Si la requête AJAX est bien passée.
            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {

                    // Supprime tous les éléments de la division "taches".
                    document.getElementById("taches").innerHTML = "";

                    // Ajoute à la division "taches" chaque nouveaux éléments.
                    JSON.parse(ajax.responseText).forEach(function(tache) {
                        document.getElementById("taches").innerHTML +=
                            "<div class=" + tache.status + " id=" + tache.id + ">" +
                            "<button onclick='setStatus(this)'>" + tache.libelle + "</button>" +
                            "<img src='assets/img/delete.png' onclick='deleteTache(this)'>" +
                            "</div>"
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