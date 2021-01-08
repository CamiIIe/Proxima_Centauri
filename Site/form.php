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

            <!-- <div class="container-fluid connexion">
                <span><a href="#" class = "left">
                    <button type="button" class="btn btn-light">S'inscrire</button>
                </a>
                </span>
                <span><a href="#">
                    <button type="button" class="btn btn-warning"><i class='bx bx-rocket'></i>
                        Se connecter</button>
                    </a>
                </span>
            </div> -->
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

        <!-- MAIN/FORM -->
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form action="formPHP.php" method="POST">
                    <h1>S'inscrire</h1>
                    <?php
                        if (isset($_GET ["pasenregistre"])) echo "Erreur : Pas enregistré.";
                        if (isset($_GET ["emailnonvalide"])) echo "Cette adresse e-mail est non valide.";
                        if (isset($_GET ["pseudoconnu"])){
                            echo 'Ce pseudo est déjà utilisé. <input type = "submit" name = "oublimdp" value = "Mot de passe oublié ?" />';};
                        if (isset($_GET ["emailconnu"])){
                            echo 'Cet e-mail est déjà utilisé. <input type = "submit" name = "oublimdp" value = "Mot de passe oublié ?" />';};
                        if (isset($_GET ["ok"])){
                            echo 'Inscription réussie !';
                        }
                    ?>

                    <!-- <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span> -->
                    <input type="text" placeholder="Pseudo" name="pseudo" />
                    <input type="email" placeholder="Email" name="email" />
                    <input type="text" placeholder="Nom" name="nom" />
                    <input type="text" placeholder="Prénom" name="prenom" />
                    <input type="date" name="dateDeNaissance" />
                    <input type="password" placeholder="Mot de passe" name="motDePasse"/>
                    <button name="inscription" type="submit" value="inscription">S'inscrire</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form action="formPHP.php" method="POST">
                    <h1>Se connecter</h1>
                    <?php
                        if (isset($_GET ["invalide"])){
                        echo "Votre mot de passe ou votre identifiant est invalide ! ";
                        };
                    ?>
                    <!-- <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div> 
                    <span>or use your account</span> -->
                    <input type="text" placeholder="Pseudo" name="pseudo" />
                    <input type="password" placeholder="Mot de passe" name="motDePasse" />
                    <a href="#">Mot de passe oublié ?</a>
                    <button name="connexion" type="submit" value="connexion">Se connecter</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Bon retour parmi nous, voyageur de l'espace !</h1>
                        <p>Pour rester en contact avec nos satellites connecte toi avec tes informations personnelles</p>
                        <button class="ghost" id="signIn">Se connecter</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Bien le bonjour, alien !</h1>
                        <p>Enregistre toi pour débuter ton voyage à nos côtés</p>
                        <button class="ghost" id="signUp">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MAIN -->

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
        <script src="src/js/form.js"></script>
        <!-- JAVASCRIPT -->
      
    </body>
    <!-- BODY // CONTENU DU SITE -->

</html>