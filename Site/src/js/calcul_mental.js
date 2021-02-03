// SCRIPT JAVASCRIPT POUR LE JEU DU CALCUL ASTRONOMIQUE

window.onload = genere;
let niveau = 6;
let nbBonneRep = 0;
let nbMauvaisRep = 0;

//Fonction qui affiche le calcul généré par la fonction calcul astronomique dans la page html et vérifie la réponse
function genere() {
    document.getElementById("calculastronomique").innerHTML = calculAstronomique(niveau);
    document.getElementById("result").value = "";
}

//Fonction permettant de vérifier le résultat donné par l'utilisateur et d'apporter un feedback visuel, puis genere le calcul suivant
function verif() {
    let calcul = document.getElementById("calculastronomique").innerHTML.split(" ");
    let resultat = document.getElementById("result").value;

    //let correct = correction(calcul);
    //let correct = calcule(calcul[0], calcul[1], calcul[2]);
    let correct;

    if (calcul.length == 3) {
        correct = calcule(calcul[0], calcul[1], calcul[2]);
    } else if (calcul.length == 5) {
        correct = calcule(calcul[0], calcul[1],calcule(calcul[2], calcul[3], calcul[4]));
    } else if (calcul.length == 7) {
        //La correction part du principe que le calcul prioritaire est à droite
        correct = calcule(calcul[0], calcul[1],calcule(calcul[2], calcul[3], calcule(calcul[4], calcul[5], calcul[6])));
    } else if (calcul.length == 9) {
        correct = calcule(calcul[0], calcul[1],calcule(calcul[2], calcul[3], calcule(calcul[4], calcul[5], calcule(calcul[6], calcul[7], calcul[8]))));
    }

    if (parseInt(resultat) === parseInt(correct)) {
        nbBonneRep++;
        if (nbBonneRep == 10) {
            niveau++;
            nbBonneRep = 0;

            if (niveau == 5) {
                setTimeout(redirige, 150);
            } else if (niveau == 10) {
                setTimeout(redirige_10, 150);
            }
        }

        bonneRep();
        setTimeout(genere, 150);
    } else {
        nbMauvaisRep++;
        if (nbMauvaisRep == 3) {
            niveau--;
            nbMauvaisRep = 0;
        }
        mauvaiseRep();
    }
}

//Fonction qui redirige le joueur sur la page felicitation pour le badge 5
function redirige() {
    document.location.href="felicitations.html";
}

//Fonction qui redirige le joueur sur la page felicitation pour le badge 5
function redirige_10() {
    document.location.href="felicitation_10.html";
}

//Fonction qui corrige la réponse de l'utilisateur
function correction(elements) { //calcul) {
    //let elements = calcul.split(" ");
    //let tabPar = chercheExp2(calcul, 0, calcul.length-1);

    let rep1, rep2, rep3, rep4;
    if (elements.contains("²" || "\u00b2")) {
        rep1="";
    } else {
        if (elements.length == 3) {
            rep1 = calcule(elements[0], elements[1], elements[2]);
        } else if (elements.length == 5) {
            rep1 = calcule(elements[0], elements[1], calcule(elements[2], elements[3], elements[4]));
        }
    }
    return rep1;
}

//Fonction qui calcule la réponse de l'expression à 3 éléments saisies
function calcule(nb1, signe, nb2) {
    if (signe == "+") {
        return addition(nb1, nb2);
    } else if (signe == "-") {
        return soustrait(nb1, nb2);
    } else if (signe =="*") {
        return multiplie(nb1, nb2);
    }
}

//Fonction qui calcule carré
function calculCarre(nb, signe) {
    if(signe == "²" || signe == "\u00b2") {
        return carre(nb);
    }
}

//Fonction qui vérifie que c'est un nombre
function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
}

//Fonctions pour calculer l'expression
//Addition
function addition(a, b) {
    return parseInt(a) + parseInt(b);
}

//Soustraction
function soustrait(a, b) {
    return parseInt(a) - parseInt(b);
}

//Multiplie
function multiplie(a, b) {
    return parseInt(a) * parseInt(b);
}

//Carré
function carre(a){
    return parseInt(a) ** 2;
}

//Fonction qui détermine si l'expression contient encore des parenthèses et cherche les positions
function chercheExp2(calcul, debut, fin) {
    let calc = calcul.substring(debut, fin);
    let tab = [debut, fin];

    while(checkAutreExp(calc, debut, fin)) {
        tab = chercheExp(calc, tab[0]+1, tab[1]);
        chercheExp2(calc, tab[0], tab[1]);
    }
    return tab;
}

//Fonction qui cherche les parenthèses ouuvrantes et fermantes les plus proches du début
function chercheExp(calcul, debut, fin) {
    let deb, fn, tab;

    for (let i = 0; i < fin ; i++) {
        if (calcul.charAt(i) == "(") {
            deb = i;
            for (let j = i+1 ; j < fin ; j++) {
                if (calcul.charAt(j) == ")") {
                    fn = j;
                }
            }
        }
    }
    tab = [deb, fn];
    return tab;
}

//Fonction qui retourne un boolean et dis si l'expression contient encore une parenthèse ouvrante ou non
function checkAutreExp(calcul, debut, fin) {
    let exp = calcul.substring(debut, fin);
    if(exp.contains("(")) {
        return true;
    } else {
        return false;
    }
}

