<template>
    <div class="dashboard">
        <NuxtLink to="/dashboard"><font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']"/> Retournez</NuxtLink>
        <h2>Ajoutez un exercice</h2>
        <div class="form-content">
            <div class="form-group">
                <label class="label-control" for="theme">Thème (Obligatoire): </label>
                <input type="text" name="theme" class="form-control" v-model="exercice.theme"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="nbPlayers">Nombre de joueurs: </label>
                <input type="number" name="nbPlayers" class="form-control" v-model="exercice.players" />
            </div>
            <div class="form-group">
                <label class="label-control" for="category">Catégorie (Obligatoire): </label>
                <select name="category" class="form-control" v-model="exercice.category">
                    <option v-for="(cat, index) in categoriesExercice" :key="index">
                        {{cat.label}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label class="label-control" for="description">Description (Obligatoire): </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="description" class="form-control-textarea" v-model="exercice.description"></textarea>
            </div>
            <div class="form-group">
                <label class="label-control" for="dispo">Disposition: </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="dispo" class="form-control-textarea" v-model="exercice.disposition"></textarea>
            </div>
            <div class="form-group">
                <label class="label-control" for="obj">Objectifs: </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="obj" class="form-control-textarea" v-model="exercice.objectifs"></textarea>
            </div>
            <div class="form-group">
                <div class="image-upload" :class="{'with-image' : fileName !== undefined}">
                    <font-awesome-icon :icon="['fas', 'file-image']"/> Importer une image
                    <input type="file" name="image" id="input-file" :class="'file-upload file-upload'" @change="readFile" accept=".png, .jpg"/>
                </div>
            </div>
            <div class="actions">
                <button class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Créez l'exercice</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            exercice:{
                theme:undefined,
                players:undefined,
                description:undefined,
                image:undefined,
                disposition:undefined,
                objectifs:undefined,
                category:undefined
            },
            fileName:undefined,
        }
    },
    computed:{
        categoriesExercice(){
            return this.$store.state.categories.filter(c => c.name !== 'populaires');
        },
        ...mapState(["exercices"])
    },
    methods:{
        isBtnSaveDisabled(){
            return this.exercice.theme === undefined || this.exercice.description === undefined 
            || this.exercice.category === undefined || this.exercice.image === undefined;
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
        async save(){

            let image;
            if(this.exercice.image){

                //save the image to cloudinary
                image = await this.$cloudinary.upload(this.exercice.image, {upload_preset: process.env.CLOUDINARY_PRESET});
            }

            let categoryNameDb = this.categoriesExercice.find(c=>c.label === this.exercice.category).name;
            categoryNameDb = categoryNameDb.substring(0, categoryNameDb.length - 1);

            const imageId = image.public_id ?? ''; 
            const imageUrl = image.url ?? '';

            //const imageId = 'https://res.cloudinary.com/dgtvlmmxg/image/upload/v1612800601/exercices/1601074656125_rx6grl.png'
            //const imageUrl = '1601074656125_rx6grl'

            //save the exercice
            const data = {
                title : this.exercice.theme,
                description : this.exercice.description,
                disposition : this.exercice.disposition,
                objectifs : this.exercice.objectifs,
                nbPlayers : this.exercice.players,
                category : categoryNameDb,
                popular : false,
                image_url : imageUrl,
                image_id : imageId,
            };

            try{
                const response = await this.$axios.$post('/api/exercices',  data);

                data.id = response.exercice_id;
                data.created_at = new Date();
                
                let exercicesStorage = JSON.parse(localStorage.getItem('exercices'));
                exercicesStorage.push(data);
                
                 //save exercices in localstorage
                const exercicesParsed = JSON.stringify(exercicesStorage);
                localStorage.setItem('exercices', exercicesParsed);

                this.$router.push('/dashboard');
            }catch(err){
                const error = err.response.data;
                console.log(error)
            }
        },
        ...mapMutations({addExercice:'addExercice'})
    }
}
</script>