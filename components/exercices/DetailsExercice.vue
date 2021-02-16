<template>
    <div class="details-exercice">
        <div class="description-infos">
            <div class="infos">
                <div class="content-infos">
                    <div class="links-way" v-if="showChemin">
                        <NuxtLink to="/exercices">Exercices</NuxtLink>
                        / <NuxtLink :to="`/exercices/categorie/${exercice.category}s`">{{getCategoryFormatted(exercice.category)}}</NuxtLink> / {{exercice.title}}
                    </div>
                    <h1>{{exercice.title}}</h1>
                    <p>{{exercice.description}}</p>
                    <div class="footer-description">
                        <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>{{exercice.nbPlayers}} joueurs</span></span></div>
                        <div class="type"><div>{{getCategoryFormatted(exercice.category)}}</div></div>
                    </div>
                </div>
            </div>
            <div class="image">
                <img src="@/assets/images/exercice_essoccercoach.png"/>
                <div class="reseau">
                    <i class="fab fa-facebook"></i>
                </div>
            </div>
        </div>
        <div class="description-infos-2">
            <div class="disposition">
                <h3>Disposition</h3>
                <p>{{exercice.disposition}}</p>
            </div>
            <div class="objectifs">
                <h3>Objectifs</h3>
                <p>{{exercice.objectifs}}</p>
            </div>
        </div>
        <div class="exercices-same" v-if="showCategory">
            <h3>Exercices de la même catégorie</h3>
            <div class="carousel exercices-carrousel">
                <div class="content-exercices">
                    <div class="exercices">
                        <div class="carousel-cell exercice-item" v-for="(exe, index) in exercicesSameCategory" :key="index" @click="goToDetails(exercice)">
                            <div class="image-exercice-item">
                                <img src="@/assets/images/exercice_essoccercoach.png"/>
                            </div>
                            <div class="description-exercice-item">
                                <h4>{{exe.title}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['exercice', 'showSameCategory', 'showCheminExercice', 'exercicesSameCategory'],
    data(){
        return{
            showCategory: this.showSameCategory !== undefined ? this.showSameCategory : true,
            showChemin: this.showCheminExercice !== undefined ? this.showCheminExercice : true,
        }
    },
    methods:{
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        goToDetails(exercice){
            let titleFormatted = exercice.title.toLowerCase().split(' ').join('-');
            this.$router.push({path:`/exercices/${exercice.id}-${titleFormatted}`})
        },
    },
    mounted(){
    }
}
</script>