//Fonction qui change la couleur du bouton quand la réponse est bonne
function bonneRep() {
    let btn = document.getElementById("btn-verif");
    btn.style.backgroundColor = "green";
    btn.style.color = "black";
    btn.style.borderColor = "black";
    btn.textContent = "Bonne réponse !";
}

//Fonction qui change la couleur du bouton quand la réponse fausse
function mauvaiseRep() {
    let btn = document.getElementById("btn-verif");
    btn.style.backgroundColor = "red";
    btn.style.color = "black";
    btn.style.borderColor = "black";
    btn.textContent = "Mauvaise réponse...";
}

//Fonction qui génère le calcul et change de niveau en fonction du nombre de bonnes réponses saisies par le joueur grâce à un automate
//Pour changer de niveau, il faut comptabilisé 10 bonnes réponses
function calculAstronomique(niveau) {
    let encore = true;
    let chaineSigne, number1, number2, number3, number4, number5, number6, element, operateur, nbSignes, calculFinal;

    while (encore) {
        switch (niveau) {
            case 1 :
                //Génére les calculs du niveau 1
                //getSign : Fonction permettant de retourner un signe selon le niveau actuel où en est l'utilisateur
                //getNumber : Fonction permettant de tirer UN nombre aléatoire en fonction des niveaux du jeu
                //Operation est une variable qui donne le signe qui sera entouré par les nombres générés
                chaineSigne = getSign(niveau);


                if (chaineSigne != null) {
                    number1 = getNumber(niveau, chaineSigne);
                    number2 = getNumber(niveau, chaineSigne);

                    calculFinal = String(number1 + " " + chaineSigne + " " + number2);
                    return calculFinal;
                }
                break;

            case 2 :
                //Génère les calculs du niveau 2
                chaineSigne = getSign(niveau);

                if (chaineSigne != null) {
                    number1 = getNumber(niveau, chaineSigne);
                    number2 = getNumber(niveau, chaineSigne);

                    calculFinal = String(number1 + " " + chaineSigne + " " + number2);
                    return calculFinal;
                }
                break;

            case 3 :
                //Génère les calculs du niveau 3
                chaineSigne = getSign(niveau);
                operateur = getOperateur(chaineSigne);

                if (chaineSigne != null) {
                    number1 = getNumber(niveau, operateur);
                    number2 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + chaineSigne + " " + number2);
                    return calculFinal;
                }
                break;

            case 4 :
                //Génère les calculs du niveau 4
                chaineSigne = getSign(niveau);
                operateur = getOperateur(chaineSigne);

                if (chaineSigne != null) {
                    number1 = getNumber(niveau, operateur);
                    number2 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + chaineSigne + " " + number2);
                    return calculFinal;
                }
                break;

            case 5 :
                //Génère les calculs du niveau 5
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");

                if (element.length == 1) {
                    if (element[0] == "*") {
                        operateur = "multiplication";
                    }
                    number1 = getNumber(niveau, operateur);
                    number2 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + chaineSigne + " " + number2);
                    return calculFinal;
                } else {
                    operateur = getOperateur(element[0]);
                    number1 = getNumber(niveau, operateur);

                    operateur = getOperateur(element[1]);
                    number2 = getNumber(niveau, operateur);
                    number3 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1]+ " " + number3);
                    return calculFinal;
                }

            case 6 :
                //Génère les calculs du niveau 6
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");

                if (element.length == 2) {
                    operateur = getOperateur(element[0]);
                    number1 = getNumber(niveau, operateur);

                    operateur = getOperateur(element[1]);
                    number2 = getNumber(niveau, operateur);
                    number3 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3);
                    return calculFinal;
                } else {
                    operateur = getOperateur(element[0]);
                    number1 = getNumber(niveau, operateur);

                    operateur = getOperateur(element[1]);
                    number2 = getNumber(niveau, operateur);

                    operateur = getOperateur(element[2]);
                    number3 = getNumber(niveau, operateur);
                    number4 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2]+ " " + number4);
                    return calculFinal;
                }

            case 7 :
                //Génère les calculs du niveau 7
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");
                nbSignes = verifNbSign(chaineSigne);

                if (nbSignes == 2) {
                    operateur = getOperateur(element[0]);
                    number1 = getNumber(niveau, operateur);

                    operateur = getOperateur(element[1]);
                    number2 = getNumber(niveau, operateur);
                    number3 = getNumber(niveau, operateur);

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3);
                    return calculFinal;

                } else if (nbSignes == 3) {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getNumber(niveau, operateur);

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getNumber(niveau, operateur2);

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getNumber(niveau, operateur3);

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getNumber(niveau, operateur4);

                    if (nb == 0) {
                        calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3]);
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4);
                    }
                    return calculFinal;

                } else {
                    if (element.length == 5) {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getNumber(niveau, operateur);

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getNumber(niveau, operateur2);

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getNumber(niveau, operateur3);

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getNumber(niveau, operateur4);

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getNumber(niveau, operateur5);

                        if (nb == 0) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4]);
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5);
                        }
                        return calculFinal;

                    } else {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getNumber(niveau, operateur);

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getNumber(niveau, operateur2);

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getNumber(niveau, operateur3);

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getNumber(niveau, operateur4);

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getNumber(niveau, operateur5);

                        if (nb == 0) {
                            return calculFinal = String("pb génération calcul case 7 element.length = 6");
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5]);
                        }
                        return calculFinal;
                    }
                }

            case 8 :
                //Génère les calculs du niveau 8
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");
                nbSignes = verifNbSign(chaineSigne);

                if (nbSignes == 2) {
                    operateur = getOperateur(element[0]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    operateur = getOperateur(element[1]);
                    number2 = getCarre(getNumber(niveau, operateur));
                    number3 = getCarre(getNumber(niveau, operateur));

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3);
                    return calculFinal;

                } else if (nbSignes == 3) {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getCarre(getNumber(niveau, operateur2));

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getCarre(getNumber(niveau, operateur3));

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getCarre(getNumber(niveau, operateur4));

                    if (nb == 0) {
                        calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3]);
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4);
                    }
                    return calculFinal;

                } else {
                    if (element.length == 5) {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getNumber(niveau, operateur3);

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4]);
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5);
                        }
                        return calculFinal;

                    } else {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getCarre(getNumber(niveau, operateur3));

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String("pb génération calcul case 8 element.length = 6");
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5]);
                        }
                        return calculFinal;
                    }
                }

            case 9 :
                //Génère les calculs du niveau 9
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");
                nbSignes = verifNbSign(chaineSigne);

                if (nbSignes == 2) {
                    operateur = getOperateur(element[0]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    operateur = getOperateur(element[1]);
                    number2 = getCarre(getNumber(niveau, operateur));
                    number3 = getCarre(getNumber(niveau, operateur));

                    calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3);
                    return calculFinal;

                } else if (nbSignes == 3) {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getCarre(getNumber(niveau, operateur2));

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getCarre(getNumber(niveau, operateur3));

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getCarre(getNumber(niveau, operateur4));

                    if (nb == 0) {
                        calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3]);
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4);
                    }
                    return calculFinal;

                } else if (nbSignes == 4) {
                    if (element.length == 5) {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getNumber(niveau, operateur3);

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4]);
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5);
                        }
                        return calculFinal;

                    } else {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getCarre(getNumber(niveau, operateur3));

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String("pb génération calcul case 9 element.length = 6");
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5]);
                        }
                        return calculFinal;
                    }
                } else {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getCarre(getNumber(niveau, operateur2));

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getCarre(getNumber(niveau, operateur3));

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getCarre(getNumber(niveau, operateur4));

                    let nb4 = testParenthese(element, nb+1);
                    let operateur5 = getOperateur(element[nb4]);
                    number5 = getCarre(getNumber(niveau, operateur5));

                    let nb5 = testParenthese(element, nb+1);
                    let operateur6 = getOperateur(element[nb5]);
                    number6 = getCarre(getNumber(niveau, operateur6));

                    if (nb == 0) {
                        if (element.length === 5) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4] + " " + number6);
                        } else {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4] + " " + number6 + element[5]);
                        }
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5] + " " + number6 + element[6]);
                    }
                    return calculFinal;
                }

            case 10 :
                //Génère les calculs du niveau 10
                chaineSigne = getSign(niveau);
                element = chaineSigne.split(" ");
                nbSignes = verifNbSign(chaineSigne);

                if (nbSignes == 3) {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getCarre(getNumber(niveau, operateur2));

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getCarre(getNumber(niveau, operateur3));

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getCarre(getNumber(niveau, operateur4));

                    if (nb == 0) {
                        calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3]);
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4);
                    }
                    return calculFinal;

                } else if (nbSignes == 4) {
                    if (element.length == 5) {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getNumber(niveau, operateur3);

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4]);
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5);
                        }
                        return calculFinal;

                    } else {
                        let nb = testParenthese(element, 0);
                        operateur = getOperateur(element[nb]);
                        number1 = getCarre(getNumber(niveau, operateur));

                        let nb1 = testParenthese(element, nb+1);
                        let operateur2 = getOperateur(element[nb1]);
                        number2 = getCarre(getNumber(niveau, operateur2));

                        let nb2 = testParenthese(element, nb+1);
                        let operateur3 = getOperateur(element[nb2]);
                        number3 = getCarre(getNumber(niveau, operateur3));

                        let nb3 = testParenthese(element, nb+1);
                        let operateur4 = getOperateur(element[nb3]);
                        number4 = getCarre(getNumber(niveau, operateur4));

                        let nb4 = testParenthese(element, nb+1);
                        let operateur5 = getOperateur(element[nb4]);
                        number5 = getCarre(getNumber(niveau, operateur5));

                        if (nb == 0) {
                            calculFinal = String("pb génération calcul case 10 element.length = 6");
                        } else {
                            calculFinal = String(element[0] + " " + number1 + " " + element[1] + " " + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5]);
                        }
                        return calculFinal;
                    }
                } else {
                    let nb = testParenthese(element, 0);
                    operateur = getOperateur(element[nb]);
                    number1 = getCarre(getNumber(niveau, operateur));

                    let nb1 = testParenthese(element, nb+1);
                    let operateur2 = getOperateur(element[nb1]);
                    number2 = getCarre(getNumber(niveau, operateur2));

                    let nb2 = testParenthese(element, nb+1);
                    let operateur3 = getOperateur(element[nb2]);
                    number3 = getCarre(getNumber(niveau, operateur3));

                    let nb3 = testParenthese(element, nb+1);
                    let operateur4 = getOperateur(element[nb3]);
                    number4 = getCarre(getNumber(niveau, operateur4));

                    let nb4 = testParenthese(element, nb+1);
                    let operateur5 = getOperateur(element[nb4]);
                    number5 = getCarre(getNumber(niveau, operateur5));

                    let nb5 = testParenthese(element, nb+1);
                    let operateur6 = getOperateur(element[nb5]);
                    number6 = getCarre(getNumber(niveau, operateur6));

                    if (nb == 0) {
                        if (element.length == 5) {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4] + " " + number6);
                        } else {
                            calculFinal = String(number1 + " " + element[0] + " " + number2 + " " + element[1] + " " + number3 + " " + element[2] + " " + number4 + " " + element[3] + " " + number5 + " " + element[4] + " " + number6 + element[5]);
                        }
                    } else {
                        calculFinal = String(element[0] + " " + number1 + " " + element[1] + number2 + " " + element[2] + " " + number3 + " " + element[3] + " " + number4 + " " + element[4] + " " + number5 + " " + element[5] + " " + number6 + element[6]);
                    }
                    return calculFinal;
                }
            break;
        }
    }
}

