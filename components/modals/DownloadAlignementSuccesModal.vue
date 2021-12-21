<template>
    <div class="modal-download-succes modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Votre alignement a été télechargée ✔️</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <p class="thnks">Merci d'avoir utilisé ESsoccercoach pour créer votre alignement!</p> 
            <SendEmailInput/>
            <DonateBouton/>
            <div class="reseaux-sociaux">
                <p>Suivez-nous sur les réseaux sociaux</p>
                <ListReseaux/>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <a class="link" @click="hide()">Modifiez l'alignement</a>
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

            //go to home
            location.href = "/";
        },
        hide () {
            this.$modal.hide('download-alignement-succes-modal');
        },
    }
}
</script>
