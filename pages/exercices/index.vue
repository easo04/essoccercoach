<template>
    <div class="exercices-page">
        <ExercicesCategories/>
        <div class="content">
            <div v-if="$fetchState.pending">
                <SqueletExercices />
            </div>
            <div v-else>
                <div class="liens">
                    <span class="lien-categorie"> Exercices / Populaires</span>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
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
                                <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>10</span></span></div>
                                <div class="type"><div>Offensif</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more-results" v-if="showMoreResults">
                    <button class="btn btn-default-ghost"><font-awesome-icon :icon="['fas', 'sort-down']"/> Plus de résultats</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    key(route) {
        return route.fullPath
    },
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
            loading:false,
            exercices:[]
        }
    },
    computed:{
    },
    created(){
    },
    mounted(){
        
    },
    async fetch() {
        console.log('fetch')
        try{
            
            const response = await this.$axios.$get('exercices')
            
            console.log(response)

            this.exercices.push(response.exercices)
        }catch(err){
            console.log(err);
        }
    }
}
</script>