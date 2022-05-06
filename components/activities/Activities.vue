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
        <h4 v-if="lstActivitiesPerYearAndMonths.length === 0">Aucune activité à venir</h4>
        <div class="per-month" v-for="(year, j) in lstActivitiesPerYearAndMonths" :key="j">
            <div v-for="(month, g) in year.activitiesPerMonth" :key="g">
                <h4>{{month.month.label}} - {{year.year}}</h4>
                <div class="activity" :class="{'game' : a.is_match}" v-for="(a, i) in month.lstActivities" :key="i" @click="showDetailsActivity(a)">
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
        lstActivitiesPerYearAndMonths(){
            let activitiesPerYear = [];
            const now = DateService.getCurrentDateWithoutTime();

            this.activities.forEach(activity => {
                const dateCurrentActivity = new Date(activity.date_activite);
                const currentYear = DateService.getYear(dateCurrentActivity);

                if(activitiesPerYear.find(act => act.year === currentYear)){
                    return;
                }
                
                let activitiesPerMonth = [];
                for(let j = 0; j < this.activities.length; j++){
                    const dateCurrentActivityPerMonth = new Date(this.activities[j].date_activite);
                    const currentMonth = DateService.getMonth(dateCurrentActivityPerMonth, LANGUE_DEFAULT);

                    if(activitiesPerMonth.find(act => act.month.month === currentMonth.month)){
                        break;
                    }

                    let lstActivities = [];
                    for(let i = 0; i < this.activities.length; i++){
                        const dateActivity = new Date(this.activities[i].date_activite);
                        const activityMonth = DateService.getMonth(dateActivity, LANGUE_DEFAULT);
                        const activityYear = DateService.getYear(dateActivity);

                        const conditionFilter = this.filter === FILTER_ACTIVITY.UPCOMING ? 
                                dateActivity >= now : dateActivity <= now;

                        if(conditionFilter && currentMonth.month === activityMonth.month && currentYear === activityYear){
                            lstActivities.push(this.activities[i]);
                        }
                    }       

                    if(lstActivities.length > 0){
                        lstActivities.sort((a,b)=>DateService.getDay(new Date(b.date_activite))-DateService.getDay(new Date(a.date_activite)));
                        activitiesPerMonth.push({month:currentMonth, lstActivities});
                    }
                }

                activitiesPerMonth.sort((a,b)=>b.month.month-a.month.month);
                activitiesPerYear.push({year:currentYear, activitiesPerMonth});
            });
            
            return activitiesPerYear.sort((a,b)=>b.year-a.year);
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