// SCRIPT JS POUR LE JEU DU CALCUL MENTAL

var numNiveau = 1;

window.onload = genere();

function genere() {
    //La fonction getNumber est à modifier en fonction des niveaux et des signes qui sont
    // sortis ! 
    var number1 = getNumber();
    var number2 = getNumber();
    var sign1 = getSign(numNiveau);

    //Faire comme automate dans cette fonction ? Ou mettre une fonction qui détermine 
    //directement de numNiveau ? 

    document.getElementById("demo").innerHTML = number1 + " " + sign1 + " " + number2;
    document.getElementById("result").value = "";

    var btn = document.getElementById("btn-verif");
    btn.style = $("btn-outline-secondary");
    btn.innerHTML = "En attente";
}

//var resultat = document.getElementById("result");
//resultat.addEventListener("keyup", verif);

//Fonction permettant de vérifier le résultat donné par l'utilisateur et d'apporter un feedback visuel, puis genere le calcul suivant
//FONCTION A REECRIRE POUR VERIFIER LE CALCUL !! NE FONCTIONNE QUE POUR LES DEMOS!!
function verif() {
    var calcul = document.getElementById("demo").innerHTML.split(" ");
    var number1 = calcul[0];
    var sign1 = calcul[1];
    var number2 = calcul[2];

    if(sign1 == "+"){
        var correction = parseInt(number1) + parseInt(number2);
    } else if (sign1 == "-") {
        var correction = parseInt(number1) - parseInt(number2);
    } else if (sign1 == "*") {
        var correction = parseInt(number1) * parseInt(number2);
    }
    var resultat = document.getElementById("result").value;

    if (parseInt(resultat) == correction) {
        var btn = document.getElementById("btn-verif");
        btn.style.backgroundColor = "green";
        btn.style.color = "black";
        btn.style.borderColor = "black";
        btn.textContent = "Bonne réponse";
        setTimeout(genere, 250);

    } else if (resultat == "") {
        var btn = document.getElementById("btn-verif");
        btn.style = $('.btn-outline-secondary');
        btn.textContent = "En attente";

    } else {
        var btn = document.getElementById("btn-verif");
        btn.style.backgroundColor = "red";
        btn.style.color = "black";
        btn.style.borderColor = "black";
        btn.textContent = "Mauvaise réponse";
    }
}

//Fonction permettant de tirer un nombre dans l'intervalle [min,max]
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

