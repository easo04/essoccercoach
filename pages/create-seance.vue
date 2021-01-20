<template>
    <div class="create-seance">
        <div class="steps">
            <div class="steps-content">
                <h2>Séance d'entraînement</h2>
                <div class="lst-steps">
                    <div class="step" :class="{'active' : step.current, 'completed': step.completed}" v-for="(step, i) in lstSteps" :key="i">
                        <div class="step-content">    
                            <div class="number">{{i+1}}</div>
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
                        <input type="text" name="addText" class="form-control" />
                    </div>
                    <div class="form-group-flex">
                        <div class="form-group">
                            <label class="label-control" for="addText">Durée: </label>
                            <input type="text" name="addText" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label class="label-control" for="addText">Date: </label>
                            <input type="text" name="addText" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="label-control" for="addText">Entraîneur: </label>
                        <input type="text" name="addText" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="label-control" for="addText">Équipe: </label>
                        <input type="text" name="addText" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="label-control" for="addText">Terrain: </label>
                        <input type="text" name="addText" class="form-control" />
                    </div>
                </div>
            </div>
            <div v-if="currentStep === 'exercices'">
                <h3>Ajoutez les exercices de la séance</h3>
                <div class="add-exercice">
                    <button class="btn btn-default">Exercice <i class="fas fa-plus"></i></button>
                </div>
                <div class="lst-exerices" :class="{'vide':lstExercices.length === 0}">
                    <span v-if="lstExercices.length === 0">Aucun exercice <i class="far fa-meh-rolling-eyes"></i></span>
                </div>
            </div>
            <div v-if="currentStep === 'download'">
                <h3>Télechargez la séance</h3>
            </div>
            <div class="actions">
                <div class="btns">
                    <button class="btn btn-default-ghost" @click="previous()" v-if="currentStep !== 'informations'">Précédent</button>
                    <button class="btn btn-default" @click="next()" v-if="currentStep !== 'download'">Suivant</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations } from 'vuex';
export default {
    layout: 'designer-seance',
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
        }
    },
    computed:{
        lstSteps(){
            return this.$store.state.seance.steps;
        }
    },
    methods:{
        next(){
            this.setStepCompleted({name:this.currentStep, completed:true});
            this.noStep++;
            const currentStep = this.lstSteps.find(s=>s.order === this.noStep);
            this.currentStep = currentStep.name;
            this.setCurrentState(currentStep.name);
        },
        previous(){

            this.setStepCompleted({name:this.currentStep, completed:false});
            this.noStep--;
            const currentStep = this.lstSteps.find(s=>s.order === this.noStep);
            this.currentStep = currentStep.name;
            this.setCurrentState(currentStep.name);
        },
        ...mapMutations({setCurrentState:'seance/setCurrentState', setStepCompleted:'seance/setStepCompleted', setSeance:'seance/setSeance'})
    }

}
</script>
