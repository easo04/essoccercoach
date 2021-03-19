<template>
    <div class="create-seance">
        <div class="contenant" v-if="!showLoading">
            <div class="steps">
                <div class="steps-content">     
                    <div class="back-home"><a @click="goHome()" class="link"><font-awesome-icon :icon="['fas', 'home']"/> Retournez à l'accueil</a></div>
                    <h2>Séance d'entraînement</h2>
                    <div class="lst-steps">
                        <div class="lst-steps-content">
                            <div class="step" :class="{'active' : step.current, 'completed': step.completed}" v-for="(step, i) in lstSteps" :key="i">
                                <div class="step-content">    
                                    <div class="number" v-if="step.name !== 'download'">{{i+1}}</div>
                                    <div class="number" v-else><font-awesome-icon :icon="['fas', 'file-download']"/></div>
                                    <span class="name">{{step.label}}</span>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            <div class="content">
                <div v-if="currentStep === 'informations'">
                    <h3>Ajoutez les informations de la séance</h3>
                    <div class="form-content">
                        <div class="form-group">
                            <label class="label-control" for="addText">Thème (Obligatoire): </label>
                            <input type="text" name="addText" class="form-control" v-model="seance.theme" />
                        </div>
                        <div class="form-group-flex">
                            <div class="form-group">
                                <label class="label-control" for="addText">Durée: </label>
                                <input type="text" name="addText" class="form-control" v-model="seance.time" />
                            </div>
                            <div class="form-group">
                                <label class="label-control" for="addText">Date: </label>
                                <input type="text" name="addText" class="form-control" v-model="seance.date" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label-control" for="addText">Entraîneur: </label>
                            <input type="text" name="addText" class="form-control" v-model="seance.coach" />
                        </div>
                        <div class="form-group">
                            <label class="label-control" for="addText">Équipe: </label>
                            <input type="text" name="addText" class="form-control" v-model="seance.team" />
                        </div>
                        <div class="form-group">
                            <label class="label-control" for="addText">Terrain: </label>
                            <input type="text" name="addText" class="form-control" v-model="seance.terrain" />
                        </div>
                    </div>
                </div>
                <div v-if="currentStep === 'exercices'">
                    <h3>
                        Ajoutez les exercices de la séance
                        <span class="compteur" v-if="exercices.length > 0">
                            ({{exercices.length}}/4)
                        </span>
                    </h3>
                    <div class="add-exercice">
                        <button class="btn btn-default" @click="setShowAddExerciceOptions()" :class="{'disabled':exercices.length === 4}" :disabled="exercices.length === 4">Exercice <font-awesome-icon :icon="['fas', 'plus']"/></button>
                        <div class="options-add-exercice" v-if="showAddExerciceOptions">
                            <div @click="addExercicePopular()">Populaires <font-awesome-icon :icon="['fas', 'star']"/></div>
                            <div @click="addExercice()">Nouveau <font-awesome-icon :icon="['fas', 'plus-circle']"/></div>
                        </div>
                    </div>
                    <div class="lst-exerices">
                        <div class="exercice-vide exercice-item" v-if="exercices.length === 0">
                            <div>
                                Aucun exercice ajouté
                                <p>Vouz pouvez ajouter jusqu'à 4 exercices à votre séance</p>
                            </div>
                        </div>
                        <div class="exercice-item" v-for="(exercice, i) in exercices" :key="i">
                            <div class="exercice-description">
                                <h4>{{exercice.theme}}</h4>   
                                <div class="time-players">
                                    <span v-if="exercice.players" class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>{{exercice.players}}</span></span>
                                    <span v-if="exercice.time" class="icon-text"><font-awesome-icon :icon="['fas', 'clock']"/><span>{{exercice.time}}</span></span>
                                </div>
                                <p>{{exercice.description}}</p>
                            </div>
                            <div class="exercice-image">
                                <img :src="getImageHttpsFormat(exercice.image)" v-if="exercice.popular"/>
                                <img :src="exercice.image" v-else/>
                            </div>
                            <div class="exercice-options" title="Options de l'exercice" @click="setShowListOptions(i)"><font-awesome-icon :icon="['fas', 'ellipsis-v']"/></div>
                            <div class="exercice-options-list" v-if="optionsExercice[i] !== undefined && optionsExercice[i].showListOptions">
                                <div @click="updateExercice(exercice, i)">Modifier</div>
                                <div @click="deleteExerciceItem(i)">Supprimmer</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentStep === 'download'">
                    <div class="actions-download">
                        <h3>Télechargez la séance en format pdf</h3>
                        <span class="telecharger" @click="telechargerPDF()"><font-awesome-icon :icon="['fas', 'download']"/></span>
                        <button class="btn btn-default btn-download-pdf" @click="telechargerPDF()">Télécharger <font-awesome-icon :icon="['fas', 'download']"/></button>
                    </div>
                    <div class="seance-generated">
                        <div id="seance">
                            <div class="informations-seance" id="infos-seance">
                                <h4>{{seance.theme}}</h4>
                                <div class="infos-seance">
                                    <span v-if="seance.time" class="icon-text"><span class="label">Durée: </span><span>{{seance.time}}</span></span>
                                    <span v-if="seance.date" class="icon-text"><span class="label">Date: </span><span>{{seance.date}}</span><br></span>
                                    <span v-if="seance.coach" class="icon-text"><span class="label">Entraîneur: </span><span>{{seance.coach}}</span></span>
                                    <span v-if="seance.team" class="icon-text"><span class="label">Équipe: </span><span>{{seance.team}}</span></span>
                                    <span v-if="seance.terrain" class="icon-text"><span class="label">Terrain: </span><span>{{seance.terrain}}</span></span>
                                </div>
                            </div>
                            <div class="lst-exerices">
                                <div class="exercice-item exercice-generate" v-for="(exercice, i) in exercices" :key="i" :id="'exercice-item-' + i">
                                    <div class="exercice-description">
                                        <h4>{{exercice.theme}}</h4>             
                                        <div class="time-players">
                                            <span v-if="exercice.players" class="icon-text"><span class="label">Joueurs: </span><span>{{exercice.players}}</span></span>
                                            <span v-if="exercice.time" class="icon-text"><span class="label">Durée: </span><span>{{exercice.time}}</span></span>
                                        </div>
                                        <p>{{exercice.description}}</p>
                                    </div>
                                    <div class="exercice-image">
                                        <img :src="getImageHttpsFormat(exercice.image)" v-if="exercice.popular"/>
                                        <img :src="exercice.image" v-else/>
                                    </div>
                                    <div class="exercice-number">{{i+1}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <div class="btns">
                        <button class="btn btn-default-ghost" @click="previous()" v-if="currentStep === 'exercices'">Précédent</button>
                        <button class="btn btn-default" @click="next()" v-if="currentStep !== 'download'" :class="{'disabled' : isBtnNextDisabled()}" :disabled="isBtnNextDisabled()">Suivant</button>
                        <a class="link" @click="updateSeance()" v-if="currentStep === 'download'">Modifier la séance d'entraînement</a>
                    </div>
                </div>
                <div class="help">
                    <a href="/help/seances" target="_blank">
                        <div class="question" @click="setShowOptionsHelp()">
                            <font-awesome-icon :icon="['fas', 'question']"/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
import GoHomeModal from '@/components/modals/GoHomeModal.vue';
import AddExerciceModal from '@/components/modals/AddExerciceModal.vue';
import DownloadSeanceSuccesModalVue from '../components/modals/DownloadSeanceSuccesModal.vue';
import AddExercicesPopulairesModalVue from '../components/modals/AddExercicesPopulairesModal.vue';
export default {
    layout: 'designer-seance',
    props:['fromDesign'],
    head(){
        return{
            title:'Créez votre séance de soccer | ESsoccercoach',
            script:[
                {src:'/imports/interact.js'},
                {src:'/imports/jspdf.min.js'},
                {src:'/imports/canvas2image.js'},
            ]
        }
    },
    data(){
        return{
            currentStep:'informations',
            noStep:1,
            seance:{
                theme:undefined,
                time:undefined,
                date:undefined,
                coach:undefined,
                team:undefined,
                terrain:undefined,
                exercices:[],
            },
            optionsExercice:[],
            showAddExerciceOptions:false,
            exercicesPopulaires:[],
            showOptionsHelp:false
        }
    },
    computed:{
        showLoading(){
            return this.$store.state.showLoader;
        },
        lstSteps(){
            return this.$store.state.seance.steps;
        },
        exercices(){
            return this.$store.state.seance.exercices;
        }
    },
    watch:{
        exercices(){
            if(this.exercices.length > 0){
                this.optionsExercice = [];
                this.exercices.forEach(exe =>{ 
                    const option = {
                        showListOptions : false,
                    };
                    this.optionsExercice.push(option);
                });
            }
        }
    },
    methods:{
        getImageHttpsFormat(url){
            return url.replace('http', 'https');
        },
        setShowOptionsHelp(){
            this.showOptionsHelp = !this.showOptionsHelp;
        },
        setShowAddExerciceOptions(){
            this.showAddExerciceOptions = !this.showAddExerciceOptions;
        },
        closeAllsSelects(currentIndex){
            this.optionsExercice.forEach((option, index) => {
                if(currentIndex === undefined || (currentIndex !== undefined && index !== currentIndex)){
                    option.showListOptions = false;
                }
            });
            this.showAddExerciceOptions = false;
        },
        setShowListOptions(index){
            this.closeAllsSelects(index);

            let newArray = [...this.optionsExercice];
            if(newArray[index]){
                newArray[index].showListOptions = !this.optionsExercice[index].showListOptions;
                this.optionsExercice = newArray;
            }
        },
        scrollTop(){
            //scrollTop with jquery
            jQuery('html, body').animate({scrollTop: 0}, 200);
        },
        goHome(){
            this.$modal.show(
                GoHomeModal,
                {},
                {name : 'go-home-modal', classes:['modal-s']}
            );
        },
        next(){
            this.closeAllsSelects();
            this.setStepCompleted({name:this.currentStep, completed:true});
            this.noStep++;
            const currentStep = this.lstSteps.find(s=>s.order === this.noStep);
            this.currentStep = currentStep.name;
            this.setCurrentState(currentStep.name);

            this.setSeance(this.seance);
        },
        previous(){

            this.setStepCompleted({name:this.currentStep, completed:false});
            this.noStep--;
            const currentStep = this.lstSteps.find(s=>s.order === this.noStep);
            this.currentStep = currentStep.name;
            this.setCurrentState(currentStep.name);
        },
        isBtnNextDisabled(){
            let result = false;
            switch (this.currentStep) {
                case 'informations':
                    result = this.seance.theme === undefined || this.seance.theme === '';
                    break;
                case 'exercices':
                    result = this.exercices.length === 0;
                    break;
            }
            return result;
        },
        updateExercice(exercice, i){
            let exerciceScope = {...exercice};
            exerciceScope.index = i;
            this.closeAllsSelects();
            this.$modal.show(
                AddExerciceModal,
                {exerciceUpdate:exerciceScope},
                {name : 'add-exercice-modal', classes:['modal-lg2'], clickToClose:false}
            );
        },
        addExercice(){
            this.scrollTop();
            this.showAddExerciceOptions = false;
            if(this.exercices.length < 5){      
                this.$modal.show(
                    AddExerciceModal,
                    {},
                    {name : 'add-exercice-modal', classes:['modal-lg2'], clickToClose:false, scrollable:true, height:'auto'}
                );
            }
        },
        addExercicePopular(){
            this.scrollTop();
            this.showAddExerciceOptions = false;
            if(this.exercices.length < 5){      
                this.$modal.show(
                    AddExercicesPopulairesModalVue,
                    {},
                    {name : 'add-exercice-populars-modal', classes:['modal-lg2'], clickToClose:false, scrollable:true, height:'auto'}
                );
            }
        },
        getCanvasImageExercice(exercice){
            return new Promise((resolve, reject) =>{
                html2canvas(exercice, {
                    onrendered: (canvas) =>{
                        console.log(canvas)
                        const image = canvas.toDataURL('image/png');
                        const response = {
                            height: canvas.height,
                            width: canvas.width,
                            image: image
                        };
                        resolve(response);
                    }
                });
            });
        },
        getListExercicesImages(){
            return new Promise((resolve, reject) =>{
                let exercices = document.getElementsByClassName('exercice-generate');
                let responses = [];
                let comp = 0;
                exercices.forEach(exe =>{
                    this.getCanvasImageExercice(exe).then(response =>{
                        responses.push(response);
                        comp++;
                        if(comp === exercices.length){
                            return resolve(responses)
                        }
                    });
                })
            })
        },
        async telechargerPDF(){
            this.scrollTop();
            const now = new Date();
            const currentYear = now.getFullYear();

            //setTimeout(() => {
                //let domElement = document.getElementById("seance");

                const infosSeance = document.getElementById("infos-seance");
                const canvasInfoSeance = await this.getCanvasImageExercice(infosSeance);

                const canvasExercices = await this.getListExercicesImages();

                let pdf = new jsPDF();
                const pointX = 11;
                const pointY = 5;
                const endPointY = 290;
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(pointX, endPointY, 'Séance d\'entraînement créée par essoccercoach.com'); 
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(150, endPointY, `© Copyrigth ESsoccerCoach  ${currentYear}`); 

                //add infos séance
                pdf.addImage(canvasInfoSeance.image, 'JPEG', pointX, pointY);
                
                let lastPointY = pointY + canvasInfoSeance.height;

                //add exercices 
                canvasExercices.forEach((canvas, index) => {
                    
                    //s'il y a plus de 2 exercices et que l'hauteur de l'image est > 300
                    //il faut ajouter une nouvelle page
                    if(index >= 2 && canvas.height > 300){
                        pdf.addPage();
                        lastPointY = pointY;
                    }
                    pdf.addImage(canvas.image, 'JPEG', pointX, lastPointY);
                    lastPointY = 120;
                });

                //vérifier si une nouvelle page a été ajoutée
                if(pdf.internal.getNumberOfPages() > 1){
                    pdf.setFontSize(9);
                    pdf.setTextColor(100);
                    pdf.text(10,290, 'Séance d\'entraînement créée par essoccercoach.com'); 
                    pdf.setFontSize(9);
                    pdf.setTextColor(100);
                    pdf.text(150,290, `© Copyrigth ESsoccerCoach  ${currentYear}`);
                }

                pdf.setProperties({
                    title: 'Entraînement de soccer',
                    subject: '',		
                    author: 'ESsoccercoach',
                    creator: 'ESsoccercoach'
                });

                pdf.save('entrainement.pdf');

                /*html2canvas(domElement, {
                    onrendered: (canvas) =>{
                        let img = canvas.toDataURL('image/png');
                        let pdf = new jsPDF();
                        pdf.addImage(img, 'JPEG', 11, 5);
                        pdf.setFontSize(9);
                        pdf.setTextColor(100);
                        pdf.text(10,290, 'Séance d\'entraînement créée par essoccercoach.com'); 
                        pdf.setFontSize(9);
                        pdf.setTextColor(100);
                        pdf.text(150,290, `© Copyrigth ESsoccerCoach  ${currentYear}`); 

                        pdf.setProperties({
                            title: 'Entraînement de soccer',
                            subject: '',		
                            author: 'ESsoccercoach',
                            creator: 'ESsoccercoach'
                        });

                        pdf.save('entrainement.pdf');

                        this.$modal.show(
                            DownloadSeanceSuccesModalVue,
                            {},
                            {name : 'download-seance-succes-modal', classes:['modal-top'], clickToClose:false}
                        );
                    }
                });*/
            //}, 2 * 1000);
        },
        updateSeance(){
            this.noStep = 1;
            this.currentStep = 'informations';
            this.setCurrentState(this.currentStep);
            this.setAllStepsNotCompleted();
        },
        deleteExerciceItem(index){
            this.deleteExercice(index);
            this.closeAllsSelects();
        },
        ...mapMutations({setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader', setCurrentState:'seance/setCurrentState', setStepCompleted:'seance/setStepCompleted',
            setSeance:'seance/setSeance', setListExercices:'seance/setListExercices', deleteExercice:'seance/deleteExercice', setAllStepsNotCompleted : 'seance/setAllStepsNotCompleted'})
    },
    created(){
    },
    mounted(){  
        if(!localStorage.getItem('fromDesigner')){          
            this.setShowLoader(true);
            this.setClassLoader('open-designer');
            this.setTextLoader('ESsoccercoach');
        }

        this.scrollTop();
        
        const fromDesigner = JSON.parse(localStorage.getItem('fromDesigner'));
        if(fromDesigner){
            let seanceLocale = JSON.parse(localStorage.getItem('seanceLocale'));

            //initialiser les steps
            this.noStep = seanceLocale.currentStep.order;
            this.currentStep = seanceLocale.currentStep.name;
            this.setCurrentState(this.currentStep);
            seanceLocale.stepsCompleted.map(step =>{
                this.setStepCompleted({name:step.name, completed:true});
            });

            //initialiser la seance
            this.seance = seanceLocale.seance;

            //initialiser les exerices
            this.setListExercices(seanceLocale.exercices);

            //ouvrir modale d'ajout d'exercice
            this.$modal.show(
                AddExerciceModal,
                {withData:true},
                {name : 'add-exercice-modal', classes:['modal-lg2'], clickToClose:false}
            );

            
            //supprimer les objets sauvegardés en localstorage
            localStorage.removeItem('fromDesigner'); 
        }

        this.$root.$on('newSeance', () =>{

            //init all stores
            this.setCurrentState('informations');
            this.setSeance({});
            this.setAllStepsNotCompleted();
            this.setListExercices([]);

            this.currentStep = 'informations';
            this.noStep = 1;
            this.seance = {
                theme:undefined,
                time:undefined,
                date:undefined,
                coach:undefined,
                team:undefined,
                terrain:undefined,
                exercices:[]
            };
        });

        setTimeout(() => {
            this.setShowLoader(false);
            this.setClassLoader('');      
        },  3* 1000);
    },
    beforeDestroy(){
    }

}
</script>
