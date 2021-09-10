<template>
    <div class="option-content list-activities">
        <h4>{{titre}}</h4>
        <div class="activity" :class="{'game' : a.is_match}" v-for="(a, i) in activities" :key="i" @click="showDetailsActivity(a)">
            <div class="date-activity">
                <div>
                    <div class="day">{{getDayLabel(a.date_activite)}}</div>
                    <div class="day-label">{{getDayOfWeek(a.date_activite)}}</div>
                </div>
            </div>
            <div class="details-activity">
                <span class="list-point"></span>
                <span class="link-details">
                    <span class="heure">{{a.heure}}</span>
                </span>
                <div>
                    <span class="name" v-if="!a.is_match">{{a.name}} </span> 
                    <span class="adversaire" v-if="a.is_match">vs <span class="name_adversaire">{{a.adversaire}}</span></span>
                </div>
                <div>
                    <span class="adresse" v-if="a.adresse">{{a.adresse}} </span> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddNoteModalVue from '../modals/teams/AddNoteModal.vue';
import DateService from '../../static/services/DateService';
export default {
    props:['activities', 'titre', 'players'],
    data(){
        return{
        }
    },
    methods:{
        getDayLabel(date){
            date = new Date(date);
            return DateService.getDay(date);
        },
        getDayOfWeek(date){
            date = new Date(date);
            console.log(date)
            return DateService.getDayOfWeek(date, 'fr').abbreviationLarge;
        },
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
            this.$router.push(`/dashboard/teams/activities/${activity.id}/create-alignement`);
        },
        setShowActionsActivity(activity){
            console.log('activity emit' + activity.id)
            this.$emit('showOptionsActivity', activity);
        }
    }
}
</script>