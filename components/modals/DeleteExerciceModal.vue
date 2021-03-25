<template>
    <div class="modal-delete-confirm modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Suppression de l'exercice</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <p>{{title}}</p>
            <p class="question">Voulez-vous vraiment supprimer l'exercice?</p>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default-ghost" @click="hide()">Non</button>
                <button class="btn btn-default" @click="remove()">Oui</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['idExercice', 'title', 'index'],
    methods: {
        async remove () {
            try{
                
                await this.$axios.$delete(`/api/exercices/${this.idExercice}`);
                
                //delete storage variables
                localStorage.removeItem('exercices');
                this.hide();
                this.$root.$emit('exercice-deleted');
            }catch(err){
                console.log(err)
            }
        },
        hide () {
            this.$modal.hide('delete-exercice-modal');
        },
    }
}
</script>