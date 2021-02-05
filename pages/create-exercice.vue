<template>
    <div class="creation-exercice">
        <div class="menu-top">
            <div class="principal-items">
                <span @click="goHome()" class="icon-action" v-if="!fromSeance" title="Retourner à l'accueil"><font-awesome-icon :icon="['fas', 'home']"/></span>
                <span @click="goBack()" class="icon-action" v-else title="Retourner en arrière"><font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']"/></span>
                <div class="actions-s">
                    <span class="icon-action inactive" id="undo" @click="undo()" title="Undo"><font-awesome-icon :icon="['fas', 'undo']"/></span>
                    <span class="icon-action inactive" id="redo" @click="redo()" title="Redo"><font-awesome-icon :icon="['fas', 'redo']"/></span>
                </div>
            </div>
            <div class="secondary-items">
                <div class="first-items">
                    <span class="icon-action inactive" id="delete" @click="deleteObject()" title="Effacer"><font-awesome-icon :icon="['fas', 'eraser']"/></span>
                    <span class="icon-action inactive" id="deleteAll" @click="deleteAll()" title="Tout supprimer"><font-awesome-icon :icon="['fas', 'trash-alt']"/></span>
                </div>
                <div class="second-items">
                    <span class="icon-action" @click="addText()" title="Ajouter texte"><font-awesome-icon :icon="['fas', 'font']"/></span>
                    <div class="add-number" id="addNumber" title="Ajouter un compteur" @click="addNumber()"><font-awesome-icon :icon="['fas', 'circle']"/><span class="number">1</span></div>
                    <span class="objects icon-action" title="Ajouter forme" @click="setShowSelectFormes()"><font-awesome-icon :icon="['fas', 'circle']"/><font-awesome-icon :icon="['fas', 'sort-down']"/></span>
                    <span class="objects icon-action  couleur-select" title="Changer la couleur" @click="setShowSelectColors()"><font-awesome-icon :icon="['fas', 'fill']"/><font-awesome-icon :icon="['fas', 'sort-down']"/></span>
                    <span class="objects icon-action inactive" id="changeTransparence" title="Changer la transparence" @click="setShowSelectTransparence()"><span class="transparence-select">{{rangeOpacity}}%</span><font-awesome-icon :icon="['fas', 'sort-down']"/></span>
                    <div class="select-couleurs selects" v-if="showSelectColors">
                        <div class="arrow-up"></div>
                        <div class="liste-couleurs">
                            <div class="black" @click="changeColor('black')"></div>
                            <div class="red" @click="changeColor('red')"></div>
                            <div class="yellow" @click="changeColor('yellow')"></div>
                            <div class="blue" @click="changeColor('blue')"></div>
                            <div class="white" @click="changeColor('white')"></div>
                            <div class="green" @click="changeColor('green')"></div>
                        </div>
                    </div>
                    <div class="select-formes selects" v-if="showSelectFormes">
                        <div class="arrow-up"></div>
                        <div class="liste-formes">
                            <div class="item-forme" @click="addForm('circle')"> 
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#circle-stroke"/>
                                </svg> Cercle
                            </div>
                            <div class="item-forme" @click="addForm('square')">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#square-stroke"/>
                                </svg> Rectangle
                            </div>
                            <div class="item-forme" @click="addForm('triangle')">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#triangle-stroke"/>
                                </svg> Triangle
                            </div>
                            <div class="item-forme" @click="addForm('line-v')">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#line-v-solid"/>
                                </svg> Ligne verticale
                            </div>
                            <div class="item-forme" @click="addForm('line-h')">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#line-h-solid"/>
                                </svg> Ligne horizontale
                            </div>
                        </div>
                    </div>
                    <div class="select-transparence selects" v-if="showSelectTransparence">
                        <div class="arrow-up"></div>
                        <div class="liste-formes">
                            <div class="select-opacity">
                                10% <input type="range" id="range-opacity" min="10" max="100" class="slider" name="range" value="100" v-model="rangeOpacity" @change="editOpacityForme()"> 100%
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third-items">
                    <span class="icon-action inactive" id="copy" @click="makeCopy()" title="Faire une copie"><font-awesome-icon :icon="['fas', 'copy']"/></span>
                    <span class="icon-action inactive" id="minus" @click="minus()" title="Zoom moins"><font-awesome-icon :icon="['fas', 'search-minus']"/></span>
                    <span class="icon-action inactive" id="plus" @click="plus()" title="Zoom plus"><font-awesome-icon :icon="['fas', 'search-plus']"/></span>
                </div>
            </div>
            <div class="actions">
                <span @click="downloadExercice()" v-if="!fromSeance" class="download" title="Télécharger"><font-awesome-icon :icon="['fas', 'download']"/></span>
                <span @click="saveExercice()" title="Sauvegarder" class="save" v-else><font-awesome-icon :icon="['fas', 'save']"/></span>
            </div>
        </div>
        <div class="content">
            <div class="menu-left">
                <div class="items-menu">
                    <div class="item-terrain" :class="{'active' : contentItem === 'terrain'}" title="Changer le terrain" @click="selectContentItem('terrain')">
                        <i class="icon-terrain"></i>
                    </div>
                    <div class="item-player" :class="{'active' : contentItem === 'joueur'}" title="Ajouter un joueur" @click="selectContentItem('joueur')">
                        <i class="icon-player"></i>
                    </div>
                    <div class="item-outils" :class="{'active' : contentItem === 'outil'}" title="Ajouter un outil" @click="selectContentItem('outil')">
                        <i class="icon-outil"></i>
                    </div>
                    <div class="item-lignes" :class="{'active' : contentItem === 'ligne'}" title="Ajouter une ligne" @click="selectContentItem('ligne')">
                        <i class="icon-arrow"></i>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-item-terrains" v-if="contentItem === 'terrain'">
                        <h3>Terrains</h3>
                        <div class="onglets">
                            <div class="item-onglet" :class="{'active' : ongletTerrainSelected === 'sans-ligne'}" @click="selectOngletTerrain('sans-ligne')">Sans lignes</div>
                            <div class="item-onglet" :class="{'active' : ongletTerrainSelected === 'avec-ligne'}" @click="selectOngletTerrain('avec-ligne')">Avec lignes</div>
                        </div>
                        <div class="content-onglet">
                            <div class="sans-ligne" v-if="ongletTerrainSelected === 'sans-ligne'">
                                <div class="item-terrain-sl" v-for="(terrain, indexT) in terrains" :key="indexT" @click="changeTerrain(terrain.image, terrain.name)">
                                    <img :src="require('~/assets/images/terrain/' + terrain.image)" :alt="terrain.name" :title="terrain.name">
                                </div>
                            </div>
                            <div class="avec-ligne" v-if="ongletTerrainSelected === 'avec-ligne'">
                                <div class="item-terrain-al">

                                </div>
                                <div class="item-terrain-al">

                                </div>
                                <div class="item-terrain-al">

                                </div>
                                <div class="item-terrain-al">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-item-joueurs" v-if="contentItem === 'joueur'">
                        <h3>Joueurs</h3>
                        <h4>Joueurs sans texte</h4>
                        <div class="item-joueur-simple">
                            <div class="joueur-add" @click="addPlayerByColor('red')">
                                <svg class="icon red">
                                    <use href="@/assets/images/icons/icons.svg#player-color"/>
                                </svg>
                            </div> 
                            <div class="joueur-add" @click="addPlayerByColor('blue-claro')">
                                <svg class="icon blue-claro">
                                    <use href="@/assets/images/icons/icons.svg#player-color"/>
                                </svg>
                            </div> 
                            <div class="joueur-add" @click="addPlayerByColor('yellow')">
                                <svg class="icon yellow">
                                    <use href="@/assets/images/icons/icons.svg#player-color"/>
                                </svg>
                            </div>
                            <div class="joueur-add" @click="addPlayerByColor('black')">
                                <svg class="icon black">
                                    <use href="@/assets/images/icons/icons.svg#player-color"/>
                                </svg>
                            </div>
                        </div>
                        <h4>Joueurs avec texte</h4>
                        <div class="item-joueur-text">
                            <div class="joueur-add with-text" @click="addPlayerWithTextByColor('red')">
                                <svg class="icon red">
                                    <use href="@/assets/images/icons/icons.svg#player-text"/>
                                </svg>
                            </div> 
                            <div class="joueur-add with-text" @click="addPlayerWithTextByColor('blue-claro')">
                                <svg class="icon blue-claro">
                                    <use href="@/assets/images/icons/icons.svg#player-text"/>
                                </svg>
                            </div> 
                            <div class="joueur-add with-text" @click="addPlayerWithTextByColor('yellow')">
                                <svg class="icon yellow">
                                    <use href="@/assets/images/icons/icons.svg#player-text"/>
                                </svg>
                            </div>
                            <div class="joueur-add with-text" @click="addPlayerWithTextByColor('black')">
                                <svg class="icon black">
                                    <use href="@/assets/images/icons/icons.svg#player-text"/>
                                </svg>
                            </div>
                        </div>
                        <h4>Joueurs en mouvements</h4>
                        <div class="item-joueur-mouvement">
                            <div class="joueur-add joueur-add-img" v-for="(playerImg, indexPlayerIndex) in joueurs" :key="indexPlayerIndex" @click="addPlayerImg(playerImg.image, playerImg.name)">
                                <img :id="'player-img-' + playerImg.name" :src="require('~/assets/images/joueurs/' + playerImg.image)">
                            </div> 
                        </div>
                        <h4>Gardiens</h4>
                        <div class="item-joueur-simple">
                            <div class="joueur-add gardien" @click="addPlayerGardienByColor('green')">
                                <svg class="icon gardien-green">
                                    <use href="@/assets/images/icons/icons.svg#player-gardien"/>
                                </svg>
                            </div>
                            <div class="joueur-add gardien" @click="addPlayerGardienByColor('orange')">
                                <svg class="icon gardien-orange">
                                    <use href="@/assets/images/icons/icons.svg#player-gardien"/>
                                </svg>
                            </div>
                            <div class="joueur-add gardien" @click="addPlayerGardienByColor('mauve')">
                                <svg class="icon gardien-mauve">
                                    <use href="@/assets/images/icons/icons.svg#player-gardien"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="content-item-outils" v-if="contentItem === 'outil'">
                        <h3>Outils</h3>
                        <div class="content-outils">
                            <h4>Ballons</h4>
                            <div class="items-outils">
                                <div class="outil-li-div cones" v-for="(outil, indexO) in ballonsOutils" :key="indexO" @click="addOutil(outil.name, outil.image)">
                                    <img :src="require('~/assets/images/outils/outils_list/' + outil.image)" :alt="outil.name" :title="outil.name">
                                </div>
                            </div>
                            <h4>Buts</h4>
                            <div class="items-outils">
                                <div class="outil-li-div" v-for="(outil, indexO) in butOuils" :key="indexO" @click="addOutil(outil.name, outil.image)">
                                    <img :src="require('~/assets/images/outils/outils_list/' + outil.image)" :alt="outil.name" :title="outil.name">
                                </div>
                            </div>
                            <h4>Cônes</h4>
                            <div class="items-outils">
                                <div class="outil-li-div cones" v-for="(outil, indexO) in conesOutils" :key="indexO" @click="addOutil(outil.name, outil.image)">
                                    <img :src="require('~/assets/images/outils/outils_list/' + outil.image)" :alt="outil.name" :title="outil.name">
                                </div>
                            </div>
                            <h4>Outils exercices</h4>
                            <div class="items-outils">
                                <div class="outil-li-div cones" v-for="(outil, indexO) in othersOutils" :key="indexO" @click="addOutil(outil.name, outil.image)">
                                    <img :src="require('~/assets/images/outils/outils_list/' + outil.image)" :alt="outil.name" :title="outil.name">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-item-lignes" v-if="contentItem === 'ligne'">
                        <h3>Lignes</h3>
                        <div class="content-lines">
                            <h4>Lignes de passes</h4>
                            <div class="items-lignes">
                                <div class="ligne-li-div" v-for="(ligne, indexL) in passLignes" :key="indexL" @click="addArrow(ligne.name, ligne.image)">
                                    <img :src="require('~/assets/images/lignes/ligne_list/' + ligne.image)" :alt="ligne.name" :title="ligne.name">
                                </div>
                            </div>
                            <h4>Lignes de mouvement</h4>
                            <div class="items-lignes">
                                <div class="ligne-li-div" v-for="(ligne, indexL) in runLignes" :key="indexL" @click="addArrow(ligne.name, ligne.image)">
                                    <img :src="require('~/assets/images/lignes/ligne_list/' + ligne.image)" :alt="ligne.name" :title="ligne.name">
                                </div>
                            </div>
                            <h4>Lignes de dribble</h4>
                            <div class="items-lignes">
                                <div class="ligne-li-div" v-for="(ligne, indexL) in dribleLignes" :key="indexL" @click="addArrow(ligne.name, ligne.image)">
                                    <img :src="require('~/assets/images/lignes/ligne_list/' + ligne.image)" :alt="ligne.name" :title="ligne.name">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-terrain">
                <div class="terrain-space" id="terrainSoccer" @click="clickTerrain($event)">
                    <div v-for="(object, indexObj) in lstObjectsDraggable" :key="indexObj" :id="object.id" :class="object.class" @click="selectObject(object.id, indexObj)">
                        <img :id="object.image.id" :src="require('~/assets/images/' + object.image.src)" v-if="object.type !== 'drag-text' && object.type !== 'drag-number' && object.type !== 'drag-forme'"/>
                        <div class="number-object" v-if="object.type === 'drag-number'">
                            <div class="circle"></div>
                            <div class="number">{{object.number}}</div>
                        </div>
                        <div :class="object.forme + ' forme-' + object.classColor" v-if="object.type === 'drag-forme' && !isFormeImg(object.forme)">        
                        </div>
                        <div :class="'forme-img ' + object.forme" v-if="object.type === 'drag-forme' && isFormeImg(object.forme)">
                            <img :src="require('~/assets/images/formes/' + object.forme + '-' + object.formeImgColor + '.png')"/>
                        </div>
                        <div class="text-input" v-if="object.type === 'drag-text'">
                            <input type="text" :class="object.classColor" :id="'input-text' + indexObj" v-model="object.text" name="name" autocomplete="off" @blur="verifyText(indexObj)">
                        </div>
                        <div class="text-player" v-if="object.textObject && object.textObject !== ''">
                            {{object.textObject}}
                        </div> 
                        <div class="rotate" v-if="indexObj === lastIndexObjectSelected && object.canRotate" @click="rotate()">
                            <font-awesome-icon :icon="['fas', 'redo']"/>
                        </div>
                    </div>
                </div>
                <div class="help">
                    <div class="question" :class="{'clicked' : showOptionsHelp}" @click="setShowOptionsHelp()">
                        <font-awesome-icon :icon="['fas', 'question']"/>
                    </div>
                    <div class="lst-options-help" v-show="showOptionsHelp">
                        <div class="options">
                            <div><div @click="showAstuces();setShowOptionsHelp()">Astuces</div></div>
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import GoHomeModal from '@/components/modals/GoHomeModal.vue'
import AddPlayerWithTextModal from '@/components/modals/AddPlayerWithTextModal.vue'
import DownloadSuccesModal from '@/components/modals/DownloadSuccesModal.vue'
import ModalOpenDesigner from '@/components/modals/ModalOpenDesigner.vue'

