<template>
    <div class="exercices-page">
        <ExercicesCategories :current-categorie="categorie.name"/>
        <div class="content">
            <div v-if="loading">
                <SqueletExercices />
            </div>
            <div v-else>
                <div class="liens">
                    <span class="lien-categorie"> Exercices / {{categorie.label}}</span>
                </div>
                <div class="liste-exercices">
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-exercice">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                        </div>
                        <div class="description">
                            <h4>Rondo 4x4 + J</h4>
                            <p>Soy un parrafo de ejemplo para hacer un test ...</p>
                            <div class="footer-description">
                                <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more-results" v-if="showMoreResults">
                    <button class="btn btn-default-ghost"><i class="fas fa-sort-down"></i> Plus de résultats</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const CATEGORIES = ['offensifs', 'deffensifs', 'rondos', 'physiques', 'tactiques', 'gardiens'];

export default {
    head(){
        return{
            title:'Exercices de soccer | ESsoccercoach',
            meta:[
                {
                    hid:'description',
                    name:'description',
                    content:'Exercices de soccer'
                }
            ]
        }
    },
    data(){
        return {
            showMoreResults:true,
            categorie:undefined,
            loading:true
        }
    },
    computed:{
        ...mapState(['modePresentation', 'categories'])
    },
    methods:{
        ...mapMutations({setCategorie:'setCategorie'})
    },
    created(){
        const catParam = this.categories.find(c => c.name === this.$route.params.categorie);
        if(catParam){
            this.categorie = catParam;
        }else{
            location.href = "/";
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss">

</style>