//Fonction permettant de retourner un signe selon le niveau actuel où en est l'utilisateur
function getSign(numNiveau) {
    let signes = ["+", "-", "*"];
    let random, signe, random2, random3, random4, random5;
    let nbSigne, nbParenthese, signeAvecParenthese;

    switch (numNiveau) {
        case 1: //Niveau 1 : 70% d'avoir une addition et 30% d'avoir une soustraction
            random = getRandomIntInclusive(1, 10);

            if(random <= 7) {
                signe = String(signes[0]);
            } else {
                signe = String(signes[1]);
            }
            return signe;

        case 2: //Niveau 2 : 5/10 d'avoir une addition et 5/10 d'avoir une soustraction
            random = getRandomIntInclusive(1, 10);
            // (50/100)*10 = 5 d'où les 50% de chances d'obtenir une addition ou une soustraction
            if(random <= 5) {
                signe = String(signes[0]);
            } else {
                signe = String(signes[1]);
            }
            return signe;

        case 3: //Niveau 3 : 4.5/10 d'avoir une addition, 4.5/10 d'avoir une soustraction 
                //et 1/10 d'avoir une multiplication
            random = getRandomIntInclusive(1, 10);
        
            //(45/100)*10 = 4.5 d'où les 45% de chances d'otenir une addition ou un soustraction 
            if(random <= 4.5) {
                signe = String(signes[0]);
            } else if (random <= 9 && random > 4.5) {
                signe = String(signes[1]);
            } else {
                signe = String(signes[2]);
            }
            return signe;

        case 4: //Niveau 4 : 3.5/10 d'avoir une addition, 3.5/10 d'avoir une soustraction 
                //et 1/10 d'avoir une multiplication
            random = getRandomIntInclusive(1, 10);
            //(35/100)*10 = 3.5 d'où 35% de chances d'obtenir une addition et une soustraction
            if(random <= 3.5) {
                signe = String(signes[0]);
            } else if (random <= 7 && random > 3.5) {
                signe = String(signes[1]);
            } else {
                signe = String(signes[2]);
            }
            return signe;

        case 5: //Niveau 5 : 2.5/10 d'avoir une addition, 2.5 d'avoir une soustraction et 
                // 5/10 d'avoir une multiplication si calcul à un seul signe 
                // 50% d'avoir une addition ou une soustraction et 100% chances d'avoir une 
                //multiplication si deux signes
                random = getRandomIntInclusive(1, 10); 
                nbSigne = getNbSign(numNiveau); 

                if (nbSigne === 1) {
                    if(random <= 2.5) {
                        signe = String(signes[0]);
                    } else if (random <= 5 && random > 2.5) {
                        signe = String(signes[1]);
                    } else {
                        signe = String(signes[2]);
                    }
                } else {
                    if(random <= 5) {
                        signe = String(signes[0]+" "+signes[2]);
                    } else {
                        signe = String(signes[1]+" "+signes[2]);
                    }
                }
                return signe; 
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul */ 

        case 6: //Niveau 6 : 70% de chance d'avoir un calcul avec 2 signes et 30% de chances 
                // d'avoir un calcul à 3 signes 
                random = getRandomIntInclusive(1, 10); 

                nbSigne = getNbSign(numNiveau); 
        
                if (nbSigne === 2) {
                    if(random <= 5) {
                        signe = String(signes[0]+" "+ signes[2]);
                    } else {
                        signe = String(signes[1]+" "+ signes[2]);
                    }
                } else {
                    if(random <= 5) {
                        signe = String(signes[0]+" "+ signes[2]);
                    } else {
                        signe = String(signes[1]+" "+ signes[2]);
                    }
                }
                return signe; 

        case 7: //Niveau 7 : Minimum de deux signes à quatres signes avec des priorités opératoires et des parenthèses non-imbriqués
                random = getRandomIntInclusive(1, 15); 

                nbSigne = getNbSign(numNiveau); 
             
                if (nbSigne === 2) {
                    if(random <= 7) {
                        signe = String(signes[0]+" "+ signes[2]);
                    } else {
                        signe = String (signes[1]+" "+ signes[2]);
                    }
                } else if (nbSigne === 3) {
                    if (random <= 5) {
                        signe = String(signes[0]);
                    } else if (random <= 10 && random > 5){
                        signe = String(signes[1]);
                    } else {
                        signe = String(signes[2]);
                    }

                    random2 = getRandomIntInclusive(1, 15); 
                    if (random2 <= 5) {
                        signe = String(signe +" "+ signes[0]);
                    } else if (random2 <= 10 && random2 > 5) {
                        signe = String(signe +" "+ signes[1]);
                    } else {
                        signe = String(signe +" "+ signes[2]);
                    }

                    random3 = getRandomIntInclusive(1, 15); 
                    if (random3 <= 5) {
                        signe = String(signe +" "+ signes[0]); 
                    } else if (random3 <= 10 && random3 > 5) {
                        signe = String(signe +" "+ signes[1]);
                    } else {
                        signe = String(signe +" "+ signes[2]);
                    }
                } else {
                    if (random <= 5) {
                        signe = String(signes[0]);
                    } else if (random <= 10 && random > 5){
                        signe = String(signes[1]);
                    } else {
                        signe = String(signes[2]);
                    }

                    random2 = getRandomIntInclusive(1, 15); 
                    if (random2 <= 5) {
                        signe = String(signe +" "+ signes[0]); 
                    } else if (random2 <= 10 && random2 > 5) {
                        signe = String(signe +" "+ signes[1]);
                    } else {
                        signe = String(signe +" "+ signes[2]);
                    }

                    random3 = getRandomIntInclusive(1, 15); 
                    if (random3 <= 5) {
                        signe = String(signe +" "+ signes[0]); 
                    } else if (random3 <= 10 && random3 > 5) {
                        signe = String(signe +" "+ signes[1]);
                    } else {
                        signe = String(signe +" "+ signes[2]);
                    }

                    random4 = getRandomIntInclusive(1, 15); 
                    if (random4 <= 5) {
                        signe = String(signe +" "+ signes[0]); 
                    } else if (random4 <= 10 && random4 > 5) {
                        signe = String(signe +" "+ signes[1]);
                    } else {
                        signe = String(signe +" "+ signes[2]);
                    }
                }
                
                nbParenthese = nbParentheses(nbSigne); 
                signeAvecParenthese = getParentheses(nbParenthese, signe); 
                return signeAvecParenthese; 
            
        case 8 : //Niveau 8 : Minimum de deux signes à quatres signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15); 

            nbSigne = getNbSign(numNiveau); 
     
            if (nbSigne === 2) {
                if(random <= 7) {
                    signe = String(signes[0]+" "+ signes[2]);
                } else {
                    signe = String (signes[1]+" "+ signes[2]); 
                }   

            } else if (nbSigne === 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15); 
                if (random4 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }
            }
            
            nbParenthese = nbParentheses(nbSigne); 
            signeAvecParenthese = getParentheses(nbParenthese, signe); 
            return signeAvecParenthese; 

        case 9 : //Niveau 9 : Minimum de deux signes à cinq signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15); 

            nbSigne = getNbSign(numNiveau); 
 
            if (nbSigne === 2) {
                if(random <= 7) {
                    signe = String(signes[0]+" "+ signes[2]);
                } else {
                    signe = String (signes[1]+" "+ signes[2]); 
                }   

            } else if (nbSigne === 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }
            } else if (nbSigne === 4) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15); 
                if (random4 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15); 
                if (random4 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random5 = getRandomIntInclusive(1, 15); 
                if (random <= 5) {
                    signe = String(signe +" "+signes[0]); 
                } else if (random5 <= 10 && random5 > 5) {
                    signe = String(signe +" "+signes[1]); 
                } else {
                    signe = String(signe +" "+signes[2]);
                }
            }
        
            nbParenthese = nbParentheses(nbSigne); 
            signeAvecParenthese = getParentheses(nbParenthese, signe); 
            return signeAvecParenthese; 

        case 10 :  //Niveau 10 : Minimum de trois signes à quatres signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15); 

            nbSigne = getNbSign(numNiveau); 

            if (nbSigne === 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

            random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

            random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

            } else if (nbSigne === 4) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15); 
                if (random4 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5){
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15); 
                if (random2 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15); 
                if (random3 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15); 
                if (random4 <= 5) {
                    signe = String(signe +" "+ signes[0]); 
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe +" "+ signes[1]);
                } else {
                    signe = String(signe +" "+ signes[2]);
                }

                random5 = getRandomIntInclusive(1, 15); 
                if (random <= 5) {
                    signe = String(signe +" "+signes[0]); 
                } else if (random5 <= 10 && random5 > 5) {
                    signe = String(signe +" "+signes[1]); 
                } else {
                    signe = String(signe +" "+signes[2]);
                }
            }
    
            nbParenthese = nbParentheses(nbSigne); 
            signeAvecParenthese = getParentheses(nbParenthese, signe); 
            return signeAvecParenthese; 
        }
}

