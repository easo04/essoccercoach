<template>
    <div class="player-details">
        <div class="player-details-header">
            <div class="back" title="Retournez au sommaire"><span @click="back()"><font-awesome-icon :icon="['fas', 'arrow-left']"/></span></div>
            <menu-actions custom-class="menu">
                <template v-slot:content-options>       
                    <div @click="updatePlayer()">Modifier</div>
                    <div @click="deletePlayer()">Supprimer</div>
                </template>
            </menu-actions>
        </div>
        <div class="details-content" v-if="player">
            <div class="details-player">
                <h2>{{player.first_name}} {{player.last_name}}</h2>
                <h3>{{player.poste}}</h3>
            </div>
            <div class="other-infos-player">
                <p>{{textPlayer}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import TeamService from '../../../../../static/services/TeamService';
export default {
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            textPlayer:undefined,
            player:undefined,
            isPlayer:false
        }
    },
    methods: {
        back(){
            history.back();
        },
        async deletePlayer(){

            if(this.isPlayer){
                await this.$axios.delete(`api/players/${this.player.id}`)
            }else{
                await this.$axios.delete(`api/coachs/${this.player.id}`)
            }

            this.$root.$emit('reload-team');
        },
        updatePlayer(){
            let playerModel = this.player;
            playerModel.isPlayer = this.isPlayer;
            /*this.$modal.show(
                UpdatePlayerCoachVue,
                {'player':playerModel},
                {name : 'modal-update-player-coach', classes:['modal-top']}
            );*/
        }
    },
    created () {
    },
    mounted(){
        const team = JSON.parse(localStorage.getItem('current-team'));
        const player = TeamService.getPlayerById(this.$route.params.id, team);

        console.log(player)

        this.player = player.player;
        this.isPlayer = player.isPlayer;

        
        if(this.isPlayer){
            this.textPlayer = this.isPlayer ? 'Joueur' : 'Entraîneur'
        }else{
            this.textPlayer = TeamService.getCoachRoleLabelByCode(this.player.role);
        }
    }
}
</script>