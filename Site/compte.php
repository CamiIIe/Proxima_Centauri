
<!DOCTYPE html>
<html>

    <!-- HEAD -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
        <title>Mon compte</title>

        <!-- CSS -->
        <link rel="stylesheet" href="src/css/bootstrap.min.css"> <!-- CSS BOOTSTRAP -->
        <link rel="stylesheet" href="src/css/style.css">         <!-- CSS PRINCIPAL -->
        <link rel="stylesheet" href="src/css/header_navbar.css"> <!-- CSS HEADER ET SIDENAVBAR -->
        <link rel="stylesheet" href="src/css/menu_deroulant.css"> <!-- CSS MENU DEROULANT -->
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
        <?php if ( empty($_SESSION) ) { session_start(); } ?>
        
        <!-- HEADER -->
        <header class="header" id="header">
            <div class="header__toggle">
                <i class='bx bx-menu' id="header-toggle"></i>
            </div>

            <!-- Menu déroulant mon compte -->
          <ul class="Menuderoulant">
            <li>
                <a href="infos_perso.php">Mon compte</a>
                    <ul class="sousmenu">
                        <li><a href="statistiques.html">Statistiques</a></li>
                        <li><a href="mes_badges.html">Mes badges</a></li>
                        <li><a href="formPHP.php?deconnexion=1">Déconnexion</a></li>   
                    </ul>
            </li>
          </ul>

            <!-- <div class="btn-group">
                <a type="button" class="btn btn-warning">Mon compte</a>
                <button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item" href="#">Statistiques</a></li>
                    <li><a class="dropdown-item" href="#">Mes badges</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Déconnexion</a></li>
                </ul>
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

        <div class ="container-fluid propos">
            <!-- Icone A propos : Rocket qui part de la Terre / Accès à la page à propos -->
            <a href="statistiques.html">
                <!--
                <img src = "src/img/icones/png/rocket.png"> 
            </a>
        -->

            <a href="infos_perso.html">
               <!--
                <img src = "src/img/icones/png/Heart.png"> 
            </a>
        -->
        </div>

        <!-- MAIN -->
        <div class="container-fluid titre">
            
            <!-- IMAGE PRINCIPALE : GALAXIE / SCHEMA D'ACCES AUX JEUX -->
            <img class="img-responsive" src="src/img/icones/png/galaxieAvecRond.png">
        </div>
        <!-- MAIN -->

        <!-- FOOTER -->
        <footer>
            <!-- Contact - Aide - Confidentialité - About -->
        </footer>
        <!-- FOOTER -->



        <!-- JAVASCRIPT -->
        <script type="text/javascript" src="src/js/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" src="src/js/bootstrap.min.js"></script>
        <script src="src/js/main.js"></script>
        <!-- JAVASCRIPT -->
      
    </body>
    <!-- BODY // CONTENU DU SITE -->

</html>