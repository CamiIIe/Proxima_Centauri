<!DOCTYPE html>
<html>

    <!-- HEAD -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
        <title>Proxima Centauri</title>

        <!-- CSS -->
        <link rel="stylesheet" href="src/css/bootstrap.min.css"> <!-- CSS BOOTSTRAP -->
        <link rel="stylesheet" href="src/css/style.css">         <!-- CSS PRINCIPAL -->
        <link rel="stylesheet" href="src/css/header_navbar.css"> <!-- CSS HEADER ET SIDENAVBAR -->
        <link rel="stylesheet" href="src/css/form.css">          <!-- CSS FORM -->
        <link rel="stylesheet" href="src/css/oubli.css">         <!-- CSS OUBLI -->
        <!-- CSS -->

        <!-- FONT -->
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'> <!-- ICONES -->
        <script src="https://kit.fontawesome.com/51da07dc34.js" crossorigin="anonymous"></script>       <!-- ICONES -->
        <!-- FONT -->

        <!-- META SEO -->
        <meta name="description" content="La description du site. Mettre des bons clefs !">
        <meta name="keywords" content="Mettre plusieurs mots-clefs">
        <!-- META SEO -->

    </head>
    <!-- HEAD -->

    <!-- BODY // CONTENU DU SITE -->
    <body class="animate-in" id ="body-pd">
        
        <!-- HEADER -->
        <header class="header" id="header">
            <div class="header__toggle">
                <i class='bx bx-menu' id="header-toggle"></i>
            </div>

            <div class="container-fluid connexion">
                <!-- <span><a href="#" class = "left">
                    <button type="button" class="btn btn-light">S'inscrire</button>
                </a>
                </span> -->
                <!-- <span><a href="form.php">
                    <button type="button" class="btn btn-warning"><i class='bx bx-rocket'></i>
                        Connexion</button>
                    </a>
                </span> -->
            </div>
        </header>
        <!-- HEADER -->

        <!-- SIDENAVBAR -->
        <div class="l-navbar" id="nav-bar">
            <nav class="nav">
                <div>
                    <!-- LOGO / NOM / LIEN DE RETOUR A L'INDEX -->
                    <a href="index.html" class="nav__logo">
                        <i class='bx bxs-analyse nav__logo-icon'></i>
                        <span class="nav__logo-name">Proxima Centauri</span>
                    </a>

                    <!-- DIV DES JEUX -->
                    <div class="nav__list">
                        <!-- LOGO / NOM / LIEN VERS CALCUL ASTRONOMIQUE -->
                        <a href="calcul_mental.html" class="nav__link">
                        <i class='bx bxs-compass nav__icon' ></i>
                            <span class="nav__name">Calcul Astronomique</span>
                        </a>

                        <!-- LOGO / NOM / LIEN VERS "CALCUL ASTRONOMIQUE" -->
                        <a href="#" class="nav__link">
                            <i class='bx bxs-star-half nav__icon' ></i>
                            <span class="nav__name">Memory Stellaire</span>
                        </a>
                        
                        <!-- LOGO / NOM / LIEN VERS "VISE LA LUNE" -->
                        <a href="#" class="nav__link">
                            <i class='bx bxs-moon nav__icon' ></i>
                            <span class="nav__name">Vise la Lune</span>
                        </a>

                        <!-- LOGO / NOM / LIEN VERS "PLANETE AUX COULEURS" -->
                        <a href="#" class="nav__link">
                            <i class='bx bx-planet nav__icon' ></i>
                            <span class="nav__name">Planète aux Couleurs</span>
                        </a>
                    </div>
                </div>
        
                <!-- LOGO / LIEN RETOUR VERS LA PAGE D'ACCUEIL -->
                <a href="accueil.html" class="nav__link">
                    <i class='bx bx-log-out nav__icon' ></i>
                    <span class="nav__name">Retour</span>
                </a>
            </nav>
        </div>
        <!-- SIDENAVBAR -->

        <!-- MAIN -->
        <div class="container-fluid oubli">
         
            <form method = "post" enctype = "form-data" action = "traite_O.php">
            <h1>Mot de passe oublié ?</h1>
                Pour réinitialiser votre mot de passe, entrez votre adresse e-mail ici : 
                    <input type = "text" name = "emailo" />
                    <input class="boutonV" type="submit" name="valider"value="Valider">
            </form>
            <?php
            //Résultat si le mail n'est pas dans la base de donnée 
                if (isset($_GET ["inexistant"])){
                    echo '<form method = "post" enctype = "form-data" action = "traite_O.php">';
                    echo "<br />Cet e-mail n'existe pas dans la base de données. Voulez-vous créer un nouveau compte ? ";
                    //echo "<a href='form.php'>Créer un nouveau compte</a><br>";
                    echo '<input class="boutonR" type = "submit" name = "connexion" value = "Créer un nouveau compte" /><br />'
                            . ' </form>';
                };
                //Résultat si le mail est pas dans la base de donnée 
                if (isset($_GET ["envoye"])){
                    echo '<form method = "post" enctype = "form-data" action = "traite_O.php">';
                    echo "<br />Un mail a bien été envoyé. ";
                    //echo "<a class='oubli' href='form.php'>Retourner à la page de connexion</a><br>";
                    echo '<input class="boutonR" type = "submit" name = "connexion" value = "Retourner à la page de connexion" /><br />'
                            . ' </form>';
                };

            ?>
        </div>

        <div class ="container-fluid propos">
            <!-- Icone A propos : Rocket qui part de la Terre / Accès à la page à propos -->
            <a href="propos.html">
                <img src = "src/img/icones/png/rocket.png" class="img-fluid"> 
            </a>

            <a href="remerciements.html">
                <img src = "src/img/icones/png/Heart.png" class="img-fluid"> 
            </a>
        </div>

        <!-- FOOTER -->
        <footer>
            <!-- Contact - Aide - Confidentialité - About -->
        </footer>
        <!-- FOOTER -->



        <!-- JAVASCRIPT -->
        <script src="src/js/jquery-3.5.1.min.js"></script>
        <script src="src/js/bootstrap.min.js"></script>
        <!-- <script src="src/js/gestionSVG.js"></script> -->
        <script src="src/js/main.js"></script>
        <!-- JAVASCRIPT -->
      
    </body>
    <!-- BODY // CONTENU DU SITE -->

</html>