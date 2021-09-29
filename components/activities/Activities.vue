<template>
    <div class="option-content list-activities">
        <div class="filter-activities">
            <div class="filter" :class="{'actif':this.filter === 'upcoming'}" @click="setFilter('upcoming')">
                À venir
            </div> 
            <div class="filter" :class="{'actif':this.filter === 'past'}" @click="setFilter('past')">
                Passées
            </div> 
        </div> 
        <h4 v-if="lstActivitiesPerMonth.length === 0">Aucune activité à venir</h4>
        <div class="per-month" v-for="(month, j) in lstActivitiesPerMonth" :key="j">
            <h4>{{month.month.label}}</h4>
            <div class="activity" :class="{'game' : a.is_match}" v-for="(a, i) in month.activities" :key="i" @click="showDetailsActivity(a)">
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
    </div>
</template>
<script>
import AddNoteModalVue from '../modals/teams/AddNoteModal.vue';
import DateService from '../../static/services/DateService';

const FILTER_ACTIVITY = {
    UPCOMING:'upcoming',
    PAST:'past'
};

const LANGUE_DEFAULT = 'fr';

export default {
    props:['activities', 'titre', 'players'],
    data(){
        return{
            filter:FILTER_ACTIVITY.UPCOMING
        }
    },
    computed:{
        lstActivitiesPerMonth(){
            let activitiesPerMonth = [];
            const now = new Date();

            this.activities.forEach(activity => {
                const dateCurrentActivity = new Date(activity.date_activite);
                const currentMonth = DateService.getMonth(dateCurrentActivity, LANGUE_DEFAULT);
                let activities = [];

                if(!activitiesPerMonth.find(act => act.month.month === currentMonth.month)){
                    for(let j = 0; j < this.activities.length; j++){
                        const dateActivity = new Date(this.activities[j].date_activite);
                        const activityMonth = DateService.getMonth(dateActivity, LANGUE_DEFAULT);

                        const conditionFilter = this.filter === FILTER_ACTIVITY.UPCOMING ? 
                                dateActivity >= now : dateActivity <= now;

                        if(conditionFilter && currentMonth.month === activityMonth.month){
                            activities.push(this.activities[j]);
                        }
                    }

                    if(activities.length > 0){
                        activities.sort((a,b)=>DateService.getDay(new Date(b.date_activite))-DateService.getDay(new Date(a.date_activite)));
                        activitiesPerMonth.push({month:currentMonth, activities});
                    }
                }
            });
            
            return activitiesPerMonth.sort((a,b)=>b.month.month-a.month.month);
        }
    },
    methods:{
        setFilter(filter){
            this.filter = filter;
        },
        getDayLabel(date){
            date = new Date(date);
            return DateService.getDay(date);
        },
        getDayOfWeek(date){
            date = new Date(date);
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
        }
    }
}
</script>