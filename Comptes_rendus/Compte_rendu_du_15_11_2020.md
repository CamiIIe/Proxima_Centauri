# Compte rendu du 15.11.2020 #

L'objectif de cette réunion est de faire un point sur l'avancée du projet et déterminer les points qu'ils restent encore à travailler.

## Organisation ##

Pour faciliter l'organisation de notre projet et de notre dossier de fichiers, nous avons décidé de :   

* Créer une page css pour chaque page html que l'on crée afin de simplifier les modifications et les manipulations sur l'organisation de la page html

## Le projet ##

Nous avons ensuite défini plusieurs objectifs à résoudre au cours de la semaine du 16.11.2020 afin d'avancer plus régulièrement et plus sereinement sur le projet en se fixant des objectifs hebdomadaires.

*1. La page d'accueil*

* Chercher une manière de fixer la taille de la fenêtre du navigateur sur la taille de l'image afin qu'elle ne se répète pas de manière étrange lorsque la taille de la fenêtre ne correspond pas  
--> Sinon on ne trouve pas, on laisse un fond noir derrière et le fond ne se répète pas 

* Créer le passage de l'accueil à l'index des jeux  
--> Au passage de la souris sur la phrase accroche, celle-ci se transforme en un bouton jouer où l'utilisateur peut cliquer sur un bouton  

* Changer la police Lato Black en Lato light  

*2. La page index*  
  
* Rendre la page responsive : hamburger, vaisseau, container d'inscription ainsi que la taille de la fenêtre  
  
* Changement de l'image lorsque l'on passe la souris dessus pour la galaxie, le titre et le vaisseau  

* Trouver les images/ les icônes et le nom des jeux  
--> avoir au minima des propositions pour la prochaine réunion  

* Changer l'image lorsque l'on passe dessus pour les jeux (en fonction des propositions précédentes)  

* Rajouter une page à propos et comment  

* Rédiger une ébauche de l'a-propos  

* Créer une maquette des design de jeux ?  

* Réfléchir aux graphismes des jeux  

* Réfléchir à comment afficher un timeur  
  
* Création d'un badge pour l'arrivée au niveau 10

*3. Les jeux - Implémentation des niveaux de jeux*  
*Legendes : A = addition, S = soustraction, M = multiplication, C = carré et cad = c'est-à-dire*  

| Niveau | Contenu des calculs | Nombres de bonnes réponses consécutives attendues | Etendu des chiffres utilisés |  
|:------:|:-------------------:|:-------------------------------------------------:|:----------------------------:|
|1| A 70% - S 30% | 5 | 1 à 10|
|2| A 50% - S 50% | 6 | 1 à 20|
|3| A 45% - S 45% - M 10%| 8 | 11 à 30 et 1 à 10(M) |
|4| A 35% - S 35% - M 30%| 8 | 11 à 370 et 1 à 20(M)|
|5| A 25% - S 25% - M 50% (80% d'avoir un seul signe) OU A 50% S 50% M 100% (20% d'avoir deux signes)| 10 | 50 à 100 et 11 à 50(M)|
|6| Minimum deux signes 70% OU Trois signes 30%| 10| 100 à 1000 et 11 à 70(M)| 10 | 100 à 1000 et 11 à 70(M)|
|7| Minimum deux signes à quatres signes avec des priorités opératoires  cad un ou deux parenthèses non imbriquées | 10 | 100à 1000 et 11 à 100 (M)|
|8| Minimum deux signes à quatres signes avec des carrés, des priorités opératoires avec des parenthèses imbriquées | 10 | 100 à 10 000 ; 11 à 100 (M) et 1 à 20 (C)|
|9| Minimum deux signes à cinq signes avec des carrés, des priorités opératoires. Si calcul à deux signes, le calcul comprend forcément un carré plus un nombre. Si le calcul est avec quatres signes ou plus alors 80% de chance d'avoir un carré | 10 | 1000 à 20 000 ; 100 à 1 000(M) et 11 à 30(C)|
|10| Trois signes ou plus, si trois signes alors contient forcément une identité remarquable. Si quatres signes ou plus  alors au moins un carré | 10 | 1 000 à 100 000 ; 100 à 1 000(M) et 11 à 50(C)|  
  

NB. Pour le niveau 10, les ratios sont les suivants : identité remarquable : A/S 60 - 40% ; pour les calculs à trois signes : A/S/M 1/3 - 1/3 - 1/3.  
NB bis. Pour les soustractions des niveaux 1 à 3, le premier nombre à être soustrait est forcément plus grand que le deuxième. 
  
PS. Mise en place de vies qui seront au nombre de 3 et qui se rechargent en montant d'un niveau (+1)