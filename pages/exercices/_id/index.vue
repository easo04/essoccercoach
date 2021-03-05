<template>
    <div class="exercices-publiques-detail">
        <div class="details-exercice" v-if="$fetchState.pending">
            <SqueletDetailsExercice/>
        </div>
        <div v-else>
            <DetailsExercice :exercice="exercice" :exercices-same-category="exercicesSameCaetegory"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            exercice:{},
            exercicesSameCaetegory:[],
        }
    },
    async fetch() {

        try{
            
            //split de string param
            const param = this.$route.params.id.split('-');
            const id = param[0];

            //récupérer les exercices par catégorie
            let response = await this.$axios.$get(`/api/exercices/${id}`);
            this.exercice = response.exercice;

            const data = {
                category:this.exercice.category,
                id:this.exercice.id
            };
            let responseSame = await this.$axios.$post(`/api/exercices/same-category`, data);
            this.exercicesSameCaetegory = responseSame.exercices;
        }catch(err){
            console.log(err);
        }
    }
}
</script>