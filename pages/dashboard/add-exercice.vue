<template>
    <div class="dashboard">
        <NuxtLink to="/dashboard"><font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']"/> Retournez</NuxtLink>
        <h2>Ajoutez un exercice</h2>
        <div class="form-content">
            <div class="form-group">
                <label class="label-control" for="addText">Thème (Obligatoire): </label>
                <input type="text" name="addText" class="form-control" v-model="exercice.theme"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="addText">Nombre de joueurs: </label>
                <input type="number" name="addText" class="form-control" v-model="exercice.players" />
            </div>
            <div class="form-group">
                <label class="label-control" for="category">Filtrer par catégorie: </label>
                <select name="category" class="form-control" v-model="exercice.category">
                    <option v-for="(cat, index) in categoriesExercice" :key="index">
                        {{cat.label}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label class="label-control" for="addText">Description (Obligatoire): </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="addText" class="form-control-textarea" v-model="exercice.description"></textarea>
            </div>
            <div class="form-group">
                <label class="label-control" for="addText">Disposition (Obligatoire): </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="addText" class="form-control-textarea" v-model="exercice.disposition"></textarea>
            </div>
            <div class="form-group">
                <label class="label-control" for="addText">Objectifs (Obligatoire): </label>
                <textarea  rows="4" cols="50"  autocomplete="off" name="addText" class="form-control-textarea" v-model="exercice.objectif"></textarea>
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
            return true;
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
        save(){

        }
    }
}
</script>