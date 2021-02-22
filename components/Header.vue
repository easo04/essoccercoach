<template>
    <div class="header-app">
        <div class="header-second">
            <div class="login"><NuxtLink to="/login">Se connecter</NuxtLink></div>
        </div>
        <div class="header">
            <div class="logo">
                <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
                <h3>ESsoccercoach</h3>
            </div>
            <div class="menu-desktop">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="#nosOutils">Nos outils</a></li>
                    <li><a href="#propos">À propos</a></li>
                    <li @click="showExercicesOptions()">
                        Exercices <font-awesome-icon :icon="['fas', 'sort-down']"/>
                    </li>
                </ul>
                <div class="select-list" v-if="showSelectExercices">
                    <div class="item" v-for="(item, i) in categories" :key="i" @click="goToCatgory(item.url)">
                        {{item.label}}
                    </div>
                </div>
            </div>
            <div class="btn-new">
                <button class="btn btn-default btn-add" :class="{'active' : showNewActions}" @click="showActions()">Nouveau <font-awesome-icon :icon="['fas', 'plus']"/></button>
                <span class="btn-add-mobile" :class="{'active' : showNewActions}" @click="showActions()"><font-awesome-icon :icon="['fas', 'plus']"/></span>
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
        </div>
        <div class="menu-mobile">
            <div class="item-menu" :class="{'active' : currentItemMenu === 'accueil'}" @click="setCurrentItemMenu('accueil')">
                <div>
                    <i class="fas fa-home"></i>
                    <div class="item-label">Accueil</div>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'outils'}" @click="setCurrentItemMenu('outils')">
                <div>
                    <i class="fas fa-trophy"></i>
                    <div class="item-label">Nos outils</div>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'nous'}" @click="setCurrentItemMenu('nous')">
                <div>
                    <i class="fas fa-bullhorn"></i>
                    <div class="item-label">À propos</div>
                </div>
            </div>
            <div class="item-menu" :class="{'active' : currentItemMenu === 'exercices'}" @click="setCurrentItemMenu('exercices')">
                <div>
                    <i class="fas fa-futbol"></i>
                    <div class="item-label">Exercices</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data(){
        return{
            showNewActions:false,
            currentItemMenu:'accueil',
            showSelectExercices:false,
        }
    },
    computed:{
        ...mapState(['modePresentation', 'categories'])
    },
    methods:{
        setCurrentItemMenu(item){
            this.currentItemMenu = item;
        },
        showActions(){
            this.showNewActions = !this.showNewActions;
        },
        showExercicesOptions(){
            this.showSelectExercices = !this.showSelectExercices;
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
            this.showSelectExercices = false;
            this.$router.push(item);
        }
    }
}
</script>