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
import {mapState, mapMutations} from 'vuex';
export default {
    props:['idExercice', 'title', 'index'],
    computed: {
        ...mapState(["exercices"])
    },
    methods: {
        async remove () {
            try{
                await this.$axios.$delete(`/api/exercices/${this.idExercice}`);
                this.removeExercice(index);
                
                 //save exercices in localstorage
                const exercicesParsed = JSON.stringify(this.exercices);
                localStorage.setItem('exercices', exercicesParsed);
                this.hide();
            }catch(err){
                console.log(err)
            }
        },
        hide () {
            this.$modal.hide('delete-exercice-modal');
        },
        ...mapMutations({removeExercice:'removeExercice'})
    },
    mount () {
        console.log(this.idExercice + ' index ' + this.index)
    }
}
</script>