//Fonction permettant de tirer UN nombre aléatoire en fonction des niveaux du jeu
//Operation est une variable qui donne le signe qui sera entouré par les nombres générés
function getNumber(numNiveau, operation) {
    let nombre;

    switch(numNiveau) {
        case 1 :
            //Etendue des nombres entre 1 à 10 pour addition et soustraction
            nombre = getRandomIntInclusive(1, 10);
            return nombre;

        case 2 :
            //Etendue des nombres entre 1 à 20 pour addition et soustraction
            nombre = getRandomIntInclusive(1, 20);
            return nombre;

        case 3 :
            //Etendue des nombres entre 11 et 30 pour addition et soustraction
            //Etendue des nombres entre 1 et 20 pour multiplication
            if (operation === "multiplication") {
                nombre = getRandomIntInclusive(1, 10);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(11, 30);
                return nombre;
            }

        case 4 :
            //Etendue des nombres entre 11 et 50 pour addition et soustraction
            //Etendue des nombres entre 1 et 20 pour multiplication
            if (operation === "multiplication") {
                nombre = getRandomIntInclusive(1, 20);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(11, 50);
                return nombre;
            }

        case 5 :
            //Etendue des nombres entre 50 et 100 pour addition et soustraction
            //Etendue des nombres entre 11 et 50 pour multiplication
            if (operation === multiplication) {
                nombre = getRandomIntInclusive(50, 100);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(11, 50);
                return nombre;
            }

        case 6 :
            //Etendue des nombres entre 100 et 1000 pour addition et soustraction
            //Etendue des nombres entre 11 et 70 pour multiplication
            if (operation === "multiplication") {
                nombre = getRandomIntInclusive(11, 70);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(100, 1000);
                return nombre;
            }
    }
}

