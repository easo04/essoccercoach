<template>
    <div class="modal-add-player-coach update-player-modal modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
            <div class="close-modal"></div>
        </div>
        <div class="modal-content">
            <div class="form-group">
                <label class="label-control" for="last_name">Nom (Obligatoire): </label>
                <input type="text" name="last_name" class="form-control" v-model="playerModel.last_name" autocomplete="off"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="first_name">Prénom (Obligatoire): </label>
                <input type="text" name="first_name" class="form-control" v-model="playerModel.first_name" autocomplete="off"/>
            </div>
            <div class="form-group" v-if="playerModel.isPlayer">
                <label class="label-control" for="position">Position (Obligatoire): </label>
                <select name="position" class="form-control" v-model="playerModel.poste">
                    <option :value="position.code" v-for="(position, index) in lstPositions" :key="index">
                        {{position.label}}
                    </option>
                </select>
            </div>
            <div class="form-group" v-else>
                <label class="label-control" for="role">Rôle (Obligatoire): </label>
                <select name="role" class="form-control" v-model="playerModel.role">
                    <option :value="role.code" v-for="(role, index) in lstRoles" :key="index">
                        {{role.label}}
                    </option>
                </select>
            </div>
            <div class="form-group" v-if="!playerModel.isPlayer">
                <div class="not-player" title="C'est un administrateur?" v-if="playerModel.admin">              
                    <span class="label">C'est un administrateur?</span><br>
                    <span  @click="setAdmin()" >
                        <font-awesome-icon :icon="['fas', 'toggle-on']"/>
                    </span>
                </div>
                <div class="not-player" title="C'est un administrateur?" v-else>
                    <span class="label">C'est un administrateur?</span><br>
                    <span  @click="setAdmin()">
                        <font-awesome-icon :icon="['fas', 'toggle-off']"/>
                    </span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="updatePlayer()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
    </div>
</template>
<script>
import TeamService from '../../../static/services/TeamService';
export default {
    props:['player'],
    data(){
        return{
            playerModel: this.player,
            lstPositions:TeamService.getListPositions(),
            lstRoles:TeamService.getListRoles(),
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-update-player-coach');
        },
        validDTO(){
            if(this.playerModel.notPlayer){
                return this.playerModel.firstName && this.playerModel.lastName && this.playerModel.role;
            }

            return this.playerModel.firstName && this.playerModel.lastName && this.playerModel.position;
        },
        async updatePlayer(){
    
            const data = {
                first_name:this.playerModel.firstName,
                last_name:this.playerModel.lastName,
                poste:this.playerModel.position,
                role:this.playerModel.role,
                admin:this.playerModel.admin
            }
            
            let response;

            if(this.player.notPlayer){
                response = await this.$axios.post('/api/coachs', data); 
            }else{
                response = await this.$axios.post('/api/players', data); 
            }

            this.$root.$emit('reload-team');
            this.hide();
        },
        setNotPlayer(){
            this.playerModel.isPlayer = !this.playerModel.isPlayer;
        },
        setAdmin(){
            console.log(this.playerModel.admin)
            this.playerModel.admin = !this.playerModel.admin;
        },
        isBtnSaveDisabled(){
            return !this.validDTO();
        },
    },
    created () {
        if(!this.player.isPlayer){
            this.playerModel = this.player;
            this.playerModel.admin = false;
        }
    
    }
}
</script>