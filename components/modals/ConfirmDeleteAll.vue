<template>
    <div class="modal-go-home modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Tout supprimer</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <p>Tous les éléments ajoutés sur le terrain seront supprimés.</p> 
            <p class="question">Voulez-vous vraiment tout supprimer?</p>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default-ghost" @click="hide()">Non</button>
                <button class="btn btn-default" @click="deleteAll()">Oui</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        deleteAll () {
            this.hide();
            this.$root.$emit('deleteAll');
        },
        hide () {
            this.$modal.hide('delete-all-modal');
        }
    },
    mount () {
    }
}
</script>