//Fonction permettant de déterminer le nom de questions/ calculs à poser en fonction du niveau


/*Fonction permettant de déterminer le nombre de signes du calcul qui retourne le nb de signes 
du calcul */
function getNbSign(numNiveau) {
    let random, nbSigne;

    switch(numNiveau) {
        case 5: //Niveau 5 : 80% de chances d'avoir un calcul à un seul signe 
            random = getRandomIntInclusive(1, 10);

            if (random <= 8) {
                nbSigne = 1; 
            } else {
                nbSigne = 2; 
            }
            return nbSigne; 

        case 6: //Niveau 6 : 70% de chances d'avoir un calcul à un seul signe 
            random = getRandomIntInclusive(1, 10); 

            if (random <= 7) {
                nbSigne = 2; 
            } else {
                nbSigne = 3; 
            }
            return nbSigne; 
        
        case 7: //Niveau 7 : Minimum de 2 signes à 4 signes avec des priorités opératoires
                //45% de chances d'avoir 2 signes, 45% d'avoir trois signes et 50% d'avoir 4 signes
            random = getRandomIntInclusive(1, 10); 

            if (random <= 4.5) {
                nbSigne = 2; 
            } else if (random < 8) {
                nbSigne = 3; 
            } else {
                nbSigne = 4; 
            }
            return nbSigne; 

        case 8: //Niveau 8 : Minimum de 2 signes à quatres signes avec des carrés, des priorités
            random = getRandomIntInclusive(1, 15); 

            if (random <= 5) {
                nbSigne = 2; 
            } else if (random <= 10 && random > 5) {
                nbSigne = 3; 
            } else {
                nbSigne = 4; 
            }
            return nbSigne; 
        
        case 9: //Niveau 9: Minimum de deux signes à cinq signes avec des carrés et des priorités
            random = getRandomIntInclusive(1, 20); 

            if (random <= 5) {
                nbSigne = 2; 
            } else if (random <= 10 && random > 5) {
                nbSigne = 3; 
            } else if (random <= 15 && random > 10) {
                nbSigne = 4; 
            } else {
                nbSigne = 5; 
            }
            return nbSigne;

        case 10: //Niveau 10: Minimum de 3 signes et max six signes 
            random = getRandomIntInclusive(1, 20); 

            if (random <= 5) {
                nbSigne = 3; 
            } else if (random <= 10 && random > 5) {
                nbSigne = 4; 
            } else if (random <= 15 && random > 10) {
                nbSigne = 5; 
            } else {
                nbSigne = 6; 
            }
            return nbSigne;
    }
}

