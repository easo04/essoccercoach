<template>
    <div class="creation-exercice">
        <div class="menu-top">
            <div class="principal-items">
                <span @click="goHome()" class="icon-action"><i class="fas fa-home" title="Retourner à l'accueil"></i></span>
                <div class="actions-s">
                    <span class="icon-action inactive" id="undo" @click="undo()"><i class="fas fa-undo" title="Undo"></i></span>
                    <span class="icon-action inactive" id="redo" @click="redo()"><i class="fas fa-redo" title="Rdo"></i></span>
                </div>
            </div>
            <div class="secondary-items">
                <div class="first-items">
                    <span class="icon-action inactive" id="delete" @click="deleteObject()"><i class="fas fa-eraser" title="Effacer"></i></span>
                    <span class="icon-action inactive" id="deleteAll" @click="deleteAll()"><i class="fas fa-trash-alt" title="Tout supprimer"></i></span>
                </div>
                <div class="second-items">
                    <span class="icon-action" @click="addText()"><i class="fas fa-font" title="Ajouter texte"></i></span>
                    <div class="add-number" id="addNumber" title="Ajouter un compteur" @click="addNumber()"><i class="fas fa-circle" title="Ajouter compteur"></i><span class="number">1</span></div>
                    <span class="objects icon-action" title="Ajouter forme" @click="setShowSelectFormes()"><i class="far fa-circle"></i><i class="fas fa-sort-down"></i></span>
                    <span class="objects icon-action" title="Changer la couleur" @click="setShowSelectColors()"><i class="fas fa-fill couleur-select"></i><i class="fas fa-sort-down"></i></span>
                    <span class="objects icon-action" title="Changer la transparence" @click="setShowSelectTransparence()"><span class="transparence-select">{{rangeOpacity}}%</span><i class="fas fa-sort-down"></i></span>
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
                            <div class="item-forme"> 
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#circle-stroke"/>
                                </svg> Cercle
                            </div>
                            <div class="item-forme">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#square-stroke"/>
                                </svg> Rectangle
                            </div>
                            <div class="item-forme">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#triangle-stroke"/>
                                </svg> Triangle
                            </div>
                            <div class="item-forme">
                                <svg class="icon">
                                    <use href="@/assets/images/icons/icons.svg#line-v-solid"/>
                                </svg> Ligne verticale
                            </div>
                            <div class="item-forme">
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
                    <span class="icon-action inactive" id="copy"><i class="fas fa-copy" title="Faire une copie"></i></span>
                    <span class="icon-action inactive" id="minus"><i class="fas fa-search-minus" title="Zoom moins"></i></span>
                    <span class="icon-action inactive" id="plus"><i class="fas fa-search-plus" title="Zoom plus"></i></span>
                </div>
            </div>
            <div class="actions">
                <span @click="downloadExercice()"><i class="fas fa-download download" title="Télécharger"></i></span>
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
                        <div class="items-outils">
                            <div class="outil-li-div" v-for="(outil, indexO) in outils" :key="indexO" @click="ajouterOutil(outil.name, outil.image)">
                                <img :src="require('~/assets/images/outils/outils_list/' + outil.image)" :alt="outil.name" :title="outil.name">
                            </div>
                        </div>
                    </div>
                    <div class="content-item-lignes" v-if="contentItem === 'ligne'">
                        <h3>Lignes</h3>
                        <div class="items-lignes">
                            <div class="ligne-li-div" v-for="(ligne, indexL) in lignes" :key="indexL">
                                <img :src="require('~/assets/images/lignes/ligne_list/' + ligne.image)" :alt="ligne.name" :title="ligne.name">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-terrain">
                <div class="terrain-space" id="terrainSoccer">
                    <div v-for="(object, indexObj) in lstObjectsDraggable" :key="indexObj" :id="object.id" class="draggable" :class="object.class" @click="selectObject(object.id, indexObj)">
                        <img :id="object.image.id" :src="require('~/assets/images/' + object.image.src)" v-if="object.type !== 'drag-text' && object.type !== 'drag-number'"/>
                        <div class="number-object" v-if="object.type === 'drag-number'">
                            <img :id="object.image.id" src="~/assets/images/joueurs/player-color-black.png"/>
                            <div class="number">{{object.number}}</div>
                        </div>
                        <div class="text-input" v-if="object.type === 'drag-text'">
                            <input type="text" :class="object.classColor" :id="'input-text' + indexObj" v-model="object.text" name="name" autocomplete="off" @blur="verifyText(indexObj)">
                        </div>
                        <div class="text-player" v-if="object.textObject && object.textObject !== ''">
                            {{object.textObject}}
                        </div> 
                        <div class="rotate" v-if="indexObj === lastIndexObjectSelected && object.canRotate" @click="rotate()">
                            <i class="fas fa-redo"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import GoHomeModal from '@/components/modals/GoHomeModal.vue'
import AddPlayerWithTextModal from '@/components/modals/AddPlayerWithTextModal.vue'

//enum pour le type d'actions
const ACTIONS = {
    ADD_OBJECT:'ADD_OBJECT', 
    DELETE_OBJECT:'DELETE_OBJECT', 
    DELETE_ALL:'DELETE_ALL', 
    CHANGE_COLOR:'CHANGE_COLOR'
}

