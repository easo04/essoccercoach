<template>
    <div class="exercices-page">
        <ExercicesCategories/>
        <div class="content">
            <div class="liens">
                <span class="lien-categorie"> Exercices / Tous</span>
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
</template>

<script>
import { mapState } from 'vuex'

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
        }
    },
    computed:{
        ...mapState(['modePresentation'])
    }
}
</script>

<style lang="scss">

</style>