/*Fonction qui vérifie qu'il y a le même nombre de parenthèses ouvrantes et fermantes dans le calcul affiché sur la page HTML */
function verifParenthese(signe) {
    //var calcul = document.getElementById("demo").innerHTML; 
    let calcul = String(signe);

    let nb1 = 0;
    let nb2 = 0;
    let ver = false;

    for(let i = 0; i < calcul.length; i++) {
        if (calcul.charAt(i) === '(') {
            nb1++; 
        }
        if (calcul.charAt(i) === ')') {
            nb2++; 
        }
    }

    var tab1 = []; 
    tab1.length = nb1; 

    var tab2 = []; 
    tab2.length = nb2; 
    
    let n1 = 0;
    let n2 = 0;

    for(let j = 0; j < calcul.length; j++) {
        if (calcul.charAt(j) === '(') {
            tab1[n1] = calcul.indexOf('(', j); 
            n1++; 
        }
        if (calcul.charAt(j) === ')') {
            tab2[n2] = calcul.indexOf(')', j); 
            n2++; 
        }
    }

    if (nb1 === nb2) {
        for(let x = 0; x < tab1.length; x++) {
            //ver = tab1[x] < tab2[x];
            if (tab1[x] < tab2[x]) {
                ver = true;
            } else {
                ver = false;
            }
        }
    }
    /* Vérifie la position des parenthèses en les affichant dans un tableau à l'écran */
    //document.write(Array.toString(tab1) + " " + Array.toString(tab2));
    //Renvoie true si bien une parenthèse ouvrante avant une parenthèse fermante
    return ver; 
}

//Fonction qui vérifie que le nombre de couple de parenthèses correspond bien aux nombre de parenthèses de l'équation
function verifNbParenthese(signe, nbParenthese) {
    let calcul = String(signe);

    let nb1 = 0;
    let nb2 = 0;
    let ver = false;

    //Compte le nb de paranthèse ouvrantes nb1 et fermantes nb2
    for(let i = 0; i < calcul.length; i++) {
        if (calcul.charAt(i) === '(') {
            nb1++;
        }
        if (calcul.charAt(i) === ')') {
            nb2++;
        }
    }

    //Vérifie que le nombre de parenthèses ouvrantes et fermantes correspond au nombre de couple de parenthèses souhaités
    if (nb1 === nb2) {
        if (nbParenthese === nb1 || nbParenthese === nb2) {
            ver = true;
        }
    }
    return ver;
}

/* Fonction qui détermine le nombre de couple de parenthèses dans le calcul */ 
function nbParentheses(nbSigne) {
    switch(nbSigne) {
        case 2:
            random = getRandomIntInclusive(1, 10); 

            if (random <= 5) {
                nbParenthese = 0; 
                //Ici, 0 signifie qu'il n'y a pas de couples de parenthèse dans le calcul
            } else {
                nbParenthese = 1; 
                //Ici, 1 signifie qu'il y a un couple de parenthèse ! Soit une '(' et une ')'
            }
            return nbParenthese; 

        case 3: 
            random = getRandomIntInclusive(1, 15); 

            if (random <= 5) {
                nbParenthese = 1; 
            } else if (random <= 10 && random > 5) {
                nbParenthese = 2; 
            } else {
                nbParenthese = 3; 
            }
            return nbParenthese; 
        
        case 4 :
            random = getRandomIntInclusive(1, 15); 

            if (random <= 5) {
                nbParenthese = 1; 
            } else if (random <= 10 && random > 5) {
                nbParenthese = 2; 
            } else {
                nbParenthese = 3; 
            }
            return nbParenthese; 

        case 5 : 
            random = getRandomIntInclusive(1, 15); 

            if (random <= 5) {
                nbParenthese = 2; 
            } else if (random <= 10 && random > 5) {
                nbParenthese = 3; 
            } else {
                nbParenthese = 4; 
            }
            return nbParenthese; 
    }
}