//Fonction qui transforme le nombre en nombre au carré si contient carré dans nombre
function getCarre(nombre) {
    let nb;
    let element = nombre.split(" ");

    if (element.length == 2) {
        nb = String(element[0]+" \u00b2");
        return nb;
    } else {
        return nombre;
    }
}

//Fontion qui teste si l'élement est une parenthèse ouvrante ou non
function testParenthese(element, nb) {
    let i = nb;

    if (element[i] == "(" || element[i] == ")" || element[i] == "((" || element[i] == "))") {
        testParenthese(element, i+1);
    }
    return i;
}

//Fonction qui détermine si le signe est une multiplication ou non
function getOperateur(signe) {
    let operateur = "";

    if (signe == "*") {
        return "multiplication";
    }
/*
    for (let i = 0; i < signe.length; i++) {
        if(signe.charAt(i) == "*") {
            operateur = "multiplication";
        }
    }
    */
    return operateur;
}

//Fonction permettant de tirer un nombre dans l'intervalle [min,max]
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Fonction permettant de retourner un signe selon le niveau actuel où en est l'utilisateur
function getSign(numNiveau) {
    let signes = ["+", "-", "*"];
    let random, signe, random2, random3, random4, random5;
    let nbSigne, nbParenthese, signeAvecParenthese, rep, msg;

    switch (numNiveau) {
        case 1: //Niveau 1 : 70% d'avoir une addition et 30% d'avoir une soustraction
            random = getRandomIntInclusive(1, 10);

            if (random <= 7) {
                signe = String(signes[0]);
            } else {
                signe = String(signes[1]);
            }
            return signe;

        case 2: //Niveau 2 : 5/10 d'avoir une addition et 5/10 d'avoir une soustraction
            random = getRandomIntInclusive(1, 10);
            // (50/100)*10 = 5 d'où les 50% de chances d'obtenir une addition ou une soustraction
            if (random <= 5) {
                signe = String(signes[0]);
            } else {
                signe = String(signes[1]);
            }
            return signe;

        case 3: //Niveau 3 : 4.5/10 d'avoir une addition, 4.5/10 d'avoir une soustraction 
            //et 1/10 d'avoir une multiplication
            random = getRandomIntInclusive(1, 10);

            //(45/100)*10 = 4.5 d'où les 45% de chances d'otenir une addition ou un soustraction 
            if (random <= 4.5) {
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
            if (random <= 3.5) {
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

            if (nbSigne == 1) {
                if (random <= 2.5) {
                    signe = String(signes[0]);
                } else if (random <= 5 && random > 2.5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0] + " " + signes[2]);
                } else {
                    signe = String(signes[1] + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);
            if (rep == true) {
                return signe;
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul */
            } else {
                msg = "Erreur dans la génération des signes pour le calcul";
                return msg;
            }

        case 6: //Niveau 6 : 70% de chance d'avoir un calcul avec 2 signes et 30% de chances 
            // d'avoir un calcul à 3 signes
            random = getRandomIntInclusive(1, 10);

            nbSigne = getNbSign(numNiveau);

            if (nbSigne == 2) {
                if (random <= 5) {
                    signe = String(signes[0] + " " + signes[2]);
                } else {
                    signe = String(signes[1] + " " + signes[2]);
                }
            } else {
                random2 = getRandomIntInclusive(1, 15);

                if (random2 <= 5) {
                    signe = String(signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);
            return signe;
            /*
            if (rep == true) {
                return signe;
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul
            } else {
                console.log(Erreur case 6 getsign);
                //Retourne le msg d'erreur qui est traité dans les programmes pour générer le calcul en splittant sur les espaces et reconnaît le mot erreur
            } *///TODO

        case 7: //Niveau 7 : Minimum de deux signes à quatre signes avec des priorités opératoires et des parenthèses non-imbriqués
            random = getRandomIntInclusive(1, 15);

            nbSigne = getNbSign(numNiveau);


            if (nbSigne == 2) {
                if (random <= 7) {
                    signe = String(signes[0] + " " + signes[2]);
                } else {
                    signe = String(signes[1] + " " + signes[2]);
                }
            } else if (nbSigne == 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);

            nbParenthese = nbParentheses(nbSigne);
            signeAvecParenthese = getParentheses(nbParenthese, signe);
            return signeAvecParenthese;
            /*
            if (rep == true) {
                //Si le nombre de signe est bien celui souhaité, alors le programme peut ajouter les parenthèses autour des signes de la chaine
                nbParenthese = nbParentheses(nbSigne);
                signeAvecParenthese = getParentheses(nbParenthese, signe);
                return signeAvecParenthese;
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul
            } else {
                msg = "Erreur dans la génération des signes pour le calcul";
                return msg;
                //Retourne le msg d'erreur qui est traité dans les programmes pour générer le calcul en splittant sur les espaces et reconnaît le mot erreur
            }*/

        case 8 : //Niveau 8 : Minimum de deux signes à quatres signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15);

            nbSigne = getNbSign(numNiveau);

            if (nbSigne == 2) {
                if (random <= 7) {
                    signe = String(signes[0] + " " + signes[2]);
                } else {
                    signe = String(signes[1] + " " + signes[2]);
                }

            } else if (nbSigne == 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);

            /*
            if (rep == true) {
                //Si le nombre de signe est bien celui souhaité, alors le programme peut ajouter les parenthèses autour des signes de la chaine
                nbParenthese = nbParentheses(nbSigne);
                signeAvecParenthese = getParentheses(nbParenthese, signe);
                return signeAvecParenthese;
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul
            } else {
                msg = "Erreur dans la génération des signes pour le calcul";
                return msg;
                //Retourne le msg d'erreur qui est traité dans les programmes pour générer le calcul en splittant sur les espaces et reconnaît le mot erreur
            }*/

        case 9 : //Niveau 9 : Minimum de deux signes à cinq signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15);

            nbSigne = getNbSign(numNiveau);

            if (nbSigne == 2) {
                if (random <= 7) {
                    signe = String(signes[0] + " " + signes[2]);
                } else {
                    signe = String(signes[1] + " " + signes[2]);
                }

            } else if (nbSigne == 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            } else if (nbSigne == 4) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random5 = getRandomIntInclusive(1, 15);
                if (random <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random5 <= 10 && random5 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);
            /*
            if (rep == true) {
                //Si le nombre de signe est bien celui souhaité, alors le programme peut ajouter les parenthèses autour des signes de la chaine
                nbParenthese = nbParentheses(nbSigne);
                signeAvecParenthese = getParentheses(nbParenthese, signe);
                return signeAvecParenthese;
                /* Chaine de String avec les signes de l'opération, nécessite de faire un split
                pour afficher le calcul en entier dans la fonction qui génère le calcul
            } else {
                msg = "Erreur dans la génération des signes pour le calcul";
                return msg;
                //Retourne le msg d'erreur qui est traité dans les programmes pour générer le calcul en splittant sur les espaces et reconnaît le mot erreur
            }*/

        case 10 :  //Niveau 10 : Minimum de trois signes à quatres signes avec des priorités opératoires et des parenthèses imbriqués
            random = getRandomIntInclusive(1, 15);

            nbSigne = getNbSign(numNiveau);

            if (nbSigne == 3) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

            } else if (nbSigne == 4) {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            } else {
                if (random <= 5) {
                    signe = String(signes[0]);
                } else if (random <= 10 && random > 5) {
                    signe = String(signes[1]);
                } else {
                    signe = String(signes[2]);
                }

                random2 = getRandomIntInclusive(1, 15);
                if (random2 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random3 = getRandomIntInclusive(1, 15);
                if (random3 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random4 = getRandomIntInclusive(1, 15);
                if (random4 <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random4 <= 10 && random4 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }

                random5 = getRandomIntInclusive(1, 15);
                if (random <= 5) {
                    signe = String(signe + " " + signes[0]);
                } else if (random5 <= 10 && random5 > 5) {
                    signe = String(signe + " " + signes[1]);
                } else {
                    signe = String(signe + " " + signes[2]);
                }
            }

            //Vérifie que la chaine contient bien le nombre de signes voulu
            rep = verifNbSign(nbSigne, numNiveau, signe);

            /*
            if (rep == true) {
                //Si le nombre de signe est bien celui souhaité, alors le programme peut ajouter les parenthèses autour des signes de la chaine
                nbParenthese = nbParentheses(nbSigne);
                signeAvecParenthese = getParentheses(nbParenthese, signe);

                if (verifNbParenthese(signeAvecParenthese, nbParenthese)) {
                    if (verifParenthese(signeAvecParenthese)) {
                        return signeAvecParenthese;
                        /* Chaine de String avec les signes de l'opération et les parenthèses, nécessite de faire un split
                        pour afficher le calcul en entier dans la fonction qui génère le calcul
                    }
                }
            } else {
                msg = "Erreur dans la génération des signes pour le calcul";
                return msg;
                //Retourne le msg d'erreur qui est traité dans les programmes pour générer le calcul en splittant sur les espaces et reconnaît le mot erreur
            }*/
            break;

        default:
            break;
    }
}

//Fonction permettant de tirer UN nombre aléatoire en fonction des niveaux du jeu
//Operation est une variable qui donne le signe qui sera entouré par les nombres générés
function getNumber(numNiveau, operation) {
    let nombre;

    switch (numNiveau) {
        case 1 :
            //Étendue des nombres entre 1 à 10 pour addition et soustraction
            nombre = getRandomIntInclusive(1, 10);
            return nombre;

        case 2 :
            //Étendue des nombres entre 1 à 20 pour addition et soustraction
            nombre = getRandomIntInclusive(1, 20);
            return nombre;

        case 3 :
            //Étendue des nombres entre 11 et 30 pour addition et soustraction
            //Étendue des nombres entre 1 et 20 pour multiplication
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(1, 10);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(11, 30);
                return nombre;
            }

        case 4 :
            //Étendue des nombres entre 11 et 50 pour addition et soustraction
            //Étendue des nombres entre 1 et 20 pour multiplication
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(1, 20);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(11, 50);
                return nombre;
            }

        case 5 :
            //Étendue des nombres entre 50 et 100 pour addition et soustraction
            //Étendue des nombres entre 11 et 50 pour multiplication
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(11, 50);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(50, 100);
                return nombre;
            }

        case 6 :
            //Étendue des nombres entre 100 et 1000 pour addition et soustraction
            //Étendue des nombres entre 11 et 70 pour multiplication
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(11, 70);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(100, 1000);
                return nombre;
            }

        case 7 :
            //Étendue des nombres entre 100 à 1000 pour addition et soustraction
            //Étendue des nombres entre 11 à 100 pour multiplication
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(11, 100);
                return nombre;
            } else {
                nombre = getRandomIntInclusive(100, 1000);
                return nombre;
            }

        case 8 :
            //Étendue des nombres entre 100 à 10 000 pour addition et soustraction
            //Étendue des nombres entre 11 à 100 pour multiplication
            //Étendue des nombres entre 1 à 20 pour carre, il y a 1/3 de chance de tomber sur un carré si le signe est "+" ou "-"
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(11, 100);
                return nombre;
            } else {
                let random = getRandomIntInclusive(1, 15);

                if (random <= 5) {
                    nombre = getRandomIntInclusive(1, 20);
                    return String(nombre + " carre");
                } else {
                    nombre = getRandomIntInclusive(100, 1000);
                    return nombre;
                }
            }

        case 9 :
            //Étendue des nombres entre 1000 et 20 000 pour addition et soustraction
            //Étendue des nombres entre 100 à 1000 pour multiplication
            //Étendue des nombres entre 11 à 30 pour carre
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(100, 1000);
                return nombre;
            } else {
                let random = getRandomIntInclusive(1, 10);

                if (random <= 7) {
                    nombre = getRandomIntInclusive(11, 30);
                    return String(nombre + " carre");
                } else {
                    nombre = getRandomIntInclusive(1000, 20000);
                    return nombre;
                }
            }

        case 10 :
            //Étendue des nombres entre 20 000 et 100 000 pour addition et soustraction
            //Étendue des nombres entre 100 à 1000 pour multiplication
            //Étendue des nombres entre 11 à 50 pour carre
            if (operation == "multiplication") {
                nombre = getRandomIntInclusive(100, 1000);
                return nombre;
            } else {
                let random = getRandomIntInclusive(1, 10);
                if (random <= 9) {
                    nombre = getRandomIntInclusive(11, 50);
                    return String(nombre + " carre");
                } else {
                    nombre = getRandomIntInclusive(20000, 100000);
                    return nombre;
                }
            }
    }
}

