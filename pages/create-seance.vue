<template>
    <div class="create-seance">
        <div class="contenant">
            <div class="steps">
                <div class="steps-content">     
                    <div class="back-home"><a @click="goHome()" class="link"><i class="fas fa-home"></i> Retournez à l'accueil</a></div>
                    <h2>Séance d'entraînement</h2>
                    <div class="lst-steps">
                        <div class="step" :class="{'active' : step.current, 'completed': step.completed}" v-for="(step, i) in lstSteps" :key="i">
                            <div class="step-content">    
                                <div class="number" v-if="step.name !== 'download'">{{i+1}}</div>
                                <div class="number" v-else><i class="fas fa-file-download"></i></div>
                                <span class="name">{{step.label}}</span>
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
                    <h3>Ajoutez les exercices de la séance</h3>
                    <div class="add-exercice">
                        <button class="btn btn-default" @click="addExercice()">Exercice <i class="fas fa-plus"></i></button>
                    </div>
                    <div class="lst-exerices">
                        <div class="exercice-vide exercice-item" v-if="lstExercices.length === 0">
                            Aucun exercice ajouté
                        </div>
                    </div>
                </div>
                <div v-if="currentStep === 'download'">
                    <h3>Télechargez la séance</h3>
                </div>
                <div class="actions">
                    <div class="btns">
                        <button class="btn btn-default-ghost" @click="previous()" v-if="currentStep !== 'informations'">Précédent</button>
                        <button class="btn btn-default" @click="next()" v-if="currentStep !== 'download'" :class="{'disabled' : isBtnNextDisabled()}" :disabled="isBtnNextDisabled()">Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations } from 'vuex';
import GoHomeModal from '@/components/modals/GoHomeModal.vue';
import AddExerciceModal from '@/components/modals/AddExerciceModal.vue';
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
            lstExercices:[],
            seance:{
                theme:undefined,
                time:undefined,
                date:undefined,
                coach:undefined,
                team:undefined,
                terrain:undefined,
                exercices:[]
            }
        }
    },
    computed:{
        lstSteps(){
            return this.$store.state.seance.steps;
        },
    },
    methods:{
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
                    result = this.lstExercices.length === 0;
                    break;
            }
            return result;
        },
        addExercice(){
            this.$modal.show(
                AddExerciceModal,
                {},
                {name : 'add-exercice-modal', classes:['modal-lg2'], clickToClose:false}
            );
        },
        ...mapMutations({setCurrentState:'seance/setCurrentState', setStepCompleted:'seance/setStepCompleted', setSeance:'seance/setSeance'})
    },
    mounted(){
        const fromDesigner = JSON.parse(localStorage.getItem('fromDesigner'));

        this.scrollTop();
        
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
            this.lstExercices = seanceLocale.exercices;

            //ouvrir modale d'ajout d'exercice
            this.addExercice();
            
            this.$modal.show(
                AddExerciceModal,
                {withData:true},
                {name : 'add-exercice-modal', classes:['modal-lg2'], clickToClose:false}
            );
            
        }

        //vérifier si on était en mode modification d'exercice avant de quitter la page
        /*if(localStorage.getItem('indexExerciceUpdate')){
            this.indexExerciceUpdate = JSON.parse(localStorage.getItem('indexExerciceUpdate'));
            this.isUpdateExercice = true;
            localStorage.removeItem('indexExerciceUpdate');
        }*/
    },
    beforeDestroy(){

        //supprimer les objets sauvegardés en localstorage
        localStorage.removeItem('fromDesigner');
    }

}
</script>