/* Fonction qui détermine si les parenthèses sont imbriqués ou non */ 
function parenthesesImbriques(nbParenthese) {
    switch(nbParenthese) {
        case 1 : 
            reponse = false; 
            return reponse; 
        
        case 2 : 
            random = getRandomIntInclusive(1, 10); 

            //reponse = random > 5; ??
            if (random <= 5) {
                reponse = false;
            } else {
                reponse = true;
            }
            return reponse; 

        case 3 :
            random = getRandomIntInclusive(1, 10); 

            if (random <= 5) {
                reponse = false; 
            } else {
                reponse = true; 
            }
            return reponse; 

        case 4 : 
            random = getRandomIntInclusive(1, 10); 

            if (random <= 5) {
                reponse = false; 
            } else {
                reponse = true; 
            }
            return reponse; 

    }
}

/* Fonction qui prend la chaîne de caractères signe et ajoute les parenthèses dans 
cette chaine */
function getParentheses(nbParenthese, signe) {

    switch(nbParenthese) {
        case 0 : 
            return signe; 

        case 1 : 
            element = signe.split(" "); 
            signe = " "; 

            if (element.length === 2) {
                random = getRandomIntInclusive(1, 10); 

                if (random <= 5) {
                    signe = String("("+" "+ element[0]+" "+")"+ element[1]); 
                } else {
                    signe = String(element[0]+"("+" "+element[1]+" "+")"); 
                }
            } else if (element.length === 3) {
                random2 = getRandomIntInclusive(1, 15); 

                if (random <= 5) {
                    signe = String("("+" "+element[0]+" "+")"+ element[1]+" "+ element[2])
                } else if (random <= 10 && random > 5) {
                    signe = String(element[0]+"("+" "+element[1]+" "+")"+element[2]);
                } else {
                    signe = String(element[0]+" "+ element[1]+"("+" "+element[2]+" "+")"); 
                }
            } else {
                random3 = getRandomIntInclusive(1, 20); 

                if (random <= 5) {
                    signe = String("("+" "+element[0]+" "+")"+element[1]+" "+element[2]+" "+element[3]); 
                } else if (random <= 10 && random > 5) {
                    signe = String(element[0]+"("+" "+element[1]+" "+")"+element[2]+" "+element[3]); 
                } else if (random <= 15 && random > 10) {
                    signe = String(element[0]+" "+element[1]+"("+" "+element[2]+" "+")"+element[3]); 
                } else {
                    signe = String(element[0]+" "+element[1]+" "+element[2]+"("+" "+element[3]+" "+")"); 
                }
            }
            return signe; 

        case 2 : 
            element = signe.split(" "); 
            signe = " "; 
            random = getRandomIntInclusive(1, 10); 
            parentheseImbriques = parenthesesImbriques(nbParenthese); 

            if (parenthesesImbriques === false) {
                if (element.length === 3) {
                    signe = String("("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"); 

                } else if (element.length === 4) {
                    random = getRandomIntInclusive(1, 15); 

                    if (random <= 5) {
                        signe = String("("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"+element[3]);
                    } else if (random <= 10 && random > 5) {
                        signe = String("("+" "+element[0]+" "+")"+element[1]+" "+element[2]+"("+" "+element[3]+" "+")"); 
                    } else {
                        signe = String(element[0]+"("+" "+element[1]+" "+")"+element[2]+"("+" "+element[3]+" "+")"); 
                    }
                } else {
                   random = getRandomIntInclusive(1, 30); 

                   if (random <= 5) {
                       signe = String("("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"+element[3]+" "+element[4]); 
                   } else if (random <= 10 && random > 5) {
                       signe = String("("+" "+element[0]+" "+")"+element[1]+" "+element[2]+"("+" "+element[3]+" "+")"+element[4]); 
                   } else if (random <= 15 && random > 10) {
                       signe = String("("+" "+element[0]+" "+")"+element[1]+" "+element[2]+" "+element[3]+"("+" "+element[4]+" "+")"); 
                   } else if (raondom <= 20 && random > 15) {
                       signe = String(element[0]+"("+" "+element[1]+" "+")"+element[2]+"("+" "+element[3]+" "+")"+element[4]); 
                   } else if (random <= 25 && random > 20) {
                       signe = String(element[0]+"("+" "+element[1]+" "+")"+element[2]+" "+element[3]+"("+" "+element[4]+" "+")"); 
                   } else {
                       signe = String(element[0]+" "+element[1]+"("+" "+element[2]+" "+")"+element[3]+"("+" "+element[4]+" "+")"); 
                   }
                }
            } else {
                if (element.length === 3) {
                    random = getRandomIntInclusive(1, 20); 

                    if (random <= 5) {
                        signe = String("("+"("+" "+element[0]+" "+")"+element[1]+" "+")"+element[2]); 
                    } else if (random <= 10 && random > 5) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+")"+")"+" "+element[2]); 
                    } else if (random <= 15 && random > 10) {
                        signe = String(element[0]+"("+" "+element[1]+"("+" "+element[2]+" "+")"+")"); 
                    } else {
                        signe = String(element[0]+" "+"("+"("+" "+element[1]+" "+")"+element[2]+" "+")"); 
                    }
                } else if (element.length === 4) {
                    random = getRandomIntInclusive(1, 35); 

                    if (random <= 5) {
                        signe = String("("+"("+" "+element[0]+" "+")"+element[1]+" "+")"+element[2]+" "+element[3]); 
                    } else if (random <= 10 && random > 5) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+")"+")"+element[2]+" "+element[3]); 
                    } else if (random <= 15 && random > 10) {
                        signe = String(element[0]+" "+element[1]+"("+" "+element[2]+"("+" "+element[3]+" "+")"+")"); 
                    } else if (random <= 20 && random > 15) {
                        signe = String(element[0]+" "+element[1]+"("+"("+" "+element[2]+" "+")"+element[3]+" "+")"); 
                    } else if (random <= 25 && random > 20) {
                        signe = String(element[0]+"("+" "+element[1]+"("+" "+element[2]+" "+")"+")"+element[3]); 
                    } else if (random <= 30 && random > 25) {
                        signe = String(element[0]+"("+"("+" "+element[1]+" "+")"+element[2]+")"+element[3]); 
                    } else {
                        signe = String(element[0]+" "+element[1]+"("+"("+" "+element[2]+" "+")"+element[3]+" "+")"); 
                    }
                } else {
                    random = getRandomIntInclusive(1, 70); 

                    if (random <= 5) {
                        signe = String("("+"("+" "+element[0]+" "+")"+element[1]+" "+element[2]+" "+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 10 && random > 5) {
                        signe = String("("+"("+" "+element[0]+" "+element[1]+" "+")"+element[2]+" "+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 15 && random > 10) {
                        signe = String("("+"("+" "+element[0]+" "+element[1]+" "+element[2]+" "+")"+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 20 && random > 15) {
                        signe = String("("+"("+" "+element[0]+" "+element[1]+" "+element[2]+" "+element[3]+" "+")"+element[4]+" "+")"); 
                    } else if (random <= 25 && random > 20) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+")"+element[2]+" "+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 30 && random > 25) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+element[2]+" "+")"+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 35 && random > 30) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+element[2]+" "+element[3]+" "+")"+element[4]+")"); 
                    } else if (random <= 40 && random > 35) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+element[2]+" "+element[3]+" "+element[4]+" "+")"+")"); 
                    } else if (random <= 45 && random > 40) {
                        signe = String("("+" "+element[0]+" "+element[1]+"("+" "+element[2]+" "+")"+element[3]+" "+element[4]+" "+")"); 
                    } else if (random <= 50 && random > 45) {
                        signe = String("("+" "+element[0]+" "+element[1]+"("+" "+element[2]+" "+element[3]+" "+")"+element[4]+" "+")"); 
                    } else if (random <= 55 && random > 50) {
                        signe = String("("+" "+element[0]+" "+element[1]+"("+" "+element[2]+" "+element[3]+" "+element[4]+" "+")"+")"); 
                    } else if (random <= 60 && random > 55) {
                        signe = String("("+" "+element[0]+" "+element[1]+" "+element[2]+"("+" "+element[3]+" "+")"+element[4]+" "+")"); 
                    } else if (random <= 65 && random > 60) {
                        signe = String("("+" "+element[0]+" "+element[1]+" "+element[2]+"("+" "+element[3]+" "+element[4]+" "+")"); 
                    } else {
                        signe = String("("+" "+element[0]+" "+element[1]+" "+element[2]+" "+element[3]+"("+" "+element[4]+" "+")"); 
                    }
                }
            }
            return signe; 

        case 3 : 
            element = signe.split(" "); 
            signe = " "; 
            random = getRandomIntInclusive(1, 10); 
            parentheseImbriques = parenthesesImbriques(nbParenthese); 

            //A vérifier si le changement de la condition parenthèseImbriqués est bien fait pour ce code
            if (parentheseImbriques === false) {
                if (element.length === 3) {
                    parentheseImbriques === true;
                } else if (element.length === 4) {
                    parentheseImbriques === true;
                } else {
                    signe = String("("+" "+element[0]+" "+")"+element[2]+"("+" "+element[2]+" "+")"+element[3]+"("+" "+element[4]+" "+")"); 
                }
            } else {
                if (element.length === 3) {
                    signe = String("("+"("+" "+element[0]+" "+")"+element[2]+"("+" "+element[3]+" "+")"+")"); 
                } else if (element.length === 4) {
                    random = getRandomIntInclusive(1, 20); 

                    if (random <= 5) {
                        signe = String("("+"("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"+element[3]+" "+")"); 
                    } else if (random <= 10 && random > 5 ) {
                        signe = String("("+" "+element[0]+"("+" "+element[1]+" "+")"+element[2]+"("+" "+element[3]+" "+")"); 
                    } else if (random <= 15 && random > 10) {
                        signe = String("("+"("+" "+element[0]+" "+element[1]+" "+")"+element[2]+"("+" "+element[3]+" "+")"+")"); 
                    } else {
                        signe = String("("+"("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+element[3]+" "+")"+")"); 
                    }
                } else {
                   random = getRandomIntInclusive(1, 25); 

                   if (random <= 5) {
                       signe = String("("+"("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"+element[3]+" "+element[4]+" "+")"); 
                   } else if (random <= 10 && random > 5) {
                       signe = String("("+"("+" "+element[0]+" "+")"+element[1]+" "+element[2]+"("+" "+element[3]+" "+")"+element[4]+" "+")"); 
                   } else if (random <= 15 && random > 10) {
                       signe = String("("+"("+" "+element[0]+" "+")"+element[1]+" "+element[2]+" "+element[3]+"("+" "+element[4]+" "+")"+")"); 
                   } else if (random <= 20 && random > 15) {
                       signe = String("("+"("+" "+element[0]+" "+element[1]+" "+")"+element[2]+" "+element[3]+"("+" "+element[4]+" "+")"); 
                   } else {
                        signe = String("("+"("+" "+element[0]+" "+element[1]+" "+element[2]+" "+")"+element[3]+"("+" "+element[4]+" "+")"); 
                   }
                }
            }
        return signe; 

        case 4 : 
            element = signe.split(" "); 
            signe = " "; 
            random = getRandomIntInclusive(1, 10); 
            parentheseImbriques = parenthesesImbriques(nbParenthese); 

            if (parentheseImbriques === false) {
                //if (element.length == 5) {
                //Ne précise pas la condition car il n'y a 4 couples de parenthèses que à la condition qu'il y a 5  signes dans le calcul 
                    parentheseImbriques = true; 
                //}
            } else {
                signe = String("("+"("+" "+element[0]+" "+")"+element[1]+"("+" "+element[2]+" "+")"+element[3]+"("+" "+element[4]+" "+")"+")"); 
            }
        return signe;
    }
}

/* Implémenter fonction qui vérifie le nb de signes du calcul */
