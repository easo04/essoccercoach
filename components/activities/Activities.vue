<template>
    <div class="option-content list-activities">
        <h4>{{titre}}</h4>
        <div class="activity" :class="{'game' : a.is_match}" v-for="(a, i) in activities" :key="i" @click="showDetailsActivity(a)">
            <div class="details-activity">
                <span class="list-point"></span>
                <span class="link-details">
                    <span class="date">{{a.date_activite}}</span> -
                    <span class="name" v-if="!a.is_match">{{a.name}} </span> 
                    <span class="adversaire" v-if="a.is_match">vs <span class="name_adversaire">{{a.adversaire}}</span></span> -
                    <span class="date">{{a.heure}}</span>
                </span>
            </div>
            <!--<div class="actions-activity">
                <div class="action-item" title="Ajoutez une note">
                    <span @click="addNote(a)"><font-awesome-icon :icon="['fas', 'comment']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une statistiques pour un joueur" v-if="a.is_match">
                    <span @click="addStatistique(a)"><font-awesome-icon :icon="['fas', 'user-clock']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une séance" v-if="!a.is_match">
                    <span @click="addSeance(a)"><font-awesome-icon :icon="['fas', 'clipboard']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une aligneement" v-if="a.is_match && players.length > 0">
                    <span @click="addAlignement(a)"><font-awesome-icon :icon="['fas', 'users']"/></span>
                </div>
            </div>
            <div class="actions-activity-mobile">
                <span class="actions" @click="setShowActionsActivity(a)"><font-awesome-icon :icon="['fas', 'ellipsis-v']"/></span>
            </div>-->
        </div>
    </div>
</template>
<script>
import AddAlignementModalVue from '../modals/teams/AddAlignementModal.vue';
import AddNoteModalVue from '../modals/teams/AddNoteModal.vue';
export default {
    props:['activities', 'titre', 'players'],
    data(){
        return{
        }
    },
    methods:{
        showDetailsActivity(activity){
            this.$router.push(`/dashboard/teams/activities/${activity.id}`);
        },
        addNote(activity){
            this.$modal.show(
                AddNoteModalVue,
                {'activity':activity},
                {name : 'modal-add-note', classes:['modal-top']}
            );
        },
        addAlignement(activity){
            this.$modal.show(
                AddAlignementModalVue,
                {'activity':activity, 'players' : this.players},
                {name : 'modal-add-alignement', classes:['modal-top']}
            );
        },
        setShowActionsActivity(activity){
            console.log('activity emit' + activity.id)
            this.$emit('showOptionsActivity', activity);
        }
    }
}
</script>