<template>
    <div class="creation-exercice creation-alignement">
        <div class="menu-top">
            <div class="principal-items">
                <span @click="goHome()" class="icon-action" title="Retournez à l'accueil"><font-awesome-icon :icon="['fas', 'home']"/></span>
            </div>
            <div class="secondary-items">
                <div class="first-items">
                    <div class="objects icon-action" title="Afficher gardien" v-if="showGardien">
                        <span  @click="setShowGardien()" >
                            <font-awesome-icon :icon="['fas', 'toggle-on']"/>
                        </span><br>
                        <span class="label">Afficher gardien</span>
                    </div>
                    <div class="objects icon-action" title="Afficher gardien" v-else>
                        <span  @click="setShowGardien()" v-if="!showGardien">
                            <font-awesome-icon :icon="['fas', 'toggle-off']"/>
                        </span><br>
                        <span class="label">Afficher gardien</span>
                    </div>
                    <div class="objects icon-action" title="Remplaçants">
                        <span @click="setShowRemplacantsSelect()"><font-awesome-icon :icon="['fas', 'user-friends']"/><font-awesome-icon :icon="['fas', 'sort-down']"/></span><br>
                        <span class="label">Remplaçants</span>
                    </div>
                    <div class="select-remplacants selects" v-if="showRemplacantsSelect">
                        <div class="arrow-up"></div>
                        <div class="liste-remplacants">
                            <div class="show-remplacants">
                                <div class="label-toggle"><span class="label">Affichez les remplacants</span></div>
                                <div class="toggle" @click="setShowRemplacants()">
                                    <span v-if="showRemplacants"><font-awesome-icon :icon="['fas', 'toggle-on']"/></span>
                                    <span v-else><font-awesome-icon :icon="['fas', 'toggle-off']"/></span>
                                </div>
                            </div>
                            <div class="form-content">
                                <div class="form-group">
                                    <label class="label-control" for="nom-remlacant">Nom: </label>
                                    <input type="text" name="nom-remlacant" class="form-control" autocomplete="off" v-model="remplacant"/>
                                </div>
                                <button class="btn btn-default" @click="addRemplacant()">Ajoutez remplaçant</button>
                            </div>
                            <div class="remplacants">
                                <div class="item-remplacant" v-for="(r, i) in lstRemplacants" :key="i">
                                    <div>{{r}}</div>
                                    <div class="trash" title="Supprimer" @click="deleteRemplacant(i)"><font-awesome-icon :icon="['fas', 'trash']"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="actions">
                <span @click="downloadExercice()" title="Télécharger" class="download"><font-awesome-icon :icon="['fas', 'download']"/></span>
            </div>
        </div>
        <div class="content">
            <div class="menu-left">
                <div class="items-menu">
                    <div class="item-terrain" :class="{'active' : contentItem === 'terrain'}" title="Changer le terrain" @click="selectContentItem('terrain')">
                        <svg class="icon-stroke">
                            <use href="@/assets/images/icons/icons.svg#terrain"/>
                        </svg>
                    </div>
                    <div class="item-player" :class="{'active' : contentItem === 'joueur'}" title="Ajouter un joueur" @click="selectContentItem('joueur')">
                        <svg class="icon">
                            <use href="@/assets/images/icons/icons.svg#player"/>
                        </svg>
                    </div>
                    <div class="item-outils" :class="{'active' : contentItem === 'conf'}" title="Modifier la configuration" @click="selectContentItem('conf')">
                        <font-awesome-icon :icon="['fas', 'cog']"/>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-item-terrains" v-if="contentItem === 'terrain'">
                        <h3>Terrains</h3>
                        <div class="content-onglet">
                            <div class="sans-ligne">
                                <div class="item-terrain-sl" v-for="(terrain, indexT) in terrains" :key="indexT" @click="changeTerrain(terrain.image, terrain.name)">
                                    <img :src="require('~/assets/images/terrain/alignement/' + terrain.image)" :alt="terrain.name" :title="terrain.name">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-item-joueurs" v-if="contentItem === 'joueur'">
                        <h3>Joueurs</h3>
                        <div class="item-joueur-mouvement">
                            <div class="joueur-add joueur-add-img" v-for="(playerImg, indexPlayerIndex) in joueurs" :key="indexPlayerIndex" @click="addPlayerImg(playerImg.image)">
                                <img :id="'player-img-' + playerImg.name" :src="require('~/assets/images/joueurs/alignement/' + playerImg.image)">
                            </div> 
                        </div>
                    </div>
                    <div class="content-item-outils" v-if="contentItem === 'conf'">
                        <h3>Configuration</h3>
                        <div class="content-outils">
                            <div class="form-content">
                                <div class="form-group">
                                    <label class="label-control" for="addText">Nom de l'équipe: </label>
                                    <input type="text" name="addText" class="form-control" v-model="teamName" @blur="setTeamName()"/>
                                </div>
                                <div class="form-group">
                                    <label class="label-control" for="nbPlayers">Nombre de joueurs: </label>
                                    <select name="nbPlayers" class="form-control" v-model="teamNbPlayers" @change="changeNbJoueurs()">
                                        <option :value="nb" v-for="(nb, index) in lstNbJoueurs" :key="index">
                                            {{nb}}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="label-control" for="system">Système de jeu: </label>
                                    <select name="system" class="form-control" v-model="teamSystem" @change="changeSysteme()">
                                        <option :value="systeme" v-for="(systeme, index) in lstSystemes" :key="index">
                                            {{systeme.systeme}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-terrain">
                <div class="terrain-space" id="terrainSoccer">
                        <div class="nom-equipe">
                            <h4>{{teamName}}</h4>
                        </div>
                        <div class="terrain-grid" :class="'terrain-'+classSysteme">
                            <div class="div-attaquants div-g">
                                <div v-for="(object, indexObj) in lstAttaquants" :key="indexObj" :id="'player' + indexObj" class="draggable player">
                                    <div class="item-g" :class="{'player-top' : isBottomPlayer(lstAttaquants, indexObj)}">
                                        <img :src="require('~/assets/images/joueurs/alignement/'+playerTypeSelect)">
                                    </div>
                                    <div class="name-player">
                                        <div class="text-input">
                                            <input type="text" :id="'input-text-a-' + indexObj" v-model="object.name" :name="'name-a-'+indexObj" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div class="div-milieux div-g">

                                <div v-for="(object, indexObj) in lstMilieux" :key="indexObj" :id="'player' + indexObj" class="draggable player" :class="{'player-bottom' : isBottomPlayer(lstMilieux, indexObj)}">
                                    <div class="item-g">
                                        <img :src="require('~/assets/images/joueurs/alignement/'+playerTypeSelect)">
                                    </div>
                                    <div class="name-player">                          
                                        <div class="text-input">
                                            <input type="text" :id="'input-text-m-' + indexObj" v-model="object.name" :name="'name-m-'+indexObj" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div class="div-defenseurs div-g">
                                <div v-for="(object, indexObj) in lstDefenseurs" :key="indexObj" :id="'player' + indexObj" class="draggable player"  :class="{'player-bottom' : isBottomPlayer(lstDefenseurs, indexObj)}">
                                    <div class="item-g">
                                        <img :src="require('~/assets/images/joueurs/alignement/'+playerTypeSelect)">
                                    </div>
                                    <div class="name-player">                                     
                                        <div class="text-input">
                                            <input type="text" :id="'input-text-d-' + indexObj" v-model="object.name" :name="'name-d-'+indexObj" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-gardien div-g">
                                <div class="player player-gardien" v-if="this.showGardien">
                                    <div class="item-g">
                                        <img src="~/assets/images/joueurs/alignement/gardien.png">
                                    </div>
                                    <div class="name-player">             
                                        <div class="text-input">
                                            <input type="text" id="input-text-gardienne" v-model="gardienName" name="name-g" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="reserve">
                            <div class="player">
                                <div class="item-g" v-if="showRemplacants">
                                    Remplaçants: 
                                    <span class="remplacants" v-for="(r, index) in lstRemplacants" :key="index">
                                        <span v-if="index !== 0"> - </span> {{r}} 
                                    </span>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="help">
                    <div class="question" :class="{'clicked' : showOptionsHelp}" @click="setShowOptionsHelp()">
                        <font-awesome-icon :icon="['fas', 'question']"/>
                    </div>
                    <div class="lst-options-help" v-show="showOptionsHelp">
                        <div class="options">
                            <div><div @click="setShowOptionsHelp()">Tutoriel</div></div>
                            <div><div @click="setShowOptionsHelp()">Youtube</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import GoHomeModal from '@/components/modals/GoHomeModal.vue'
import ModalOpenAlignementsVue from '../components/modals/ModalOpenAlignements.vue'
import DownloadAlignementSuccesModalVue from '../components/modals/DownloadAlignementSuccesModal.vue'

export default {
    layout: 'designer',
    head(){
        return{
            title:'Créez votre alignement | ESsoccercoach',
            script:[
            ]
        }
    },
    computed:{
        joueurs(){
            return this.$store.state.esdesigner.listeJoueursAlignements;
        },
        terrains(){
            return this.$store.state.esdesigner.listeTerrainsAlignements;
        },
        alignement(){
            return this.$store.state.alignement.alignement;
        },
        lstSystemes11Players(){
            return this.$store.state.alignement.lstSystemes11Players;
        },
        lstSystemes9Players(){
            return this.$store.state.alignement.lstSystemes9Players;
        },
        lstSystemes7players(){
            return this.$store.state.alignement.lstSystemes7players;
        },
        lstSysteme5players(){
            return this.$store.state.alignement.lstSysteme5players;
        },
        classSysteme(){
            return this.teamSystem.systeme;
        },
    },
    watch:{
    },
    data(){
        return{
            contentItem:'terrain',
            terrainSelected:'terrain1',
            showOptionsHelp:false,
            lstSystemes:[],
            showGardien:true,
            gardienName:'Nom',
            lstAttaquants:[],
            lstMilieux:[],
            lstDefenseurs:[],
            lstRemplacants:[],
            showRemplacantsSelect:false,
            showRemplacants:true,
            playerTypeSelect:'player10.png',
            lstNbJoueurs:[11,9,7,5],
            teamName:undefined,
            teamSystem:undefined,
            teamNbPlayers:undefined,
            remplacant:undefined,
        }
    },
    methods:{
        setTeamName(){
        },
        addPlayerImg(img){
            this.playerTypeSelect = img;
        },
        setShowOptionsHelp(){
            this.showOptionsHelp = this.showOptionsHelp ? false : true;
        },
        goHome(){
            this.$modal.show(
                GoHomeModal,
                {},
                {name : 'go-home-modal', classes:['modal-s']}
            );
        },
        closeAllSelectes(){ 
            this.showOptionsHelp = false;
        },
        selectContentItem(item){
            this.contentItem = item;
        },
        setShowGardien(){
            this.showGardien = !this.showGardien;
        },
        setShowRemplacantsSelect(){
            this.showRemplacantsSelect = !this.showRemplacantsSelect;
        },
        addRemplacant(){
            this.lstRemplacants.push(this.remplacant);
            this.remplacant = '';
        },
        deleteRemplacant(index){
            this.lstRemplacants.splice(index, 1);
        },
        setShowRemplacants(){
            this.showRemplacants = !this.showRemplacants;
        },
        changeTerrain(image, name){
            document.getElementById('terrainSoccer').style.backgroundImage = 'url(' + require('~/assets/images/terrain/alignement/' + image) + ')';
            document.getElementById('terrainSoccer').style.backgroundRepeat  = 'no-repeat';
            this.terrainSelected = name;
        },
        downloadExercice(){
            this.setTextLoader('Téléchargement de l\'image en cours ...');
            this.setShowLoader(true);

            setTimeout(() => {
                let domElement = document.getElementById("terrainSoccer");    
                html2canvas(domElement, {
                    onrendered: (canvas) => {
                        Canvas2Image.saveAsPNG(canvas,undefined,undefined,'alignement_essoccercoach'); 
                        this.setShowLoader(false);
                        this.$modal.show(
                            DownloadAlignementSuccesModalVue,
                            {},
                            {name : 'download-alignement-succes-modal', classes:['modal-top'], clickToClose:false}
                        );
                    }
                });
            }, 2 * 1000);
        },
        initActionsButtons(){
            document.getElementById('undo').classList.add('inactive');
            document.getElementById('redo').classList.add('inactive');
            document.getElementById('delete').classList.add('inactive');
            document.getElementById('deleteAll').classList.add('inactive');
            document.getElementById('copy').classList.add('inactive');
            document.getElementById('changeTransparence').classList.add('inactive');
        },
        changeSysteme(){
            this.lstAttaquants=[];
            this.lstMilieux=[];
            this.lstDefenseurs=[];
            for(let i = 0; i < this.teamSystem.att; i++){
                let player = {
                    noPlayer: i+1,
                    name:'Nom'
                };
                this.lstAttaquants.push(player);
            }
            for(let i = 0; i < this.teamSystem.mc; i++){
                let player = {
                    noPlayer: i+1,
                    name:'Nom'
                };
                this.lstMilieux.push(player);
            }
            for(let i = 0; i < this.teamSystem.def; i++){
                let player = {
                    noPlayer: i+1,
                    name:'Nom'
                };
                this.lstDefenseurs.push(player);
            }
        },
        changeNbJoueurs(){
            if(this.teamNbPlayers === 11){   
                this.lstSystemes = this.lstSystemes11Players;
                this.teamSystem = {'systeme':'4-4-2','att':2,'mc':4, 'def':4};
            }else if(this.teamNbPlayers === 9){
                this.lstSystemes = this.lstSystemes9Players;
                this.teamSystem ={'systeme':'3-3-2','att':2,'mc':3, 'def':3};
            }else if(this.teamNbPlayers === 7){
                this.lstSystemes = this.lstSystemes7players;
                this.teamSystem ={'systeme':'2-3-1','att':1,'mc':3, 'def':2};
            }else if(this.teamNbPlayers === 5){
                this.lstSystemes = this.lstSysteme5players;
                this.teamSystem ={'systeme':'2-2','att':2,'mc':0, 'def':2};
            }
            this.changeSysteme();
        },
        isBottomPlayer(list, index){
            const modulo = list.length % 2;
            if(modulo === 1){
                return index + 1 === Math.round(list.length / 2);
            }
            return false;
        },
        ...mapMutations({setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader', setAlignement:'alignement/setAlignement'})
    },
    created(){
        this.setShowLoader(true);
        this.setClassLoader('open-designer');
        this.setTextLoader('ESsoccercoach');

        const init =  { 
                nom:'Nom de l\'équipe',
                nbPlayers:11,
                systeme:{'systeme':'4-4-2','att':2,'mc':4, 'def':4}
        };

        this.setAlignement(init);

        this.teamName = this.alignement.nom;
        this.teamSystem = this.alignement.systeme;
        this.teamNbPlayers = this.alignement.nbPlayers;
    },
    mounted(){

        this.changeSysteme();
        this.lstSystemes = this.lstSystemes11Players;

        setTimeout(() => {   
            this.$modal.show(
                ModalOpenAlignementsVue,
                {},
                {name : 'open-alignements-modal', classes:['modal-lg'], clickToClose:false}
            );

            this.setShowLoader(false);
            this.setClassLoader('');
        },  3* 1000);

        this.$root.$on('initAlignement', () =>{
            this.teamName = this.alignement.nom;
            this.teamSystem = this.alignement.systeme;
            this.teamNbPlayers = this.alignement.nbPlayers;

            if(this.teamNbPlayers === 11){   
                this.lstSystemes = this.lstSystemes11Players;
            }else if(this.teamNbPlayers === 9){
                this.lstSystemes = this.lstSystemes9Players;
            }else if(this.teamNbPlayers === 7){
                this.lstSystemes = this.lstSystemes7players;
            }else if(this.teamNbPlayers === 5){
                this.lstSystemes = this.lstSysteme5players;
            }

            this.changeSysteme();
        });
    },
    updated(){
    },
    beforeDestroy(){
    },
}
</script>