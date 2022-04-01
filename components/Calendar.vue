<template>
    <div class="calendar">
        <div class="month">
            <div class="header-month">
                <div></div>
                <div class="infos-month">{{currentMonth.label}} {{currentYear}}</div>
                <div></div>
            </div>
            <div class="days-of-week">
                <div class="day-of-week" v-for="day in daysOfWeek" :key="day.day+100">
                    {{day.abbreviationSmall}}
                </div>
            </div>
            <div class="days-of-month">
                <div class="day-of-month" :class="day.class" v-for="(day, index) in daysOfMonth" :key="index">
                    <div class="number">{{day.number}}</div>
                    <div class="seances" v-if="day.seances">
                        <div class="seance" v-for="(seance, index) in day.seances" :key="index+10" @click="showDetailsActivity(seance)">
                            {{seance.name}} ({{seance.heure}})
                        </div>
                    </div>
                    <div class="matchs" v-if="day.matchs">
                        <div class="match" v-for="(match, index) in day.matchs" :key="index+10" @click="showDetailsActivity(match)">
                            {{match.name}} ({{match.heure}})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DateService from '../static/services/DateService';
const DEFAULT_LANG = 'fr';
export default {
    props:['seances', 'matchs'],
    data(){
        return{
            months:[],
            daysOfWeek:[],
            daysOfMonth:[],
            currentMonth:{},
            currentYear:0,
            currentDayOfWeek:0,
            classFirstDayOfWeek:''
        }
    },
    methods:{
        showDetailsActivity(activity){
            this.$router.push(`/dashboard/teams/activities/${activity.id}`);
        },
    },
    mounted(){
        const now = new Date();

        this.months = DateService.getMonthsOfYear(DEFAULT_LANG);
        this.daysOfWeek = DateService.getDaysOfWeek(DEFAULT_LANG);
        this.currentMonth = DateService.getMonth(now, DEFAULT_LANG);
        this.currentYear = now.getFullYear();
        this.currentDayOfWeek = now.getDay();
        this.classFirstDayOfWeek = `first-day-${this.currentDayOfWeek}`;

        const seancesMonth = this.seances.filter(seance => new Date(seance.date_activite).getMonth() === this.currentMonth.month);
        const gamesMonth = this.matchs.filter(match => new Date(match.date_activite).getMonth() === this.currentMonth.month);

        const daysInCurrentMonth = DateService.getDaysInCurrentMonth();
        for(let i=0;i<daysInCurrentMonth;i++){
            const seances = seancesMonth.filter(seance => new Date(seance.date_activite).getDate() === i+1);
            const matchs = gamesMonth.filter(match => new Date(match.date_activite).getDate() === i+1);
            this.daysOfMonth.push({number:i+1, class: i === 0 ? this.classFirstDayOfWeek : '',  seances, matchs});
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';
.calendar{
    .month{
        font-family: $font-family-text;
        .header-month{
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            .infos-month{
                text-align: center;
                @include font-m-bold;
            }
        }
        .days-of-week{
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap:2px;

            .day-of-week{
                border:1px solid #E9E9E9;
                background-color: #E9E9E9;
                text-align: center;
                @include font-s-bold;
                padding: 5px;
            }
        }

        .days-of-month{
            margin-top: 5px;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap:2px;
            overflow-y: auto;

            .day-of-month{
                padding: 5px;
                min-height: 80px;
                border:1px solid #E9E9E9;
                position: relative;
                @include font-s;
                padding-top: 15px;

                &:hover{
                    background-color: $color-blue-blackground-clair;
                }

                .number{
                    position: absolute;
                    top:5px;
                    right: 5px;
                }

                .seance{
                    margin-top: 5px;
                    background-color: $color-blue;
                    text-align: center;
                    @include font-s;
                    color:$color-white-fonts;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }

                .match{
                    margin-top: 5px;
                    background-color: #22C77B;
                    text-align: center;
                    @include font-s;
                    color:$color-white-fonts;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }

                &.first-day-1{
                    grid-column-start: 2;
                }
                &.first-day-2{
                    grid-column-start: 3;
                }
                &.first-day-3{
                    grid-column-start: 4;
                }
                &.first-day-4{
                    grid-column-start: 5;
                }
                &.first-day-5{
                    grid-column-start: 6;
                }
                &.first-day-6{
                    grid-column-start: 7;
                }
                &.first-day-7{
                    grid-column-start: 1;
                }
            }
        }
    }
}

</style>