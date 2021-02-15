<template>
    <div class="exercices-publiques-detail">
        <div class="details-exercice" v-if="$fetchState.pending">
            <SqueletDetailsExercice/>
        </div>
        <div v-else>
            <DetailsExercice :exercice="exercice"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            exercice:{},
        }
    },
    mounted(){
    },
    async fetch() {
        try{
            
            //split de string param
            const param = this.$route.params.id.split('-');
            const id = param[0];

            //récupérer les exercices par catégorie
            const response = await this.$axios.$get(`/api/exercices/${id}`);
            console.log(response.exercice)
            this.exercice = response.exercice;
        }catch(err){
            console.log(err);
        }
    }
}
</script>