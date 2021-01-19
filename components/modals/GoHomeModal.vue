<template>
    <div class="modal-go-home modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Vous quittez déjà?</h3></div>
            <div class="close-modal"><span @click="hide()"><i class="fas fa-times"></i></span></div>
        </div>
        <div class="modal-content">
            <p>Si vous quittez, vous allez perdre toutes vos modifications.</p> 
            <p class="question">Voulez-vous vraiment quitter?</p>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default-ghost" @click="hide()">Non</button>
                <button class="btn btn-default" @click="goHome()">Oui</button>
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
            this.$modal.hide('go-home-modal');
        }
    },
    mount () {
    }
}
</script>