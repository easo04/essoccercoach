<template>
    <div class="dashboard">
        <NuxtLink :to="'/dashboard/details-exercice/' + exercice.id"><font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']"/> Retournez</NuxtLink>
        <h2>Modifiez un exercice</h2>
        <div class="form-content">
            <div class="form-group">
                <label class="label-control" for="theme">Thème (Obligatoire): </label>
                <input type="text" name="theme" class="form-control" v-model="exercice.title"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="nbPlayers">Nombre de joueurs: </label>
                <input type="number" name="nbPlayers" class="form-control" v-model="exercice.nbPlayers" />
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
            <div class="actions">
                <button class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Modifiez l'exercice</button>
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
                title:undefined,
                nbPlayers:undefined,
                description:undefined,
                image:undefined,
                disposition:undefined,
                objectifs:undefined,
                category:undefined
            },
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
            return this.exercice.title === undefined || this.exercice.description === undefined 
            || this.exercice.category === undefined;
        },
        async save(){
            let categoryNameDb = this.categoriesExercice.find(c=>c.label === this.exercice.category).name;
            categoryNameDb = categoryNameDb.substring(0, categoryNameDb.length - 1);

            //save the exercice
            const data = {
                title : this.exercice.title,
                description : this.exercice.description,
                disposition : this.exercice.disposition,
                objectifs : this.exercice.objectifs,
                nbPlayers : this.exercice.nbPlayers,
                category : categoryNameDb,
            };

            try{
                const response = await this.$axios.$post('/api/exercices/update',  data);
                this.exercice.created_at = new Date();
                
                //delete storage variables
                localStorage.removeItem('exercices');
                localStorage.removeItem('exercice-update');

                this.$router.push('/dashboard');
            }catch(err){
                const error = err.response.data;
                console.log(error)
            }
        },
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        ...mapMutations({addExercice:'addExercice'})
    },
    mounted(){
        let exerciceUpdate = JSON.parse(localStorage.getItem('exercice-update'));
        if(exerciceUpdate){
            this.exercice = exerciceUpdate;
            this.exercice.category = this.getCategoryFormatted(this.exercice.category);
        }
    }
}
</script>