export default {
    props: ['from'],
    layout: 'designer',
    head(){
        return{
            title:'Créez votre exercice de soccer | ESsoccercoach',
            script:[
                {src:'/imports/interact.js'},
                {src:'/imports/jspdf.min.js'},
                {src:'/imports/canvas2image.js'},
                {src:'/drag.js'},
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
            lastObjectAddedUndo:undefined
        }
    },
    methods:{
        goHome(){
            this.$modal.show(
                GoHomeModal,
                {},
                {name : 'go-home-modal', classes:[]}
            );
        },
        closeAllSelectes(){ 
            this.showSelectColors = false;
            this.showSelectFormes = false;
            this.showSelectTransparence = false;
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
            //init autres selects
            this.showSelectColors = false;
            this.showSelectFormes = false;

            this.showSelectTransparence = this.showSelectTransparence ? false : true;
        },
        editOpacityForme(){

        },
        addPlayerWithText(text){
            this.addObjectToList('drag-joueur', this.colorPlayer, 'joueurs/player1-' + this.colorPlayer + '.png', false, text);
            this.textPlayer = '';
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
                image:{
                    id:idImage + '-' + noObject,
                    src:srcImage,
                    size:undefined,
                }
            };

            //vérifier si on objet existe avec le même id
            let isObjectExist = this.lstObjectsDraggable.find(o=>o.id === object.id);
            if(isObjectExist){
                console.log('onject exist');
                noObject++;
                object = type + '-' + noObject; 
            }

            this.lstObjectsDraggable.push(object);

            this.deselectionner();
            this.closeAllSelectes();
            this.addObjectToListeObjectActions(object, ACTIONS.ADD_OBJECT, noObject-1);
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
            //this.setTextSpinner('Téléchargement de l\'image en cours ...');
            //this.setShowSpinner(true);

            let globalThis = this;

            setTimeout(() => {
                let domElement = document.getElementById("terrainSoccer");
                html2canvas(domElement, {
                    onrendered: function(canvas) {
                        Canvas2Image.saveAsPNG(canvas,undefined,undefined,'exercice'); 
                        //globalThis.setShowSpinner(false);
                    }
                });
            }, 2 * 1000);
        },
        ajouterOutil(outilName, outilImage) {
            let canRotate = outilName.includes('but');
            this.addObjectToList('drag-outil', outilName, 'images/outils/' + outilImage, true);
        },
        selectObject(dragId, indexObj){
            this.objectSelected = $('#' + dragId);
            this.lastIndexObjectSelected = indexObj;

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

            //vérifier si c'est une forme pour afficher les couleurs
            //this.typeFormeSelected = this.lstFormes.find(f => this.objectSelected[0].children[0].id.includes(f));
            //this.showBtnRemplir = this.typeFormeSelected ? true : false;
            
            //vérifier si la forme a une opacité
            //this.rangeOpacity = this.typeFormeSelected && this.objectSelected[0].children[0].style.opacity !== '' ? (parseFloat(this.objectSelected[0].children[0].style.opacity) * 100) : 100;
        },
        rotate(){
            if(this.objectSelected){
                let rotate = this.objectSelected[0].children[0]?.getAttribute('data-rotate');

                let deg = rotate ? parseInt(rotate, 10) : 0;
                deg = deg < 360 ? deg + 10 : 10;

                this.objectSelected[0].children[0].style.webkitTransform = 
                    this.objectSelected[0].children[0].style.transform = 'rotate(' + deg + 'deg)';

                this.objectSelected[0].children[0].setAttribute('data-rotate', deg); 
            }
        },
        deselectionner(){
            let lastObjectSelected = $('.object-selected-outil');
            lastObjectSelected?.removeClass('object-selected-outil');

            this.objectSelected = null;
            this.lastIndexObjectSelected = undefined;
            document.getElementById('delete').classList.add('inactive');
            document.getElementById('copy').classList.add('inactive');
        },
        deleteObject() {
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
        },
        initActionsButtons(){
            document.getElementById('undo').classList.add('inactive');
            document.getElementById('redo').classList.add('inactive');
            document.getElementById('delete').classList.add('inactive');
            document.getElementById('deleteAll').classList.add('inactive');
            document.getElementById('copy').classList.add('inactive');
        },
        deleteAll(){
            this.closeAllSelectes();
            $('.terrain-space').empty();
            this.initActionsButtons();
            this.objectSelected = null;
            this.lstObjectsDraggable = [];
            this.lastIndexObjectSelected = undefined;
            this.numberSuite = 0;

            this.lastAction = ACTIONS.DELETE_ALL;
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
    },
    created(){
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
            globalThis.deselectionner();
            globalThis.closeAllSelectes();  
        });

        //detecter tous les clicks qui se font dans terrainSoccer
        $('#terrainSoccer').click(event =>{
            if(event.target.id === 'terrainSoccer'){
                globalThis.deselectionner();  
                globalThis.closeAllSelectes();
            }
        });

        $('.fa-fill').addClass('black-color');

        //afficher tous les icônes à l'écran
        printAllIcons();

        /*this.$modal.show(
            GoHomeModal,
            {text: 'This text is passed as a property'},
            {name : 'go-home-modal', classes:['modal-lg']}
        );*/
    },
    updated(){
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
    },
    beforeDestroy(){
    },
    beforeRouteLeave(){
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
            next()
        } else {
            next(false)
        }
    }
}
</script>