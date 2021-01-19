<template>
        <div class="modal-download-succes modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Votre exercice a été télechargé ✔️</h3></div>
            <div class="close-modal"><span @click="hide()"><i class="fas fa-times"></i></span></div>
        </div>
        <div class="modal-content">
            <p class="thnks">Merci d'avoir utilisé ESsoccercoach Designer pour créez votre exercice!</p> 
            <div class="infolettre" v-if="showInfolettre">
                <p>Abonnez-vous à notre infolettre pour recevoir les dernières 
                    nouveautées: </p>
                <div class="form-group-flex email-send">
                    <input type="email" name="addText" class="form-control" placeholder=" Votre email" v-model="email"/>
                    <button class="btn btn-default" @click="sendEmail()"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
            <div class="infolettre-succes" v-else>
                <p v-if="showSuccesEmailMessage">Votre inscription a été fait avec succès! ✅</p>
            </div>
            <div class="reseaux-sociaux">
                <p>Suivez-nous sur les réseaux sociaux</p>
                <div class="liste-reseaux">
                    <a class="lien"><i class="fab fa-instagram"></i></a>
                    <a class="lien"><i class="fab fa-facebook-square"></i></a>
                    <a class="lien"><i class="fab fa-youtube-square"></i></a>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <a @click="goHome()" class="link">Retournez à l'accueil</a>
                <button class="btn btn-default" @click="hide()">Créez un nouvel exercice</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            email:undefined,
            showInfolettre:true,
            showSuccesEmailMessage:true
        }
    },
    methods: {
        goHome () {
            this.hide();
            location.href = "/";
        },
        hide () {
            this.$modal.hide('download-succes-modal');
        },
        sendEmail(){
            if(this.email){
                const infosUser = {
                    email:this.email,
                    send:true
                };

                //sauvegarder dans le localestorage
                const infosParsed = JSON.stringify(infosUser);
                sessionStorage.setItem('infosUserSend', infosParsed);
                
                this.showInfolettre = false;
                this.showSuccesEmailMessage = true;
            }
        }
    },
    created(){
        const infosUser = JSON.parse(sessionStorage.getItem('infosUserSend'));
        if(infosUser){
            this.showInfolettre = false;
            this.showSuccesEmailMessage = false;
        }
    },
    mount () {
    }
}
</script>