/*Fonction permettant de déterminer le nombre de signes du calcul qui retourne le nb de signes 
du calcul */
function getNbSign(numNiveau) {
    let random, nbSigne;

    switch (numNiveau) {
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

    for (let i = 0; i < calcul.length; i++) {
        if (calcul.charAt(i) == '(') {
            nb1++;
        }
        if (calcul.charAt(i) == ')') {
            nb2++;
        }
    }

    let tab1 = [];
    tab1.length = nb1;

    let tab2 = [];
    tab2.length = nb2;

    let n1 = 0;
    let n2 = 0;

    for (let j = 0; j < calcul.length; j++) {
        if (calcul.charAt(j) == '(') {
            tab1[n1] = calcul.indexOf('(', j);
            n1++;
        }
        if (calcul.charAt(j) == ')') {
            tab2[n2] = calcul.indexOf(')', j);
            n2++;
        }
    }

    if (nb1 == nb2) {
        for (let x = 0; x < tab1.length; x++) {
            //La ligne ci-dessou équivaut à if (tab1[x] < tab2[x]) {
            //                 ver = true;
            //             } else {
            //                 ver = false;
            //             }
            ver = tab1[x] < tab2[x];
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
    for (let i = 0; i < calcul.length; i++) {
        if (calcul.charAt(i) == '(') {
            nb1++;
        }
        if (calcul.charAt(i) == ')') {
            nb2++;
        }
    }

    //Vérifie que le nombre de parenthèses ouvrantes et fermantes correspond au nombre de couple de parenthèses souhaités
    if (nb1 == nb2) {
        if (nbParenthese == nb1 || nbParenthese == nb2) {
            ver = true;
        }
    }
    return ver;
}

/* Fonction qui détermine le nombre de couple de parenthèses dans le calcul */
function nbParentheses(nbSigne) {
    let random, nbParenthese;

    switch (nbSigne) {
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
    let reponse, random;

    switch (nbParenthese) {
        case 1 :
            reponse = false;
            return reponse;

        case 2 :
            random = getRandomIntInclusive(1, 10);

            //reponse = random > 5; ??
            reponse = random > 5;
            return reponse;

        case 3 :
            random = getRandomIntInclusive(1, 10);

            reponse = random > 5;
            return reponse;

        case 4 :
            random = getRandomIntInclusive(1, 10);

            reponse = random > 5;
            return reponse;

        default:
            break;

    }
}

/* Fonction qui prend la chaîne de caractères signe et ajoute les parenthèses dans 
cette chaine */
function getParentheses(nbParenthese, signe) {
    let element, parentheseImbriques, random, random2, random3;
    switch (nbParenthese) {
        case 0 :
            return signe;

        case 1 :
            element = signe.split(" ");
            signe = " ";

            if (element.length == 2) {
                random = getRandomIntInclusive(1, 10);

                if (random <= 5) {
                    signe = String("(" + " " + element[0] + " " + ")" + element[1]);
                } else {
                    signe = String(element[0] + "(" + " " + element[1] + " " + ")");
                }
            } else if (element.length == 3) {
                random2 = getRandomIntInclusive(1, 15);

                if (random2 <= 5) {
                    signe = String("(" + " " + element[0] + " " + ")" + element[1] + " " + element[2])
                } else if (random2 <= 10 && random2 > 5) {
                    signe = String(element[0] + "(" + " " + element[1] + " " + ")" + element[2]);
                } else {
                    signe = String(element[0] + " " + element[1] + "(" + " " + element[2] + " " + ")");
                }
            } else {
                random3 = getRandomIntInclusive(1, 20);

                if (random3 <= 5) {
                    signe = String("(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + " " + element[3]);
                } else if (random3 <= 10 && random3 > 5) {
                    signe = String(element[0] + "(" + " " + element[1] + " " + ")" + element[2] + " " + element[3]);
                } else if (random3 <= 15 && random3 > 10) {
                    signe = String(element[0] + " " + element[1] + "(" + " " + element[2] + " " + ")" + element[3]);
                } else {
                    signe = String(element[0] + " " + element[1] + " " + element[2] + "(" + " " + element[3] + " " + ")");
                }
            }
            return signe;

        case 2 :
            element = signe.split(" ");
            signe = " ";
            random = getRandomIntInclusive(1, 10);
            parentheseImbriques = parenthesesImbriques(nbParenthese);

            if (parenthesesImbriques == false) {
                if (element.length == 3) {
                    signe = String("(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")");

                } else if (element.length == 4) {
                    random = getRandomIntInclusive(1, 15);

                    if (random <= 5) {
                        signe = String("(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")" + element[3]);
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + "(" + " " + element[3] + " " + ")");
                    } else {
                        signe = String(element[0] + "(" + " " + element[1] + " " + ")" + element[2] + "(" + " " + element[3] + " " + ")");
                    }
                } else {
                    random = getRandomIntInclusive(1, 30);

                    if (random <= 5) {
                        signe = String("(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + " " + element[4]);
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + "(" + " " + element[3] + " " + ")" + element[4]);
                    } else if (random <= 15 && random > 10) {
                        signe = String("(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + " " + element[3] + "(" + " " + element[4] + " " + ")");
                    } else if (random <= 20 && random > 15) {
                        signe = String(element[0] + "(" + " " + element[1] + " " + ")" + element[2] + "(" + " " + element[3] + " " + ")" + element[4]);
                    } else if (random <= 25 && random > 20) {
                        signe = String(element[0] + "(" + " " + element[1] + " " + ")" + element[2] + " " + element[3] + "(" + " " + element[4] + " " + ")");
                    } else {
                        signe = String(element[0] + " " + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + "(" + " " + element[4] + " " + ")");
                    }
                }
            } else {
                if (element.length == 3) {
                    random = getRandomIntInclusive(1, 20);

                    if (random <= 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + " " + ")" + element[2]);
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + ")" + ")" + " " + element[2]);
                    } else if (random <= 15 && random > 10) {
                        signe = String(element[0] + "(" + " " + element[1] + "(" + " " + element[2] + " " + ")" + ")");
                    } else {
                        signe = String(element[0] + " " + "(" + "(" + " " + element[1] + " " + ")" + element[2] + " " + ")");
                    }
                } else if (element.length == 4) {
                    random = getRandomIntInclusive(1, 35);

                    if (random <= 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + " " + ")" + element[2] + " " + element[3]);
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + ")" + ")" + element[2] + " " + element[3]);
                    } else if (random <= 15 && random > 10) {
                        signe = String(element[0] + " " + element[1] + "(" + " " + element[2] + "(" + " " + element[3] + " " + ")" + ")");
                    } else if (random <= 20 && random > 15) {
                        signe = String(element[0] + " " + element[1] + "(" + "(" + " " + element[2] + " " + ")" + element[3] + " " + ")");
                    } else if (random <= 25 && random > 20) {
                        signe = String(element[0] + "(" + " " + element[1] + "(" + " " + element[2] + " " + ")" + ")" + element[3]);
                    } else if (random <= 30 && random > 25) {
                        signe = String(element[0] + "(" + "(" + " " + element[1] + " " + ")" + element[2] + ")" + element[3]);
                    } else {
                        signe = String(element[0] + " " + element[1] + "(" + "(" + " " + element[2] + " " + ")" + element[3] + " " + ")");
                    }
                } else {
                    random = getRandomIntInclusive(1, 70);

                    if (random <= 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + " " + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + ")" + element[2] + " " + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 15 && random > 10) {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + element[2] + " " + ")" + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 20 && random > 15) {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + element[2] + " " + element[3] + " " + ")" + element[4] + " " + ")");
                    } else if (random <= 25 && random > 20) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + ")" + element[2] + " " + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 30 && random > 25) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + element[2] + " " + ")" + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 35 && random > 30) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + element[2] + " " + element[3] + " " + ")" + element[4] + ")");
                    } else if (random <= 40 && random > 35) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + element[2] + " " + element[3] + " " + element[4] + " " + ")" + ")");
                    } else if (random <= 45 && random > 40) {
                        signe = String("(" + " " + element[0] + " " + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 50 && random > 45) {
                        signe = String("(" + " " + element[0] + " " + element[1] + "(" + " " + element[2] + " " + element[3] + " " + ")" + element[4] + " " + ")");
                    } else if (random <= 55 && random > 50) {
                        signe = String("(" + " " + element[0] + " " + element[1] + "(" + " " + element[2] + " " + element[3] + " " + element[4] + " " + ")" + ")");
                    } else if (random <= 60 && random > 55) {
                        signe = String("(" + " " + element[0] + " " + element[1] + " " + element[2] + "(" + " " + element[3] + " " + ")" + element[4] + " " + ")");
                    } else if (random <= 65 && random > 60) {
                        signe = String("(" + " " + element[0] + " " + element[1] + " " + element[2] + "(" + " " + element[3] + " " + element[4] + " " + ")");
                    } else {
                        signe = String("(" + " " + element[0] + " " + element[1] + " " + element[2] + " " + element[3] + "(" + " " + element[4] + " " + ")");
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
            if (parentheseImbriques == false) {
                if (element.length == 3) {
                    parentheseImbriques = true;
                } else if (element.length == 4) {
                    parentheseImbriques = true;
                } else {
                    signe = String("(" + " " + element[0] + " " + ")" + element[2] + "(" + " " + element[2] + " " + ")" + element[3] + "(" + " " + element[4] + " " + ")");
                }
            } else {
                if (element.length == 3) {
                    signe = String("(" + "(" + " " + element[0] + " " + ")" + element[2] + "(" + " " + element[3] + " " + ")" + ")");
                } else if (element.length == 4) {
                    random = getRandomIntInclusive(1, 20);

                    if (random <= 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + " " + ")");
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + " " + element[0] + "(" + " " + element[1] + " " + ")" + element[2] + "(" + " " + element[3] + " " + ")");
                    } else if (random <= 15 && random > 10) {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + ")" + element[2] + "(" + " " + element[3] + " " + ")" + ")");
                    } else {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + element[3] + " " + ")" + ")");
                    }
                } else {
                    random = getRandomIntInclusive(1, 25);

                    if (random <= 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + " " + element[4] + " " + ")");
                    } else if (random <= 10 && random > 5) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + "(" + " " + element[3] + " " + ")" + element[4] + " " + ")");
                    } else if (random <= 15 && random > 10) {
                        signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + " " + element[2] + " " + element[3] + "(" + " " + element[4] + " " + ")" + ")");
                    } else if (random <= 20 && random > 15) {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + ")" + element[2] + " " + element[3] + "(" + " " + element[4] + " " + ")");
                    } else {
                        signe = String("(" + "(" + " " + element[0] + " " + element[1] + " " + element[2] + " " + ")" + element[3] + "(" + " " + element[4] + " " + ")");
                    }
                }
            }
            return signe;

        case 4 :
            element = signe.split(" ");
            signe = " ";
            random = getRandomIntInclusive(1, 10);
            parentheseImbriques = parenthesesImbriques(nbParenthese);

            if (parentheseImbriques == false) {
                //if (element.length == 5) {
                //Ne précise pas la condition car il n'y a 4 couples de parenthèses que à la condition qu'il y a 5  signes dans le calcul 
                parentheseImbriques = true;
                //}
            } else {
                signe = String("(" + "(" + " " + element[0] + " " + ")" + element[1] + "(" + " " + element[2] + " " + ")" + element[3] + "(" + " " + element[4] + " " + ")" + ")");
            }
            return signe;
    }
}

/* Implémenter fonction qui vérifie le nb de signes du calcul */
function verifNbSign(nbSign, numNiveau, signe) {
    let rep = 0;

    for (let i = 0; i < signe.length; i++) {
        if(signe.charAt(i) == "+" || signe.charAt(i) == "-" || signe.charAt(i) == "*") {
            rep++;
        }
    }
    return rep == nbSign;
}