//enum pour le type d'actions
const ACTIONS = {
    ADD_OBJECT:'ADD_OBJECT', 
    DELETE_OBJECT:'DELETE_OBJECT', 
    DELETE_ALL:'DELETE_ALL', 
    CHANGE_COLOR:'CHANGE_COLOR'
};

const ID_TERRAIN = 'terrainSoccer';

//liste de formes permisses
const lstFormes = ['square', 'rectangle', 'triangle', 'circle'];

export default {
    props: ['from'],
    layout: 'designer',
    head(){
        return{
            title:'Créez votre exercice de soccer | ESsoccercoach',
            script:[
            ]
        }
    },
    computed:{
        joueurs(){
            return this.$store.state.esdesigner.listeJoueurs;
        },
        outils(){
            return this.$store.state.esdesigner.listeOutils;
        },
        lignes(){
            return this.$store.state.esdesigner.listeLignes;
        },
        terrains(){
            return this.$store.state.esdesigner.listeTerrains;
        },
        gardiens(){
            return this.$store.state.esdesigner.listeGardiens;
        },
        passLignes(){
            return this.$store.getters['esdesigner/passLignes'];
        },
        runLignes(){
            return this.$store.getters['esdesigner/runLignes'];
        },
        dribleLignes(){
            return this.$store.getters['esdesigner/dribleLignes'];
        },
        butOuils(){
            return this.$store.getters['esdesigner/outilButs'];
        },
        conesOutils(){
            return this.$store.getters['esdesigner/outilCones'];
        },
        ballonsOutils(){
            return this.$store.getters['esdesigner/outilBallons'];
        },
        othersOutils(){
            return this.$store.getters['esdesigner/outilAutres'];
        },
    },
    watch:{
        lstObjectsDraggable(){

            //vérifier si on peut afficher le bouton delete all
            if(this.lstObjectsDraggable.length > 0){    
                document.getElementById('deleteAll').classList.remove('inactive');
            }else{
                document.getElementById('deleteAll').classList.add('inactive');
            }
        },
        lstObjectsActions(){

            //vérifier si on peut afficher le bouton undo
            if(this.lstObjectsActions.length > 0){    
                document.getElementById('undo').classList.remove('inactive');
            }else{
                document.getElementById('undo').classList.add('inactive');
            }
        },
        lstRedoObjects(){

            //vérifier si on peut afficher le bouton undo
            if(this.lstRedoObjects.length > 0){    
                document.getElementById('redo').classList.remove('inactive');
            }else{
                document.getElementById('redo').classList.add('inactive');
            }
        }
    },
    data(){
        return{
            contentItem:'terrain',
            ongletTerrainSelected: 'sans-ligne',
            terrainSelected:'terrain11',
            lstObjectsDraggable:[],
            showSelectColors:false,
            colorSelected:'black',
            showSelectFormes:false,
            showSelectTransparence:false,
            rangeOpacity: 100,
            colorPlayer:undefined,
            objectSelected:undefined,
            lastIndexObjectSelected:undefined,
            numberSuite:0,
            lstObjectsActions:[],
            lstRedoObjects:[],
            lastObjectAddedUndo:undefined,
            typeFormeSelected:undefined,
            arrowPoints:{start:{x:0, y:0}, end:{x:0, y:0}, toAdd:false, idArrow:undefined},
            objectDragSelected:undefined,
            objectDOMCopied:undefined,
            showOptionsHelp:false,
            fromSeance:false,
        }
    },
    methods:{
        setShowOptionsHelp(){
            this.showOptionsHelp = this.showOptionsHelp ? false : true;
        },
        isFormeImg(forme){
            return ['triangle', 'circle'].includes(forme);
        },
        goHome(){
            this.$modal.show(
                GoHomeModal,
                {},
                {name : 'go-home-modal', classes:['modal-s']}
            );
        },
        goBack(){

            //go To DesignSeance
            localStorage.setItem('fromDesigner', JSON.stringify(true));
            this.$router.push({name: 'create-seance'});
        },
        closeAllSelectes(){ 
            this.showSelectColors = false;
            this.showSelectFormes = false;
            this.showSelectTransparence = false;
            this.showOptionsHelp = false;
        },
        selectContentItem(item){
            this.contentItem = item;
        },
        selectOngletTerrain(item){
            this.ongletTerrainSelected = item;
        },
        changeColor(color){
            $('.fa-fill').removeClass(this.colorSelected + '-color');
            this.colorSelected = color;
            $('.fa-fill').addClass(color + '-color');
            this.closeAllSelectes();
            this.lastAction = ACTIONS.CHANGE_COLOR;
        },
        setShowSelectColors(){
            //init autres selects
            this.showSelectFormes = false;
            this.showSelectTransparence = false;

            this.showSelectColors = this.showSelectColors ? false : true;
        },
        setShowSelectFormes(){
            //init autres selects
            this.showSelectColors = false;
            this.showSelectTransparence = false;

            this.showSelectFormes = this.showSelectFormes ? false : true;
        },
        setShowSelectTransparence(){
            if(this.objectSelected){

                //init autres selects
                this.showSelectColors = false;
                this.showSelectFormes = false;

                this.showSelectTransparence = this.showSelectTransparence ? false : true;
            }
        },
        editOpacityForme(){
            let object = this.objectSelected[0].children[0];
            let image = object.classList.contains('circle') || object.classList.contains('triangle') ?
                object.children[0] : object;
            image.style.opacity = this.rangeOpacity / 100;
        },
        addPlayerWithText(text){
            this.addObjectToList('drag-joueur', this.colorPlayer, 'joueurs/player-color-' + this.colorPlayer + '.png', false, text);
            this.textPlayer = '';
        },
        addOutil(outilName, outilImage) {
            let canRotate = outilName.includes('but');
            this.addObjectToList('drag-outil', outilName, 'outils/' + outilImage.replace('svg', 'png'), canRotate);
        },
        addPlayerWithTextByColor(color){
            this.colorPlayer = color;
            this.$modal.show(
                AddPlayerWithTextModal,
                {},
                {name : 'modal-add-player-with-text'}
            );
        },
        addPlayerImg(img, name){
            this.addObjectToList('drag-joueur-img', name, 'joueurs/' + img, true);
        },
        changeTerrain(image, name){
            document.getElementById('terrainSoccer').style.backgroundImage = 'url(' + require('~/assets/images/terrain/' + image) + ')';
            document.getElementById('terrainSoccer').style.backgroundRepeat  = 'no-repeat';
            this.terrainSelected = name;
        },
        addObjectToListeObjectActions(object, action, index, pointX, pointY){

            //vérifier si la liste a 5 objets. On sauvegarde les 5 dernières actions seulement.
            if(this.lstObjectsActions.length === 5){
                this.lstObjectsActions.shift();
            }

            //ajouter l'objet et l'action à la liste
            let objectAction = {
                object,
                action,
                index,
                pointX,
                pointY
            };
            this.lstObjectsActions.push(objectAction);
        },
        addObjectToList(type, idImage, srcImage, canRotate, textObject, formeObject, numberObject){
            let noObject = this.lstObjectsDraggable.length + 1;
            let object = {
                id:type + '-' + noObject,
                type: type,
                select:false,
                dataX:0,
                dataY:0,
                rotate:0,
                canRotate:canRotate,
                class: canRotate ? type + ' drag-rotate': type,
                text:'Text ...',
                textObject:textObject,
                forme:formeObject,
                number:numberObject,
                classColor:this.colorSelected + '-color',
                formeImgColor:this.colorSelected,
                idImage: idImage,
                image:{
                    id:idImage + '-' + noObject,
                    src:srcImage,
                    size:undefined,
                }
            };

            //vérifier si objet draggable
            let draggableClass = 'draggable';
            if(object.type === 'drag-forme'){
                let classForme = object.forme.includes('line') ? 'forme-' + object.forme: '';
                object.class += ' ' + classForme;
                
                if(object.forme === 'line-v'){
                    draggableClass = 'resize-drag-line-v';
                }else if(object.forme === 'line-h'){
                    draggableClass = 'resize-drag-line-h';
                }else{
                    draggableClass = 'resize-drag';
                }
            }else if(object.type === 'drag-arrow'){
                draggableClass = 'resize-drag-arrow';
            }
            object.class += ' ' + draggableClass;

            //vérifier si objet de type but
            if(object.image.id.includes('but')){
                object.class += ' but-object';
            }

            //vérifier si on objet existe avec le même id
            let isObjectExist = this.lstObjectsDraggable.find(o=>o.id === object.id);
            if(isObjectExist){
                console.log('object exist');
                noObject++;
                object = type + '-' + noObject; 
            }

            this.lstObjectsDraggable.push(object);

            this.deselectionner();
            this.closeAllSelectes();
            this.addObjectToListeObjectActions(object, ACTIONS.ADD_OBJECT, noObject-1);

            return object.id;
        },
        deselectionner(){
            let lastObjectSelected = $('.object-selected-outil');
            lastObjectSelected?.removeClass('object-selected-outil');  
        },
        addPlayerByColor(color){
            this.addObjectToList('drag-joueur', color, 'joueurs/player-color-' + color + '.png', false);
        },
        addPlayerGardienByColor(color){
            this.addObjectToList('drag-joueur', color, 'joueurs/player-gardien-' + color + '.png', false);
        },
        downloadExercice(){
            this.deselectionner();
            this.closeAllSelectes();
            this.setTextLoader('Téléchargement de l\'image en cours ...');
            this.setShowLoader(true);

            setTimeout(() => {
                let domElement = document.getElementById("terrainSoccer");    
                html2canvas(domElement, {
                    onrendered: (canvas) => {
                        Canvas2Image.saveAsPNG(canvas,undefined,undefined,'exercice_essoccercoach'); 
                        this.setShowLoader(false);
                        this.$modal.show(
                            DownloadSuccesModal,
                            {},
                            {name : 'download-succes-modal', classes:['modal-top'], clickToClose:false}
                        );
                    }
                });
            }, 2 * 1000);
        },
        saveExercice(){
            this.deselectionner();
            this.closeAllSelectes();
            this.setTextLoader('Sauvegarde de l\'exercice en cours ...');
            this.setShowLoader(true);

            const dowloadImage = new Promise((resolve) => {    
                let domElement = document.getElementById("terrainSoccer");
                html2canvas(domElement, {
                    onrendered: (canvas) =>{
                        var img = canvas.toDataURL('image/png');
                        this.setImageExercice(img);
                        resolve("Create");
                    }
                });
            });

            dowloadImage.then((val)=>{

                //goToDesignSeance
                localStorage.setItem('fromDesigner', JSON.stringify(true));
                this.setShowLoader(false);
                this.setTextLoader('');
                this.$router.push({name: 'create-seance'});

            });
        },
        selectObject(dragId, indexObj){
            this.objectSelected = $('#' + dragId);
            this.lastIndexObjectSelected = indexObj;

            this.objectDragSelected = this.lstObjectsDraggable[indexObj];

            //TOUT DESELECTIONNER
            let lastObjectSelected = $('.object-selected-outil');

            lastObjectSelected?.removeClass('object-selected-outil');

            let lastObject = this.lstObjectsDraggable.find(o => o.select);
            if(lastObject){
                lastObject.select = false;
            }

            this.lstObjectsDraggable[indexObj].select = true;

            //add class object-select-outil si ce n'est pas mode presentation
            this.objectSelected.addClass('object-selected-outil');

            //Init actions buttons
            document.getElementById('delete').classList.remove('inactive');          
            document.getElementById('copy').classList.remove('inactive');

            if(dragId.includes('drag-text')){
                document.getElementById('input-text' + indexObj).focus();
            }

            //vérifier si c'est une forme pour activer la sélection de la transparence
            let formeFinded = lstFormes.find(f => this.objectSelected[0].children[0].classList.value.includes(f));
            if(formeFinded){      
                document.getElementById('changeTransparence').classList.remove('inactive');

                //vérifier si la forme a une opacité
                this.rangeOpacity = this.objectSelected[0].children[0].style.opacity !== '' ? (parseFloat(this.objectSelected[0].children[0].style.opacity) * 100) : 100;
            }else{
                document.getElementById('changeTransparence').classList.add('inactive');
            }

            //vérifier si c'est un arrow pour activer le zoom de l'objet
            if(this.objectSelected[0].id.includes('arrow')){
                let height = this.objectSelected[0].style.height.replace('px', '');
                height = height !== '' ? parseInt(height) : 120;

                if(height < 180){
                    document.getElementById('plus').classList.remove('inactive');
                }
                
                if(height > 100){
                    document.getElementById('minus').classList.remove('inactive');
                }
            }
        },
        rotate(){
            if(this.objectSelected){
                //let object = this.objectSelected[0].classList.contains('drag-arrow') ?
                    //this.objectSelected[0] : this.objectSelected[0].children[0];

                let object = this.objectSelected[0].children[0];

                let rotate = object?.getAttribute('data-rotate');

                let x = object?.getAttribute('data-x');
                let y = object?.getAttribute('data-y');

                let deg = rotate ? parseInt(rotate, 10) : 0;
                deg = deg < 360 ? deg + 10 : 10;

                let translate =  x && y ? 'translate(' + x + 'px, ' + y + 'px)' : '';

                object.style.webkitTransform = 
                    object.style.transform = translate + ' rotate(' + deg + 'deg)';

                object.setAttribute('data-rotate', deg); 
            }
        },
        deselectionner(){
            let lastObjectSelected = $('.object-selected-outil');
            lastObjectSelected?.removeClass('object-selected-outil');

            this.objectSelected = null;
            this.lastIndexObjectSelected = undefined;
            document.getElementById('delete').classList.add('inactive');
            document.getElementById('copy').classList.add('inactive');
            document.getElementById('minus').classList.add('inactive');
            document.getElementById('plus').classList.add('inactive');
        },
        deleteObject() {
            if(this.objectSelected){
                let object = this.lstObjectsDraggable[this.lastIndexObjectSelected];
                    
                //vérifier si l'objet est de type number
                if(object.type === 'drag-number'){
                    this.numberSuite--;
                }

                this.addObjectToListeObjectActions(object, ACTIONS.DELETE_OBJECT,
                    this.lastIndexObjectSelected, this.objectSelected[0].getAttribute('data-x'), this.objectSelected[0].getAttribute('data-y'));

                this.objectSelected.remove();
                this.objectSelected = undefined;
                this.lastIndexObjectSelected =undefined;
                this.initActionsButtons();
            }
        },
        initActionsButtons(){
            document.getElementById('undo').classList.add('inactive');
            document.getElementById('redo').classList.add('inactive');
            document.getElementById('delete').classList.add('inactive');
            document.getElementById('deleteAll').classList.add('inactive');
            document.getElementById('copy').classList.add('inactive');
            document.getElementById('changeTransparence').classList.add('inactive');
        },
        deleteAll(){
            if(this.lstObjectsDraggable.length > 0){
                this.closeAllSelectes();
                $('.terrain-space').empty();
                this.initActionsButtons();
                this.objectSelected = null;
                this.lstObjectsDraggable = [];
                this.lastIndexObjectSelected = undefined;
                this.numberSuite = 0;

                this.lastAction = ACTIONS.DELETE_ALL;
            }
        },
        addNumber(){
            this.numberSuite++;
            this.addObjectToList('drag-number', undefined, undefined, false, undefined, undefined, this.numberSuite);
        },
        addText(){
            this.addObjectToList('drag-text', undefined, undefined, true);
        },
        verifyText(index){
            let value = this.lstObjectsDraggable[index].text;
            if(!value || value === ''){
                this.deleteObject();
            }
        },
        undo(){
            if(this.lstObjectsActions.length > 0){
                let lastObjectAction = this.lstObjectsActions.pop();
                let object = $(`#${lastObjectAction.object.id}`);

                if(!lastObjectAction.pointX && !lastObjectAction.pointY){
                    const pointX = object[0].getAttribute('data-x');
                    const pointY = object[0].getAttribute('data-y');
                    lastObjectAction.pointX = pointX;
                    lastObjectAction.pointY = pointY;
                }
                this.lstRedoObjects.push(lastObjectAction);

                switch (lastObjectAction.action) {
                    case ACTIONS.ADD_OBJECT:
                        if(lastObjectAction.object.type === 'drag-number'){
                            this.numberSuite--;
                        }
                        object.remove();
                        break;
                    case ACTIONS.DELETE_OBJECT:
                        this.lstObjectsDraggable.push(lastObjectAction.object);
                        this.lastObjectAddedUndo = lastObjectAction;
                        break;
                    case ACTIONS.DELETE_ALL:
                            
                        break;
                    case ACTIONS.CHANGE_COLOR:
                            
                        break;
                    default:
                        break;
                }
            }
        },
        redo(){
            if(this.lstRedoObjects.length > 0){
                let lastObjectAction = this.lstRedoObjects.pop();
                let object = $(`#${lastObjectAction.object.id}`);
                switch (lastObjectAction.action) {
                    case ACTIONS.ADD_OBJECT:
                        this.lstObjectsDraggable.push(lastObjectAction.object);
                        this.lastObjectAddedUndo = lastObjectAction;
                        break;
                    case ACTIONS.DELETE_OBJECT:
                        if(lastObjectAction.object.type === 'drag-number'){
                            this.numberSuite--;
                        }
                        object.remove();
                        break;
                    case ACTIONS.DELETE_ALL:
                            
                        break;
                    case ACTIONS.CHANGE_COLOR:
                            
                        break;
                    default:
                        break;
                }
            }
        },
        addForm(form){
            this.addObjectToList('drag-forme', form, undefined, false, undefined, form);
        },
        makeCopy(){
            const objectCopy = this.objectDragSelected;
            const imageObect = objectCopy.image;

            //sauvegarder l'element du DOM qui a été copié
            this.objectDOMCopied = {
                objectCopied : this.objectSelected[0]
            };

            //ajouter l'objet dans la liste
            const objectCopiedId = this.addObjectToList(objectCopy.type, objectCopy.idImage, imageObect.src, 
                objectCopy.canRotate, objectCopy.textObject, objectCopy.forme, objectCopy.numberObject);

            this.objectDOMCopied.idCopied = objectCopiedId;
        },
        makeArrow(){
            const noObject = this.lstObjectsDraggable.length + 1;
            let object = {
                id:'drag-arrow-' + noObject,
                type: 'drag-arrow',
                dataX:0,
                dataY:0,
                rotate:0,
                canRotate:false,
                class: 'drag-arrow draggable',
                classColor:this.colorSelected + '-color',
                image:{
                    id:undefined,
                    src:undefined,
                    size:undefined,
                }
            };
            this.arrowPoints.idArrow = object.id;
            this.lstObjectsDraggable.push(object);
        },
        clickTerrain(event){
            if(event.target.id === ID_TERRAIN){
                this.deselectionner();  
                this.closeAllSelectes();
            }
        },
        addArrow(name, image){
            this.addObjectToList('drag-arrow', name, 'lignes/' + image.replace('svg', 'png'), true);
        },
        showAstuces(){
            this.$modal.show(
                ModalOpenDesigner,
                {},
                {name : 'open-designer-modal', classes:['modal-lg'], clickToClose:false}
            );
        },
        plus(){
            let height = this.objectSelected[0].style.height.replace('px', '');
            height = height !== '' ? parseInt(height) : 120;

            if(height < 180){
                this.objectSelected[0].style.height =  (height + 10) + 'px';
                if(document.getElementById('minus').classList.contains('inactive')){    
                    document.getElementById('minus').classList.remove('inactive');
                }
            }else{
                document.getElementById('plus').classList.add('inactive');
            }
        },
        minus(){
            let height = this.objectSelected[0].style.height.replace('px', '');
            height = height !== '' ? parseInt(height) : 120;

            if(height > 100){
                this.objectSelected[0].style.height =  (height - 10) + 'px';
                if(document.getElementById('plus').classList.contains('inactive')){    
                    document.getElementById('plus').classList.remove('inactive');
                }
            }else{
                document.getElementById('minus').classList.add('inactive');
            }
        },
        ...mapMutations({setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader', setImageExercice:'seance/setImageExercice'})
    },
    created(){
        this.setShowLoader(true);
        this.setClassLoader('open-designer');
        this.setTextLoader('ESsoccercoach');

        this.$root.$on('addText', (text) => {
            if(text){
                this.addPlayerWithText(text);
            }
        });

    },
    mounted(){
        let globalThis = this;
        
        //detecter tous les clicks qui se font dans terrainSoccer
        $('.logo').click(event =>{
            this.deselectionner();
            this.closeAllSelectes();  
        });

        $('.fa-fill').addClass('black-color');

        //afficher tous les icônes à l'écran
        printAllIcons();

        
        this.fromSeance = JSON.parse(localStorage.getItem('isCreateSeance')) || false;

        setTimeout(() => {

            if(!this.fromSeance){          
                //afficher la modale des astuces
                const showOpenDesignerModal = JSON.parse(sessionStorage.getItem('showOpenDesignerModal'));
                if(!showOpenDesignerModal){
                    const infosParsed = JSON.stringify({showOpenDesignerModal:true});
                    sessionStorage.setItem('showOpenDesignerModal', infosParsed);
                    this.showAstuces();
                }
            }

            this.setShowLoader(false);
            this.setClassLoader('');
        },  3* 1000);
    },
    updated(){

        //modifier l'objet undo ou redo
        if(this.lastObjectAddedUndo){

            //déplacer l'objet à l'endroit où il était avant la suppression
            const x = this.lastObjectAddedUndo.pointX;
            const y = this.lastObjectAddedUndo.pointY;
            let object = document.getElementById(this.lastObjectAddedUndo.object.id);
            object.style.webkitTransform = object.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
            object.setAttribute('data-x', x);
            object.setAttribute('data-y', y);

            //init le dernier objet ajouté par undo
            this.lastObjectAddedUndo = undefined;
        }

        //modifier l'objet copié
        if(this.objectDOMCopied){
            
            //ajuster taille de la forme
            let objectCopied = document.getElementById(this.objectDOMCopied.idCopied);
            objectCopied.style.height = this.objectDOMCopied.objectCopied.style.height;
            objectCopied.style.width = this.objectDOMCopied.objectCopied.style.width;

            //ajuster l'opacité de la forme
            let object = this.objectDOMCopied.objectCopied.children[0];
            if(object.classList.contains('circle') || object.classList.contains('triangle')){
                objectCopied.children[0].children[0].style.opacity = object.children[0].style.opacity;
            }else{
                objectCopied.children[0].style.opacity = object.style.opacity;
            }
            

            this.objectDOMCopied = undefined;
        }
    },
    beforeDestroy(){

        //supprimer les objets sauvegardés en localstorage
        localStorage.removeItem('isCreateSeance');
    },
}
</script>