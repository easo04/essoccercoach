<template>
    <div class="header-app">
        <div class="header">
            <div class="logo">
                <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
                <h3>ESsoccercoach</h3>
            </div>
            <div class="menu-desktop">
                <ul>
                    <li>Accueil</li>
                    <li>Nos outils</li>
                    <li>À propos</li>
                    <li @click="showExercicesOptions()" v-if="!showSelectExercices">
                        Exercices <i class="fas fa-sort-down"></i>
                    </li>
                    <li @click="showExercicesOptions()" v-if="showSelectExercices">
                        Exercices <i class="fas fa-smile"></i>
                    </li>
                </ul>
                <div class="select-list" v-if="showSelectExercices">
                    <div class="item" v-for="(item, i) in lstCategoriesExercices" :key="i">
                        {{item}}
                    </div>
                </div>
            </div>
            <div class="btn-new">
                <button class="btn btn-default btn-add" :class="{'active' : showNewActions}" @click="showActions()">Nouveau <i class="fas fa-plus"></i></button>
                <span class="btn-add-mobile" :class="{'active' : showNewActions}" @click="showActions()"><i class="fas fa-plus"></i></span>
                <div class="new-actions-list" v-if="showNewActions">
                    <h4>Commencez à créer avec l'un de nos outils</h4>
                    <div class="items-actions">
                        <div class="item-action-list" @click="goToCreateExercices()">
                            <div class="img-item-action">
                                <div class="img">
                                    <img src="@/assets/images/exercices-logo.png" alt="créer exercice"/>
                                </div>
                            </div>
                            <span>Exercice</span>
                        </div>
                        <div class="item-action-list" @click="goToCreateSeances()">
                            <div class="img-item-action">
                                <div class="img">
                                    <img src="@/assets/images/seance-logo.png" alt="créer séance"/>
                                </div>
                            </div>
                            <span>Séance</span>
                        </div>
                        <div class="item-action-list">
                            <div class="img-item-action">
                                <div class="img">
                                    <img src="@/assets/images/alignement-logo.png" alt="créer alignement"/>
                                </div>
                            </div>
                            <span>Alignement</span>
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
export default {
    data(){
        return{
            showNewActions:false,
            currentItemMenu:'accueil',
            showSelectExercices:false,
            lstCategoriesExercices:['Tous', 'Rondos', 'Offensifs', 'Défensifs', 'Physiques', 'Tactiques', 'Gardiens']
        }
    },
    methods:{
        setCurrentItemMenu(item){
            this.currentItemMenu = item;
        },
        showActions(){
            this.showNewActions = this.showNewActions ? false : true;
        },
        showExercicesOptions(){
            this.showSelectExercices = this.showSelectExercices ? false : true;
        },
        goToCreateExercices(){
            this.$router.push({path: '/create-exercice'});
        },
        goToCreateSeances(){
            this.$router.push({path: '/create-seance'});  
        },
    }
}
</script>
<style lang="scss" scoped>
    //@import '@/assets/css/components/header.scss';
</style>