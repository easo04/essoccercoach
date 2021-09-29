<template>
    <div class="create-players connected-page">
        <bouton-back title="Retournez au sommaire de l'équipe"/>
        <h3>Créez un joueur ou entraîneur</h3>
        <div class="form-content">
            <div class="form-group">
                <label class="label-control" for="last_name">Nom (Obligatoire): </label>
                <input type="text" name="last_name" class="form-control" v-model="player.lastName" autocomplete="off"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="first_name">Prénom (Obligatoire): </label>
                <input type="text" name="first_name" class="form-control" v-model="player.firstName" autocomplete="off"/>
            </div>
            <div class="not-player" title="Ce n'est pas un joueur" v-if="player.notPlayer">              
                <span class="label">Ce n'est pas un joueur?</span><br>
                <span  @click="setNotPlayer()" >
                    <font-awesome-icon :icon="['fas', 'toggle-on']"/>
                </span>
            </div>
            <div class="not-player" title="Ce n'est pas un joueur" v-else>
                <span class="label">Ce n'est pas un joueur?</span><br>
                <span  @click="setNotPlayer()">
                    <font-awesome-icon :icon="['fas', 'toggle-off']"/>
                </span>
            </div>
            <div class="form-group" v-if="!player.notPlayer">
                <label class="label-control" for="position">Position (Obligatoire): </label>
                <select name="position" class="form-control" v-model="player.position">
                    <option :value="position.code" v-for="(position, index) in lstPositions" :key="index">
                        {{position.label}}
                    </option>
                </select>
            </div>
            <div class="form-group" v-else>
                <label class="label-control" for="role">Rôle (Obligatoire): </label>
                <select name="role" class="form-control" v-model="player.role">
                    <option :value="role.code" v-for="(role, index) in lstRoles" :key="index">
                        {{role.label}}
                    </option>
                </select>
            </div>
            <div class="form-group" v-if="player.notPlayer">
                <div class="not-player" title="C'est un administrateur?" v-if="player.admin">              
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
        <div class="footer-form">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="addPlayer()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
        <div class="error" v-show="error">
            <span>* {{error}}</span>
        </div>
    </div>
</template>
<script>
import TeamService from '../../../../static/services/TeamService';
export default {
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            player:{
                firstName:undefined,
                lastName:undefined,
                notPlayer:false,
                position:undefined,
                role:undefined,
                admin:false
            },
            lstPositions:TeamService.getListPositions(),
            lstRoles:TeamService.getListRoles(),
            team:undefined
        }
    },
    methods: {
        validDTO(){
            if(this.player.notPlayer){
                return this.player.firstName && this.player.lastName && this.player.role;
            }

            return this.player.firstName && this.player.lastName && this.player.position;
        },
        async addPlayer(){
    
            const data = {
                first_name:this.player.firstName,
                last_name:this.player.lastName,
                poste:this.player.position,
                role:this.player.role,
                equipe:this.team.id,
                admin:this.player.admin
            }

            if(this.player.notPlayer){
                await this.$axios.post('/api/coachs', data); 
            }else{
                await this.$axios.post('/api/players', data); 
            }

            this.$root.$emit('reload-team');
            this.$router.push(`/dashboard/teams`);
        },
        setNotPlayer(){
            this.player.notPlayer = !this.player.notPlayer;
        },
        setAdmin(){
            this.player.admin = !this.player.admin;
        },
        isBtnSaveDisabled(){
            return !this.validDTO();
        },
    },
    mounted () {
        this.team = JSON.parse(localStorage.getItem('current-team'));
    }
}
</script>