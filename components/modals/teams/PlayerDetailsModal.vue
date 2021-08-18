<template>
    <div class="modal-player-details modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
            <menu-actions custom-class="menu">
                <template v-slot:content-options>       
                    <div @click="updatePlayer()">Modifier</div>
                    <div @click="deletePlayer()">Supprimer</div>
                </template>
            </menu-actions>
        </div>
        <div class="modal-content">
            <div class="details-player">
                <h2>{{player.first_name}} {{player.last_name}}</h2>
                <h3>{{player.poste}}</h3>
            </div>
            <div class="other-infos-player">
                <p>{{textPlayer}}</p>
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
</template>
<script>
import TeamService from '../../../static/services/TeamService';
import UpdatePlayerCoachVue from './UpdatePlayerCoach.vue';
export default {
    props:['player', 'isPlayer'],
    data(){
        return{
            textPlayer:undefined,
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-player-details');
        },
        async deletePlayer(){

            if(this.isPlayer){
                await this.$axios.delete(`api/players/${this.player.id}`)
            }else{
                await this.$axios.delete(`api/coachs/${this.player.id}`)
            }

            this.$root.$emit('reload-team');
            this.hide();
        },
        updatePlayer(){
            let playerModel = this.player;
            playerModel.isPlayer = this.isPlayer;
            this.hide();
            this.$modal.show(
                UpdatePlayerCoachVue,
                {'player':playerModel},
                {name : 'modal-update-player-coach', classes:['modal-top']}
            );
        }
    },
    created () {
        if(this.isPlayer){
            this.textPlayer = this.isPlayer ? 'Joueur' : 'Entraîneur'
        }else{
            this.textPlayer = TeamService.getCoachRoleLabelByCode(this.player.role);
        }
        
    }
}
</script>