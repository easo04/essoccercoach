<template>
    <div class="dashboard teams-page" @click="selectPage($event)">
        <btn-selection label="Équipes">
            <template v-slot:content-items>
                <div class="equipe" v-for="(t, index) in teams" :key="index" @click="changeTeam(t)">{{t.name}}</div>
                <div class="equipe" v-if="canCreateTeam" @click="addNewTeam()">Nouveau +</div>
            </template>
        </btn-selection>
        <div class="content-empty-team" v-if="!teamSelected">
            <div class="empty-team">
                Aucune équipe trouvée
            </div>
        </div>
        <div class="content-team" v-else>
            <div class="infos-team">
                <h2>{{teamSelected.name}}</h2>
                <h4 class="club" v-if="teamSelected.club">{{teamSelected.club}}</h4>
                <menu-actions>
                    <template v-slot:content-options>
                        <div>Modifier</div>
                        <div>Supprimer</div>
                    </template>
                </menu-actions>
            </div>
            <div class="options-team">
                <div class="option-team" :class="{'active' : optionSelected === 'team'}" @click="setOnglet('team')">Équipe</div>
                <div class="option-team" :class="{'active' : optionSelected === 'activities'}" @click="setOnglet('activities')">Activités</div>
                <div class="option-team" :class="{'active' : optionSelected === 'seances'}" @click="setOnglet('seances')">Séances</div>
                <div class="option-team" :class="{'active' : optionSelected === 'alignements'}" @click="setOnglet('alignements')">Matchs</div>
            </div>
            <div class="options-team-mobile"> 
                <div class="option-team" :class="{'active' : optionSelected === 'team'}" @click="setOnglet('team')" title="Équipe">
                    <div>
                        <font-awesome-icon :icon="['fas', 'users']"/>
                        <div class="label-option">Équipe</div>
                    </div>
                </div>
                <div class="option-team" :class="{'active' : optionSelected === 'activities'}" @click="setOnglet('activities')" title="Activités">
                    <div>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']"/>
                        <div class="label-option">Activités</div>
                    </div>
                </div>
                <div class="option-team" :class="{'active' : optionSelected === 'seances'}" @click="setOnglet('seances')" title="Séances">
                    <div>
                        <font-awesome-icon :icon="['fas', 'clipboard']"/>
                        <div class="label-option">Séances</div>
                    </div>
                </div>
                <div class="option-team" :class="{'active' : optionSelected === 'alignements'}" @click="setOnglet('alignements')" title="Alignements">
                    <div>
                        <font-awesome-icon :icon="['fas', 'user-friends']"/>
                        <div class="label-option">Matchs</div>
                    </div>
                </div>
            </div>
            <div class="content-option-team">
                <div v-if="optionSelected === 'team'">
                    <div class="content-actions" v-if="canAddPlayer">
                        <button class="btn btn-default btn-add-player" @click="addNewPlayer()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
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
                        <button class="btn btn-default btn-add-player" @click="addActivity()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
                    </div>
                    <Activities :activities="teamSelected.activities" :players="teamSelected.players" titre="Activités" @showOptionsActivity="setShowMenuActivity"/>
                </div>
                <div v-if="optionSelected === 'seances'">
                    <Activities :activities="listSeances" titre="Séances" :players="teamSelected.players" @showOptionsActivity="setShowMenuActivity"/>
                </div>
                <div v-if="optionSelected === 'alignements'">
                    <Activities :activities="listMatchs" titre="Matchs" :players="teamSelected.players" @showOptionsActivity="setShowMenuActivity"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import AddActivityModalVue from '../../../components/modals/teams/AddActivityModal.vue';
import AddNewTeamModalVue from '../../../components/modals/teams/AddNewTeamModal.vue';
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
            teamSelected:undefined,
            canCreateTeam:false,
            canAddPlayer:false,
            canAddActivity:false,
            optionSelected:OPTIONS_ONGLET.TEAM,
            currentActivity:undefined,
            showActionsTeam:false
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
            if(!this.teams || this.teams.length === 0){
                this.teams = [];
                const response = await this.$axios.$get('/api/teams/teams/get-summary-teams');

                response.teams.forEach(team => {
                    team.teams.forEach(t=>this.teams.push(t));
                });

                //save teams in localstorage
                const summaryTeamsParsed = JSON.stringify(this.teams);
                localStorage.setItem('summary-teams', summaryTeamsParsed);
            }

            const indexCurretTeam = this.teamSelected 
                ? this.teams.findIndex(t => t.id === this.teamSelected.id) : 0;

            console.log('current index ' + indexCurretTeam)

            this.teamSelected = this.teams[indexCurretTeam] ?? undefined;
            this.canAddPlayer = this.teamSelected?.canAddPlayers  || false;
            this.canAddActivity = this.teamSelected?.canAddActivity || false;


            //save teamSelected in localstorage
            const teamSelectedParsed = JSON.stringify(this.teamSelected);
            localStorage.setItem('current-team', teamSelectedParsed);
        },
        changeTeam(team){
            this.teamSelected = team;
            
            //save teamSelected in localstorage
            const teamSelectedParsed = JSON.stringify(this.teamSelected);
            localStorage.setItem('current-team', teamSelectedParsed);
            this.setShowTeamsList();
        },
        setShowActionsTeam(){
            this.showActionsTeam = !this.showActionsTeam;
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
        addNewTeam(){
            this.setShowTeamsList();
            this.$modal.show(
                AddNewTeamModalVue,
                {},
                {name : 'modal-add-team', classes:['modal-top']}
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
        closeActionsOptions(event){
            if(event.target.id !== 'contentOptions'){
            }
        },
        selectPage(event){
            const action = event.target.nodeName === 'path' ? event.target.nodeName : event.target.id;
            this.$root.$emit('close-all-selects', action);
        }
        
    },
    created(){
    },
    mounted(){ 
        this.getAllTeams();
        
        console.log('reload ' + this.$route.params.reload);

        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            this.canCreateTeam = user.canCreateATeam;
        }

        this.$root.$on('reload-team', ()=>{
            localStorage.removeItem('summary-teams');
            this.getAllTeams();
        })

        this.$root.$on('reload-team-activity', ()=>{
            localStorage.removeItem('summary-teams');
            this.optionSelected = OPTIONS_ONGLET.ACTIVITIES;
            this.getAllTeams();
        })
    }
}
</script>