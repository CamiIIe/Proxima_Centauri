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
        $Host="localhost"; // nom du serveur
        $User="root";//nom de l'utilisateur de la BD
        $Passwd=""; // mot de passe de l'utilisateur
        $BD="proxima"; // nom de la base de données
        $bdd =  new PDO('mysql:host=localhost;dbname=proxima;charset=utf8', 'root', '');
        
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
