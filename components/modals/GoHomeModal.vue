<template>
    <div class="modal-go-home modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Vous quittez déjà?</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
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
import {mapMutations} from 'vuex';
export default {
    methods: {
        goHome () {
            this.hide();
            this.$router.push('/');

            //init all stores
            this.setCurrentState('informations');
            this.setSeance({});
            this.setAllStepsNotCompleted();
            this.setListExercices([]);

            //supprimer le local storage de la session
            localStorage.removeItem('fromDesigner');
            localStorage.removeItem('seanceLocale');
        },
        hide () {
            this.$modal.hide('go-home-modal');
        },
        ...mapMutations({setCurrentState:'seance/setCurrentState', setSeance:'seance/setSeance', 
            setListExercices:'seance/setListExercices', setAllStepsNotCompleted : 'seance/setAllStepsNotCompleted'})
    },
    mount () {
    }
}
</script>