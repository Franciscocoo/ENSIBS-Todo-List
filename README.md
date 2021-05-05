# Todo-List

## Partie 2
On a besoin d'une base de données, pour cela, on installe MariaDB
- sudo mysql < todolist.sql 

Vérification
- use todo_list
- show tables

Création d'un nouvel utilisateur :
- CREATE USER 'todo_user' IDENTIFIED BY '123';
On lui donne les accès :
- GRANT ALL privileges ON *.* TO 'todo_user'@localhost IDENTIFIED BY '123';
