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
        }
    },
    methods:{
        isBtnSaveDisabled(){
            return !this.exercice.theme && !this.exercice.description 
            && !this.exercice.category && !this.exercice.image;
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

            //save the image

            let categoryNameDb = this.categoriesExercice.find(c=>c.label === this.exercice.category).name;
            categoryNameDb = categoryNameDb.substring(0, categoryNameDb.length - 1);

            //save the exercice
            const data = {
                title : this.exercice.theme,
                description : this.exercice.description,
                disposition : this.exercice.disposition,
                objectifs : this.exercice.objectifs,
                nbPlayers : this.exercice.players,
                category : categoryNameDb,
                popular : false,
                image_url : 'https://res.cloudinary.com/dgtvlmmxg/image/upload/v1612800601/exercices/1601074656125_rx6grl.png',
                image_id : '1601074656125_rx6grl',
            };

            try{
                const response = await this.$axios.$post('/api/exercices',  data);
                console.log(response)
                this.$router.push('/dashboard');
            }catch(err){
                const error = err.response.data;
                console.log(error)
            }
        }
    }
}
</script>