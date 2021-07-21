<template>
    <div class="modal-add-alignement modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un alignement à votre match</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="select-system" v-if="section === 'system'">
                <div class="form-group">
                    <label class="label-control" for="systeme">Système (Obligatoire): </label>
                    <select name="systeme" class="form-control" v-model="systeme" @change="changeSysteme()">
                        <option :value="sys" v-for="(sys, index) in lstSystemes11Players" :key="index">
                            {{sys.systeme}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="liste-players" v-if="section === 'players'">
                <div class="players" :class="'systeme-' + systeme.systeme">
                    <div>
                        <h6>Gardien:</h6>
                        <div class="gardien items-player">
                            <div class="item-player">
                                <select name="player" class="form-control" v-model="gardien">
                                    <option :value="player" v-for="(player, ig) in players" :key="ig">
                                        {{player.first_name}} {{player.last_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Défenseurs:</h6>
                        <div class="defenseurs items-player">
                            <div class="item-player" v-for="(item, i) in defenseurs" :key="i">
                                <select name="player" class="form-control" v-model="item.player">
                                    <option :value="player" v-for="(player, ip) in players" :key="ip">
                                        {{player.first_name}} {{player.last_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Milieux:</h6>
                        <div class="milieux items-player">
                            <div class="item-player" v-for="(item, im) in milieux" :key="im">
                                <select name="player" class="form-control" v-model="item.player">
                                    <option :value="player" v-for="(player, ip) in players" :key="ip">
                                        {{player.first_name}} {{player.last_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Attaquants:</h6>
                        <div class="attaquants items-player">
                            <div class="item-player" v-for="(item, ia) in attaquants" :key="ia">
                                <select name="player" class="form-control" v-model="item.player">
                                    <option :value="player" v-for="(player, ip) in players" :key="ip">
                                        {{player.first_name}} {{player.last_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="liste-players summary" v-if="section === 'summary'">
                <div class="players alignement" :class="'systeme-' + systeme.systeme">
                    <div class="borders">
                        <div>
                            <div class="gardien items-player">
                                <div class="item-player">
                                    {{gardien.first_name}} {{gardien.last_name}}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="defenseurs items-player">
                                <div class="item-player" v-for="(item, i) in defenseurs" :key="i">
                                    {{item.player.first_name}} {{item.player.last_name}}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="milieux items-player">
                                <div class="item-player" v-for="(item, im) in milieux" :key="im">
                                    {{item.player.first_name}} {{item.player.last_name}}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="attaquants items-player">
                                <div class="item-player" v-for="(item, ia) in attaquants" :key="ia">
                                    {{item.player.first_name}} {{item.player.last_name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="precedent()" v-if="showBtnPrecedent()">Précedent</button>
                <button class="btn btn-default" @click.prevent="next()" :class="{'disabled':isNextDisabled()}" :disabled="isNextDisabled()" v-if="section !== 'summary'">Suivant</button>
                <button class="btn btn-default" @click.prevent="save()" v-else>Enregistrez</button>
            </div>
        </div>
    </div>          
</template>
<script>
import TeamService from '../../../static/services/TeamService';
export default {
    props:['activity', 'players'],
    data(){
        return{
            positions:TeamService.getListPositions(),
            systeme:undefined,
            section:'system',
            defenseurs:[],
            milieux:[],
            attaquants:[],
            gardien:undefined
        }
    },
    computed:{
        lstSystemes11Players(){
            return this.$store.state.alignement.lstSystemes11Players;
        },
    },
    methods:{
        hide(){
            this.$modal.hide('modal-add-alignement');
        },
        next(){
            switch (this.section) {
                case 'system':
                    this.section = 'players';
                    break;
                case 'players':
                    this.section = 'summary';
                break;
                default:
                    this.section = 'system';
                    break;
            }
        },
        save(){
            this.defenseurs.forEach(element => {
                console.log('def id: ' + element.player.id)
            });
            this.milieux.forEach(element => {
                console.log('m id: ' + element.player.id)
            });
            this.attaquants.forEach(element => {
                console.log('a id: ' + element.player.id)
            });
        },
        precedent(){
            switch (this.section) {
                case 'players':
                    this.section = 'system';
                    break;
                case 'summary':
                    this.section = 'players';
                break;
                default:
                    this.section = 'system';
                    break;
            }
        },
        showBtnPrecedent(){
            return this.section !== 'system';
        },
        changeSysteme(){
            this.attaquants=[];
            this.milieux=[];
            this.defenseurs=[];
            for(let i = 0; i < this.systeme.att; i++){
                let player = {
                    noPlayer: i+1,
                    player:undefined
                };
                this.attaquants.push(player);
            }
            for(let i = 0; i < this.systeme.mc; i++){
                let player = {
                    noPlayer: i+1,
                    player:undefined
                };
                this.milieux.push(player);
            }
            for(let i = 0; i < this.systeme.def; i++){
                let player = {
                    noPlayer: i+1,
                    player:undefined
                };
                this.defenseurs.push(player);
            }
        },
        isNextDisabled(){
            if(this.section === 'system' && this.systeme === undefined){
                return true;
            }

            if(this.section === 'players'){

                const defenseurUndefined = this.defenseurs.find(def => def.player === undefined);
                const milieuxUndefined = this.milieux.find(mil => mil.player === undefined);
                const attaquantUndefined = this.attaquants.find(att => att.player === undefined);

                if(defenseurUndefined || milieuxUndefined || attaquantUndefined || !this.gardien){
                    return true;
                }
            }

            return false;
        }
    }
}
</script>