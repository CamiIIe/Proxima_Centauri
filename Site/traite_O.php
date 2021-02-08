<!DOCTYPE html>
<!--
Traitement du formulaire d'oubli de mot de passe
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        //Connexion à la Base de Données
        $host = "mysql-proximacentauri.alwaysdata.net"; // nom du serveur
        $user = "226279"; //nom de l'utilisateur de la BD
        $passwd = "proxi@123ma"; // mot de passe de l'utilisateur
        $BD = "proximacentauri_bd"; // nom de la base de données
        $bd = new PDO('mysql:host=mysql-proximacentauri.alwaysdata.net;dbname=proximacentauri_bd', '226279', 'proxi@123ma');
        
        if(isset($_POST["connexion"])){
            header("Location:form.php");
        }

        //Vérification mail
        $reponse = $bdd->prepare('SELECT email FROM compte WHERE email=:email');
        $reponse->execute(array('email'=>$_POST["emailo"]));
        while ($donnees = $reponse->fetch()){
            $login=$donnees['email'];}
            
        if (isset ($_POST['valider'])){
            if(strcmp($_POST["emailo"], $login)==0 ){//pour comparer deux chaînes
                //Envoi du mail de réinitialisation
                mail($login, 'Oubli mdp', 'Lien pour réinitialiser son mot de passe');
                header("Location: oubliMdp.php?envoye=1");
        }
        else{
            header("Location: oubliMdp.php?inexistant=1");
        }}
          

        ?>
    </body>
</html>
