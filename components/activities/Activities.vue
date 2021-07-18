<template>
    <div class="option-content list-activities">
        <h4>{{titre}}</h4>
        <div class="activity" :class="{'game' : a.is_match}" v-for="(a, i) in activities" :key="i">
            <div class="details-activity">
                <span class="list-point"></span>
                <span class="link-details" @click="showDetailsActivity(a)">
                    <span class="date">{{a.date_activite}}</span> -
                    <span class="name">{{a.name}}</span> 
                    <span class="adversaire" v-if="a.is_match">- vs <span class="name_adversaire">{{a.adversaire}}</span></span> - 
                    <span class="date">{{a.heure}}</span>
                </span>
            </div>
            <div class="actions-activity">
                <div class="action-item" title="Ajoutez une note">
                    <span @click="addNote(a)"><font-awesome-icon :icon="['fas', 'comment']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une statistiques pour un joueur" v-if="a.is_match">
                    <span @click="addStatistique(a)"><font-awesome-icon :icon="['fas', 'user-clock']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une séance" v-if="!a.is_match">
                    <span @click="addSeance(a)"><font-awesome-icon :icon="['fas', 'clipboard']"/></span>
                </div>
                <div class="action-item" title="Ajoutez une aligneement" v-if="a.is_match">
                    <span @click="addAlignement(a)"><font-awesome-icon :icon="['fas', 'users']"/></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ActivityDetailsModalVue from '../../components/modals/teams/ActivityDetailsModal.vue';
import AddAlignementModalVue from '../modals/teams/AddAlignementModal.vue';
import AddNoteModalVue from '../modals/teams/AddNoteModal.vue';
export default {
    props:['activities', 'titre'],
    methods:{
        showDetailsActivity(activity){
            this.$modal.show(
                ActivityDetailsModalVue,
                {'activity':activity},
                {name : 'modal-activity-details', classes:['modal-top']}
            );
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
                {'activity':activity},
                {name : 'modal-add-alignement', classes:['modal-top']}
            );
        }
    }
}
</script>