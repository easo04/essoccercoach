<template>
    <div class="modal-add-exericice modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un nouvel exercice</h3></div>
            <div class="close-modal"><span @click="hide()"><i class="fas fa-times"></i></span></div>
        </div>
        <div class="modal-content">
            <div class="form-content">
                <div class="form-group">
                    <label class="label-control" for="addText">Thème (Obligatoire): </label>
                    <input type="text" name="addText" class="form-control" v-model="exercice.theme"/>
                </div>
                <div class="form-group-flex">
                    <div class="form-group">
                        <label class="label-control" for="addText">Durée: </label>
                        <input type="text" name="addText" class="form-control" v-model="exercice.time" />
                    </div>
                    <div class="form-group">
                        <label class="label-control" for="addText">Nombre de joueurs: </label>
                        <input type="number" name="addText" class="form-control" v-model="exercice.players" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="label-control" for="addText">Description (Obligatoire): </label>
                    <textarea  rows="4" cols="50"  autocomplete="off" name="addText" class="form-control-textarea" v-model="exercice.description"></textarea>
                </div>
                <div class="form-group-flex">
                    <div class="image-upload" :class="{'with-image' : fileName !== undefined}">
                        <i class="far fa-file-image"></i> Importer une image
                        <input type="file" name="image" id="input-file" :class="'file-upload file-upload'" @change="readFile" accept=".png, .jpg"/>
                    </div>
                    <button class="btn btn-default-ghost" :class="{'with-image' : withData}" @click="openDesigner()"><i class="fas fa-paint-brush"></i> ESDesigner</button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button v-if="!exerciceUpdate" class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Créez l'exercice</button>
                <button v-else class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Modifiez l'exercice</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    props:['withData', 'exerciceUpdate'],
    data(){
        return{
            exercice:{
                theme:undefined,
                time:undefined,
                players:undefined,
                description:undefined,
                image:undefined,
            },
            fileName:undefined,
        }
    },
    computed:{
        seance(){
            return this.$store.state.seance.seance;
        },
        exercices(){
            return this.$store.state.seance.exercices;
        },
        getCurrentStep(){
            return this.$store.getters['seance/getCurrentStep'];
        },
        getStepsCompleted(){
            return this.$store.getters['seance/getStepsCompleted'];
        },
        imageExercice(){
            return this.$store.state.seance.imageExercice;
        }

    },
    methods: {
        hide () {
            this.initExercice();
            this.$modal.hide('add-exercice-modal');
        },
        initExercice(){
            this.exercice ={
                theme:undefined,
                time:undefined,
                players:undefined,
                description:undefined,
                image:undefined
            };
            this.setImageExercice(undefined);
        },
        openDesigner(){

            //add information in localstorage
            let seanceLocale = {
                seance:this.seance,
                exercices:this.exercices,
                exercice:this.exercice,
                currentStep:this.getCurrentStep,
                stepsCompleted:this.getStepsCompleted
            };

            const seanceParsed = JSON.stringify(seanceLocale);
            localStorage.setItem('seanceLocale', seanceParsed);

            const isCreateSeanceParsed = JSON.stringify(true);
            localStorage.setItem('isCreateSeance', isCreateSeanceParsed);

            /*if(this.isUpdateExercice){
                const indexExerciceUpdateParsed = JSON.stringify(this.indexExerciceUpdate);
                localStorage.setItem('indexExerciceUpdate', indexExerciceUpdateParsed);
            }*/

            this.hide();

            //go To Design
            this.$router.push({name: 'create-exercice'});


            //this.setShowLoader(false);
            //this.setClassLoader('');
        },
        save(){
            this.addExercice(this.exercice);
            this.hide();
        },
        isBtnSaveDisabled(){
            return (!this.exercice.theme || !this.exercice.description) ||
                (this.exercice.theme === '' || this.exercice.description === '') || !this.exercice.image;
        },
        readFile: function(event) {
            let files = event.target.files;
            if (files && files[0]) {             
                let FR = new FileReader();
                this.fileName = files[0].name;
                FR.addEventListener("load", (e) => {
                    this.exercice.image = e.target.result;
                });
                FR.readAsDataURL(files[0]);
            }
        },
        ...mapMutations({addExercice:'seance/addExercice', setImageExercice:'seance/setImageExercice', setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader'})
    },
    created(){
        if(this.exerciceUpdate){
            this.exercice = {
                theme:this.exerciceUpdate.theme,
                time:this.exerciceUpdate.time,
                players:this.exerciceUpdate.players,
                description:this.exerciceUpdate.description,
                image:this.exerciceUpdate.image, //contient l'image qu'on a créé dans esdesigner     
            };
        }
    },
    mounted(){
        if(this.withData){
            let seanceLocale = JSON.parse(localStorage.getItem('seanceLocale'));
            this.fileName = undefined;
            this.exercice = {
                theme:seanceLocale.exercice.theme,
                time:seanceLocale.exercice.time,
                players:seanceLocale.exercice.players,
                description:seanceLocale.exercice.description,
                image:this.imageExercice, //contient l'image qu'on a créé dans esdesigner     
            };
        }
    }
}
</script>