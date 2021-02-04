<!DOCTYPE html>
<!--
Traitement du formulaire de la page de connexion
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        //Connexion à la Base de Données
        $host = "localhost"; // nom du serveur
        $user = "root"; //nom de l'utilisateur de la BD
        $passwd = ""; // mot de passe de l'utilisateur
        $BD = "proxima"; // nom de la base de données
        $bd = new PDO('mysql:host=localhost;dbname=proxima;charset=utf8', 'root', '');
        
        /* CONNEXION */
        if (isset ($_POST['connexion'])){
            //Récupération des données de l'utilisateur à partir de son pseudo
            $pseudo = $_POST['pseudo'];
            $reponse = $bd -> prepare("SELECT * FROM compte WHERE pseudo='$pseudo'");
            $reponse -> execute(array('pseudo'=>$_POST["pseudo"]));
            while ($donnees = $reponse->fetch()){
                $login = $donnees['pseudo']; $pwd=$donnees['motDePasse']; $email=$donnees['email'];
                $nom=$donnees['nom']; $prenom=$donnees['prenom']; $date=$donnees['dateDeNaissance'];
                $dateI=$donnees['dateInscription'];
            }
                
            //Comparaison du pseudo et du mot de passe avec ceux de la base de donnée puis création de la session
                if(strcmp($_POST["pseudo"], $login)==0 & strcmp($_POST["motDePasse"], $pwd)==0){//pour comparer deux chaînes
                    if ( empty($_SESSION) ) { session_start(); }
                    $_SESSION["pseudo"]=$login; $_SESSION["motDePasse"]=$pwd; $_SESSION["email"]=$email;
                    $_SESSION["nom"]=$nom; $_SESSION["prenom"]=$prenom; $_SESSION["dateDeNaissance"]=$date;
                    $_SESSION["dateInscription"]=$dateI;
                    // $der_log=$y."-".$m."-".$d;
                    // $insertion = $bdd->prepare('UPDATE users SET der_log=:der_log WHERE pseudo=:pseudo');
                    // $insertion->execute(array('der_log' => $der_log, 'pseudo' => $pseudo));
                    // $_SESSION["der_log"]=$der_log;

                    //Redirection vers la page d'index avec un compte
                    header("Location: compte.php");
                }
                else{
                    //Redirection vers l'accueil en cas de mot de passe invalide
                    header("Location: form.php?invalide=1");
                    //header("Location: Accueil.php");
                }
        }

            /* INSCRIPTION */
            echo $_POST['inscription'];
            if(isset ($_POST['inscription'])){
                //Récupération des données du formulaire
                $nom=$_POST['nom'];
                $prenom=$_POST['prenom'];
                $email=$_POST['email'];
                $pseudo=$_POST['pseudo'];
                $motDePasse=$_POST['motDePasse'];
                $dateDeNaissance=$_POST['dateDeNaissance'];
                $dateInscription = date('Y-m-d');
                
                
                //Déjà connu
                $econnu = $bd->prepare("SELECT * FROM compte WHERE email='$email'");
                $econnu->execute(array('email'=>$email));
                while ($edonnees = $econnu->fetch()){
                    $loginC=$edonnees['email'];
                }
                $pconnu = $bd->prepare("SELECT * FROM compte WHERE pseudo='$pseudo'");
                $pconnu->execute(array('pseudo'=>$pseudo));
                while ($pdonnees = $pconnu->fetch()){
                    $pseudoC=$pdonnees['pseudo'];
                }
                
                
                if($loginC==$email) echo "Cette adresse e-mail est déjà liée à un compte.";
                else $loginC = null;
                if($pseudoC==$pseudo) echo "Ce pseudo est déjà pris.";
                else $pseudoC = null;
                
                echo "<br>".$loginC." ".$pseudoC;
            
                //Vérification adresse e-mail
                if(filter_var($email, FILTER_VALIDATE_EMAIL)){   
                    //Vérification si email déjà connu dans la base
                    if(!$loginC!=null){
                        //Vérification si pseudo déjà connu dans la base
                        if(!$pseudoC!=null){               
                           //Insertion d'un nouvel utilisateur
                            if (isset ($_POST['email']) && isset ($_POST['pseudo']) && isset ($_POST['motDePasse']) 
                                    && isset ($_POST['nom']) && isset ($_POST['prenom'])){
                                $insertion = $bd->prepare('INSERT INTO compte (email, motDePasse, nom, prenom, pseudo, dateDeNaissance, dateInscription)'
                                        . "VALUES ('$email', '$motDePasse', '$nom', '$prenom', '$pseudo', '$dateDeNaissance', '$dateInscription')");
                                $insertion->execute(array('email' => $email, 'motDePasse'=> $motDePasse, 
                                    'nom' => $nom, 'prenom'=> $prenom, 'pseudo' => $pseudo,
                                    'dateDeNaissance' => $dateDeNaissance, 'dateInscription' => $dateInscription));
                    
                                header('Location: compte.php?ok=1');
                            }
                            else{header('Location: form.php?pasenregistre=1');}
                        }
                        else{header('Location: form.php?pseudoconnu=1');}
                    }
                    else{header('Location: form.php?emailconnu=1');}
                }

                else{header('Location: form.php?emailnonvalide=1');}
            }
        
        //Boutons de la page d'accueil
        // if (isset ($_POST['nveaucpte'])){header("Location: Nouveau.php");}
        // if (isset ($_POST['oublimdp'])){header("Location: OubliMdp.php");}      
               
        //Déconnexion espace membre
        if (isset ($_GET['deconnexion'])){
            session_destroy();
            header("Location: index.html?deconnexion=1");
        } 
        ?>
    </body>
</html>
