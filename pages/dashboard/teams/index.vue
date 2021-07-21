<template>
    <div class="dashboard teams-page">

        <div class="addNewTeam">
            <button class="btn btn-default" @click="setShowTeamsList()">Équipes <font-awesome-icon :icon="['fas', 'sort-down']"/></button>
            <div class="select-teams selects" v-if="showTeamsList">
                <div class="equipe" v-for="(t, index) in teams" :key="index" @click="changeTeam(t)">{{t.name}}</div>
                <div class="equipe" v-if="canCreateTeam">Nouveau +</div>
            </div>
        </div>
        <h2>{{teamSelected.name}}</h2>
        <h4 class="club" v-if="teamSelected.club">{{teamSelected.club}}</h4>
        <div class="options-team">
            <div class="option-team" :class="{'active' : optionSelected === 'team'}" @click="setOnglet('team')">Équipe</div>
            <div class="option-team" :class="{'active' : optionSelected === 'activities'}" @click="setOnglet('activities')">Activités</div>
            <div class="option-team" :class="{'active' : optionSelected === 'seances'}" @click="setOnglet('seances')">Séances</div>
            <div class="option-team" :class="{'active' : optionSelected === 'alignements'}" @click="setOnglet('alignements')">Matchs</div>
        </div>
        <div class="options-team-mobile">
            <div class="option-team" :class="{'active' : optionSelected === 'team'}" @click="setOnglet('team')" title="Équipe"><font-awesome-icon :icon="['fas', 'users']"/></div>
            <div class="option-team" :class="{'active' : optionSelected === 'activities'}" @click="setOnglet('activities')" title="Activités"><font-awesome-icon :icon="['fas', 'calendar-alt']"/></div>
            <div class="option-team" :class="{'active' : optionSelected === 'seances'}" @click="setOnglet('seances')" title="Séances"><font-awesome-icon :icon="['fas', 'clipboard']"/></div>
            <div class="option-team" :class="{'active' : optionSelected === 'alignements'}" @click="setOnglet('alignements')" title="Alignements"><font-awesome-icon :icon="['fas', 'user-friends']"/></div>
        </div>
        <div class="content-option-team">
            <div v-if="optionSelected === 'team'">
                <div class="content-actions" v-if="canAddPlayer">
                    <button class="btn btn-default btn-add-player" @click="addNewPlayer()">Nouveau +</button>
                </div>
                <div class="option-content list-players">
                    <h4>Joueurs</h4>
                    <div class="player" v-for="(p, i) in teamSelected.players" :key="i" @click="showPlayerDetails(p, true)">
                        <div class="infos-player">
                            {{p.first_name}} {{p.last_name}} <span class="role">({{getPlayerPosition(p.poste)}})</span>
                        </div>
                    </div>
                </div>
                <div class="option-content list-coachs">
                    <h4>Entraîneurs</h4>
                    <div class="coach" v-for="(c, i) in teamSelected.coachs" :key="i" @click="showPlayerDetails(c, false)">
                        {{c.first_name}} {{c.last_name}} <span class="role">({{getCoachRole(c.role)}})</span>
                    </div>
                </div>
            </div>
            <div v-if="optionSelected === 'activities'">
                <div class="content-actions" v-if="canAddActivity">
                    <button class="btn btn-default btn-add-player" @click="addActivity()">Nouveau +</button>
                </div>
                <Activities :activities="teamSelected.activities" :players="teamSelected.players" titre="Activités"/>
            </div>
            <div v-if="optionSelected === 'seances'">
                <Activities :activities="listSeances" titre="Séances" :players="teamSelected.players"/>
            </div>
            <div v-if="optionSelected === 'alignements'">
                <Activities :activities="listMatchs" titre="Matchs" :players="teamSelected.players"/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import AddActivityModalVue from '../../../components/modals/teams/AddActivityModal.vue';
import AddPlayerCoachVue from '../../../components/modals/teams/AddPlayerCoach.vue';
import PlayerDetailsMdalVue from '../../../components/modals/teams/PlayerDetailsModal.vue';
import TeamService from '../../../static/services/TeamService'
const OPTIONS_ONGLET = {
    TEAM:'team',
    ACTIVITIES:'activities'
}
export default {
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            teams:[],
            teamSelected:{},
            showTeamsList:false,
            canCreateTeam:false,
            canAddPlayer:false,
            canAddActivity:false,
            optionSelected:OPTIONS_ONGLET.TEAM
        }
    },
    computed: {
        listSeances(){
            return this.teamSelected.activities.filter(t=>!t.is_match);
        },
        listMatchs(){
            return this.teamSelected.activities.filter(t=>t.is_match);
        },
        ...mapState(["auth"])
    },
    methods:{
        async getAllTeams(){
            this.teams = JSON.parse(localStorage.getItem('summary-teams'));
            if(!this.teams){
                this.teams = [];
                let response = await this.$axios.$get('/api/teams/teams/get-summary-teams');

                response.teams.forEach(team => {
                    team.teams.forEach(t=>this.teams.push(t));
                });

                //save teams in localstorage
                const summaryTeamsParsed = JSON.stringify(this.teams);
                localStorage.setItem('summary-teams', summaryTeamsParsed);
            }

            this.teamSelected = this.teams[0] !== undefined ? this.teams[0] : {}
            this.canAddPlayer = this.teamSelected.canAddPlayers;
            this.canAddActivity = this.teamSelected.canAddActivity;
        },
        changeTeam(team){
            this.teamSelected = team
        },
        setShowTeamsList(){
            this.showTeamsList = !this.showTeamsList
        },
        setOnglet(onglet){
            this.optionSelected = onglet;
        },
        getCoachRole(role){
            return TeamService.getCoachRoleLabelByCode(role)
        },
        getPlayerPosition(position){
            return TeamService.getPlayerPositionByCode(position)
        },
        addNewPlayer(){
            this.$modal.show(
                AddPlayerCoachVue,
                {'team':this.teamSelected.id},
                {name : 'modal-add-player-coach', classes:['modal-top']}
            );
        },
        addActivity(){
            this.$modal.show(
                AddActivityModalVue,
                {'team':this.teamSelected.id},
                {name : 'modal-add-activity', classes:['modal-top']}
            );
        },
        showPlayerDetails(player, isPlayer){
            this.$modal.show(
                PlayerDetailsMdalVue,
                {'player':player, 'isPlayer': isPlayer},
                {name : 'modal-player-details', classes:['modal-top']}
            );
        },      
    },
    mounted(){
        this.canCreateTeam = this.auth.user.canCreateATeam;
        this.getAllTeams();

        this.$root.$on('reload-team', ()=>{
            localStorage.removeItem('summary-teams');
            this.getAllTeams();
            console.log('reload')
        })

        this.$root.$on('reload-team-activity', ()=>{
            localStorage.removeItem('summary-teams');
            this.optionSelected = OPTIONS_ONGLET.ACTIVITIES;
            this.getAllTeams();
            console.log('reload-activity')
        })
    }
}
</script>