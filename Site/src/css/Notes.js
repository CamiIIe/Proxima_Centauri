/*Notabene about JavaScript Languages*/

/*
Déclaration de variables :
    let : portée limité à celle du bloc cad ce que l'on trouve entre les accolades
    const : portée similaire à let
    var : portée du contexte dans lequelle elle est déclarée
          Si déclarée dans une fonction alors portée = fonction qu'importe le bloc de déclaration
          Si déclarée hors de la fonction, portée = contexte global
 */

//Fonction permettant de vérifier le résultat donné par l'utilisateur et d'apporter un feedback visuel, puis genere le calcul suivant
//ATTENTION A AU CARRE
function verif() {
    //let calcul = String(document.getElementById("calculastronomique").innerHTML);
    let resultat = document.getElementById("result").value;
    //let correction = verifie(calcul);

    var calcul = document.getElementById("demo").innerHTML.split(" ");
    var number1 = calcul[0];
    var sign1 = calcul[1];
    var number2 = calcul[2];
    var correction;

    if(sign1 === "+"){
        correction = parseInt(number1) + parseInt(number2);
    } else if (sign1 === "-") {
        correction = parseInt(number1) - parseInt(number2);
    } else if (sign1 === "*") {
        correction = parseInt(number1) * parseInt(number2);
    }

    if (parseInt(resultat) === correction) {
        nbBonneRep += 1;

        if (nbBonneRep === 10) {
            nbBonneRep = 0;
            niveau += 1;
        }

        let btn = document.getElementById("btn-verif");
        btn.style.backgroundColor = "green";
        btn.style.color = "black";
        btn.style.borderColor = "black";
        btn.textContent = "Bonne réponse";

        setTimeout(calculAstronomique(niveau), 150);
        /*
        } else if (resultat === "") {
            let btn = document.getElementById("btn-verif");
            btn.style = $('.btn-outline-secondary');
            btn.textContent = "En attente";
        */
    } else {
        nbMauvaisRep += 1;

        if (nbMauvaisRep === 3) {
            niveau = 1;
            nbMauvaisRep = 0;
            nbBonneRep = 0;
        }

        let btn = document.getElementById("btn-verif");
        btn.style.backgroundColor = "red";
        btn.style.color = "black";
        btn.style.borderColor = "black";
        btn.textContent = "Mauvaise réponse";
    }

}

//Fonction qui permettent de vérifier le calcul affiché à l'écran
function verifie(code) {
    let tokens = tokenize(code);
    let position = 0;

    function peek() {
        return tokens[position];
    }

    function consume(token) {
        assert.strictEqual(token, tokens[position]);
        position++;
    }

    function parsePrimaryExpr() {
        let t = peek();

        if(isNumber(t)) {
            consume(t);
            return {type: "number", value: t};
        } else if (isName(t)) {
            consume(t);
            return {type: "name", id: t};
        } else if (t === "(") {
            consume(t);
            let expr = parseExpr();
            if (peek() !== ")")
                throw new SyntaxError("expected )");
            consume(")");
            return expr;
        } else {
            throw new SyntaxError("expected a number, a variable or parentheses");
        }
    }

    function parseMulExpr() {
        let expr = parsePrimaryExpr();
        let t = peek();
        while (t === "*" || t === "²" || t === "\u00b2") { //TODO
            consume(t);
            let rhs = parsePrimaryExpr();
            expr = {type: t, left: expr, right: rhs};
            t = peek();
        }
        return expr;
    }

    function parseExpr() {
        let expr = parseMulExpr();
        let t = peek();
        while (t === "+" || t === "-") {
            consume(t);
            let rhs = parseMulExpr();
            expr = {type: t, left: expr, right: rhs};
            t = peek();
        }
        return expr;
    }

    let result = parseExpr();

    if (position !== tokens.length)
        throw new SyntaxError("unexpected '"+peek()+ "'");
    return result;
}

//Fonction d'aide pour la fonction qui vérifie le calcul
function tokenize(code) {
    let results = [];
    let tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

    let m;
    while ((m = tokenRegExp.exec(code)) !== null)
        results.push(m[1]);
    return results;
}

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
}

function isName(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

3 + 4 - 5 * 6
2+ (3 + 4) -(5 * 6)
((3 + 4)- 5)* 6)
