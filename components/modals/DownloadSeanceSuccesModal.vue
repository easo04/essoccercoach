<template>
    <div class="modal-download-succes modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Votre séance d'entrainement a été télechargée ✔️</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <p class="thnks">Merci d'avoir utilisé ESsoccercoach pour créer votre séance!</p> 
            <SendEmailInput/>
            <div class="reseaux-sociaux">
                <p>Suivez-nous sur les réseaux sociaux</p>
                <div class="liste-reseaux">
                    <a class="lien"><font-awesome-icon :icon="['fab', 'instagram']"/></a>
                    <a class="lien"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
                    <a class="lien"><font-awesome-icon :icon="['fab', 'youtube-square']"/></a>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <a class="link" @click="newSeance()">Créez une séance d'entrainement</a>
                <button @click="goHome()" class="btn btn-default">Retournez à l'accueil</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goHome () {
            this.hide();

            //supprimer le local storage de la session
            localStorage.removeItem('fromDesigner');
            localStorage.removeItem('seanceLocale');

            //go to home
            location.href = "/";
        },
        hide () {
            this.$modal.hide('download-seance-succes-modal');
        },
        newSeance(){

            //supprimer le local storage de la session
            localStorage.removeItem('fromDesigner');
            localStorage.removeItem('seanceLocale');

            this.$root.$emit('newSeance');

            this.hide();
        },
    },
}
</script>
