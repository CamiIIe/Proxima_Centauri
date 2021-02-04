
<!DOCTYPE html>
<html>

    <!-- HEAD -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
        <title>Informations Personnelles</title>

        <!-- CSS -->
        <link rel="stylesheet" href="src/css/bootstrap.min.css"> <!-- CSS BOOTSTRAP -->
        <link rel="stylesheet" href="src/css/style.css">         <!-- CSS PRINCIPAL -->
        <link rel="stylesheet" href="src/css/header_navbar.css"> <!-- CSS HEADER ET SIDENAVBAR -->
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
                        <a href="not_finished.html" class="nav__link">
                            <i class='bx bxs-star-half nav__icon' ></i>
                            <span class="nav__name">Memory Stellaire</span>
                        </a>
                        
                        <!-- LOGO / NOM / LIEN VERS "VISE LA LUNE" -->
                        <a href="not_finished.html" class="nav__link">
                            <i class='bx bxs-moon nav__icon' ></i>
                            <span class="nav__name">Vise la Lune</span>
                        </a>

                        <!-- LOGO / NOM / LIEN VERS "PLANETE AUX COULEURS" -->
                        <a href="not_finished.html" class="nav__link">
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

        <!-- Tableau Info_perso -->


        <!-- <br><br> -->
        
        <!--Titre Informations Personnelles -->
            <b><img src="src/img/icones/png/titre_infos_perso_SF.png" class="img-fluid" alt =""></b>
        <!--Titre Informations Personnelles -->
        
        
        <br> 
        <div class="Tableau_infos">
        <?php if ( empty($_SESSION) ) { session_start(); }
            echo "<table class='table table-bordered  w-50 tb'>
                <tr>
                    <th>Nom</th>
                    <th>".$_SESSION["nom"]."</th>
                </tr>
                <tr>
                    <th>Prénom</th>
                    <th>".$_SESSION["prenom"]."</th>
                </tr>
                <tr>
                    <th>Date de naissance</th>
                    <th>".$_SESSION["dateDeNaissance"]."</th>
                </tr>
                <tr>
                    <th>Adresse Mail</th>
                    <th>".$_SESSION["email"]."</th>
                </tr>
                <tr>
                    <th>Pseudo</th>
                    <th>".$_SESSION["pseudo"]."</th>
                </tr>
                <tr>
                    <th>Niveau</th>
                    <th>7</th>
                </tr>
                <tr>
                    <th>Date d'inscription</th>
                    <th>".$_SESSION["dateInscription"]."</th>
                </tr>
            </table>";
            ?>
        </div>  
        
        <!-- Tableau Info_perso -->

        

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




