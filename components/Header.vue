<template>
    <div class="header-app">
        <div class="header-second">
            <div class="login"><NuxtLink to="/login">Se connecter</NuxtLink></div>
        </div>
        <div class="header">
            <div class="logo">
                <a href="/"><img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/></a>
                <h3>ESsoccercoach</h3>
            </div>
            <div class="menu-desktop">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/#nosOutils">Nos outils</a></li>
                    <li><a href="/#propos">À propos</a></li>
                    <li class="exercices-link">
                        Exercices <font-awesome-icon :icon="['fas', 'sort-down']"/>
                        <ul class="select-list">
                            <li class="item" v-for="(item, i) in categories" :key="i" @click="goToCatgory(item.url)">
                                {{item.label}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="btn-new">
                <button class="btn btn-default btn-add" :class="{'active' : showNewActions}" @click="showActions()">Nouveau <font-awesome-icon :icon="['fas', 'plus']"/></button>
                <span class="btn-add-mobile" :class="{'active' : showNewActions}" @click="showActions()"><font-awesome-icon :icon="['fas', 'plus']"/></span>
            </div>
        </div>
        <div class="menu-mobile">
            <div class="item-menu" :class="{'active' : currentItemMenu === 'accueil'}" @click="setCurrentItemMenu('accueil')">
                <div>
                    <a href="/">
                        <font-awesome-icon :icon="['fas', 'home']"/>
                        <div class="item-label">Accueil</div>
                    </a>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'outils'}" @click="setCurrentItemMenu('outils')">
                <div>
                    <a href="/#nosOutils">
                        <font-awesome-icon :icon="['fas', 'trophy']"/>
                        <div class="item-label">Nos outils</div>
                    </a>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'nous'}" @click="setCurrentItemMenu('nous')">
                <div>
                    <a href="/#propos">
                        <font-awesome-icon :icon="['fas', 'bullhorn']"/>
                        <div class="item-label">À propos</div>
                    </a>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'exercices'}" @click="setCurrentItemMenu('exercices')">
                <div>
                    <a href="/exercices">
                        <font-awesome-icon :icon="['fas', 'futbol']"/>
                        <div class="item-label">Exercices</div>
                    </a>
                </div>
            </div>
        </div>
        <div class="new-actions-list" v-if="showNewActions">
            <h4>Commencez à créer avec l'un de nos outils</h4>
            <div class="items-actions">
                <div class="item-action-list" @click="goToCreateSeances()">
                    <div>
                        <div class="img-item-action">
                            <div class="img">
                                <img src="@/assets/images/seance_icon_action.png" alt="créer séance de soccer"/>
                            </div>
                        </div>
                        <span>Séance</span>
                    </div>
                </div>
                <div class="item-action-list" @click="goToCreateExercices()">
                    <div>
                        <div class="img-item-action">
                            <div class="img">
                                <img src="@/assets/images/exercice_icon_action.png" alt="créer exercice de soccer"/>
                            </div>
                        </div>
                        <span>Exercice</span>
                    </div>
                </div>
                <div class="item-action-list" @click="goToCreateAlignements()">
                    <div>
                        <div class="img-item-action">
                            <div class="img">
                                <img src="@/assets/images/alignement_icon_action.png" alt="créer alignement de soccer"/>
                            </div>
                        </div>
                        <span>Alignement</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    data(){
        return{
            showNewActions:false,
        }
    },
    computed:{
        ...mapState(['modePresentation', 'categories', 'currentItemMenu'])
    },
    methods:{
        showActions(){
            this.showNewActions = !this.showNewActions;
        },
        goToCreateExercices(){
            this.$router.push({path: '/create-exercice'});
        },
        goToCreateSeances(){
            this.$router.push({path: '/create-seance'});  
        },
        goToCreateAlignements(){
            this.$router.push({path: '/create-alignement'});  
        },
        goToCatgory(item){
            console.log('go ' + item)
            this.$router.push(item);
        },
        ...mapMutations({setCurrentItemMenu:'setCurrentItemMenu'})
    },
    created(){
        if(this.$route.fullPath.includes('nosOutils')){
            this.setCurrentItemMenu('outils');
        }else if(this.$route.fullPath.includes('propos')){
            this.setCurrentItemMenu('nous');
        }else if(this.$route.path.includes('exercices')){
            this.setCurrentItemMenu('exercices');
        }
    }
}
</script>