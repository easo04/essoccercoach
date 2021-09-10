<template>
    <div class="add-alignement">
        <div class="back" title="Retournez au sommaire">
            <span @click="back()"><font-awesome-icon :icon="['fas', 'arrow-left']"/> Retournez à l'activité</span>
        </div>
        <div class="select-system">
            <div class="form-group">
                <label class="label-control" for="systeme">Système: </label>
                <select name="systeme" class="form-control" v-model="systeme" @change="changeSysteme()">
                    <option :value="sys" v-for="(sys, index) in lstSystemes11Players" :key="index">{{sys.systeme}}</option>
                </select>
            </div>
        </div>
        <div class="liste-players">
            <div class="players" :class="'systeme-' + systeme.systeme">
                <div>
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
            <div class="remplacants">
                <h4>Remplacants</h4>
                <div v-for="(player, i) in players" :key="i">
                    {{player.first_name}} {{player.last_name}}
                </div>
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
            positions:TeamService.getListPositions(),
            systeme:{'systeme':'4-4-2','att':2,'mc':4, 'def':4},
            section:'system',
            defenseurs:[],
            milieux:[],
            attaquants:[],
            gardien:undefined,
            activity:{},
            players:[]
        }
    },
    computed:{
        lstSystemes11Players(){
            return this.$store.state.alignement.lstSystemes11Players;
        },
    },
    methods:{
        back(){
            history.back();
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
        },
    },
    mounted () {
        const team = JSON.parse(localStorage.getItem('current-team'));
        this.players = team.players;
        this.activity = team.activities.find(activity => activity.id === this.$route.params.id);
    }
}
</script>