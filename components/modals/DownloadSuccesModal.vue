<template>
    <div class="modal-download-succes modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Votre exercice a été télechargé ✔️</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <p class="thnks">Merci d'avoir utilisé ESsoccercoach Designer pour créer votre exercice!</p>      
            <DonateBouton/>
            <div class="reseaux-sociaux">
                <div class="image-reseau">
                    <img src="@/assets/images/icons/social-media.svg"/>
                </div>
                <social-media/>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <a @click="goHome()" class="link">Retournez à l'accueil</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goHome () {
            this.hide();
            location.href = "/";
        },
        hide () {
            this.$modal.hide('download-succes-modal');
        },
    },
}
</script>
