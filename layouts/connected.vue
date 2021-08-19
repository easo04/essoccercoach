<template>
    <div class="connect-page">
        <div class="header">
            <div class="logo">
                <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
            </div>
            <div class="options">
                <div class="profil" @click="setShowListProfil()">
                    <span class="welcome">Bienvenue {{auth.user.first_name}}!</span> <font-awesome-icon :icon="['fas', 'user-circle']"/>
                </div>
                <div class="liste-profil" v-show="showListProfil">
                    <div class="options-profil">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'user']"/></span> 
                            <span class="label-icon">{{auth.user.first_name}} {{auth.user.last_name}}<span class="label-icon-block link" @click="goToMonProfil()">Voir votre profil</span></span>
                        </div>
                        <div class="logout" @click="logout()"><span class="icon"><font-awesome-icon :icon="['fas', 'sign-out-alt']"/></span><span class="label-icon">Fermez la session</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-mobile">
            <div class="logo">
                <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
            </div>
            <div class="options">
                <div class="profil">
                    <span @click="setShowListProfil()">
                        <span v-if="showListProfil"><font-awesome-icon :icon="['fas', 'times']"/></span>
                        <span v-else><font-awesome-icon :icon="['fas', 'bars']"/></span>
                    </span>
                </div>
            </div>
            <div class="liste-profil" :class="{'show-list':showListProfil}">
                <h3>Menu</h3>
                <div class="options-profil">
                    <div @click="goToMonProfil()">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'user-circle']"/></span>
                        <span class="label-icon">{{auth.user.first_name}} {{auth.user.last_name}} <span class="label-icon-block">Voir votre profil</span></span></div>
                    <div @click="goToExercices()" v-if="showIfAdmin()"><span class="icon"><font-awesome-icon :icon="['fas', 'futbol']"/></span> <span class="label-icon">Exercices</span></div>
                    <div @click="goToEmails()" v-if="showIfAdmin()"><span class="icon"><font-awesome-icon :icon="['fas', 'envelope']"/></span> <span class="label-icon">Emails</span></div>
                    <div @click="goToUsers()" v-if="showIfAdmin()"><span class="icon"><font-awesome-icon :icon="['fas', 'user']"/></span> <span class="label-icon">Usagers</span></div>
                    <div><span class="icon"><font-awesome-icon :icon="['fas', 'clipboard']"/></span> <span class="label-icon">Séances</span></div>
                    <div @click="goToTeams()" v-if="canShowTeams()"><span class="icon"><font-awesome-icon :icon="['fas', 'users']"/></span> <span class="label-icon">Équipes</span></div>
                    <div class="logout" @click="logout()"><span class="icon"><font-awesome-icon :icon="['fas', 'sign-out-alt']"/></span> <span class="label-icon">Déconnexion</span></div>
                </div>
            </div>
        </div>
        <div class="menu-left">
            <div :class="{'active' : itemSelected === 'exercices'}" @click="goToExercices()" v-if="showIfAdmin()">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'futbol']"/>
                    </div>
                    <div>Exercices</div>
                </div>
            </div>
            <div :class="{'active' : itemSelected === 'emails'}" @click="goToEmails()" v-if="showIfAdmin()">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'envelope']"/>
                    </div>
                    <div>Emails</div>
                </div>
            </div>
            <div :class="{'active' : itemSelected === 'users'}" @click="goToUsers()" v-if="showIfAdmin()">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'user']"/>
                    </div>
                    <div>Usagers</div>
                </div>
            </div>
            <div class="deactivate">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'clipboard']"/>
                    </div>
                    <div>Séances</div>
                </div>
            </div>
            <div :class="{'active' : itemSelected === 'teams'}" @click="goToTeams()" v-if="canShowTeams()">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'users']"/>
                    </div>
                    <div>Équipes</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="contenu">
                <div class="nuxt-content">
                    <nuxt/>
                </div>
                <div class="section-rigth">
                    Section publicité/annoncess
                </div>
            </div>
        </div>
        <div class="footer">
            © Outil créé par ESsoccercoach
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
const ROUTES_ONLY_ADMINS = ['users', 'emails'];
const ROUTES = {
    EXERCICES : 'exercices',
    USERS : 'users',
    EMAILS : 'emails',
    TEAMS : 'teams',
    PROFIL : 'profil'
}
export default {
    head(){
        return{
            title:'Dashboard | ESSoccerCoach',
        }
    },
    data(){
        return{
            showListProfil:false,
            itemSelected:ROUTES.EXERCICES,
        }
    },
    computed: {
        ...mapState(["auth"])
    },
    methods:{
        setShowListProfil(){
            this.showListProfil = !this.showListProfil;
        },
        logout(){
            this.$auth.logout();
            localStorage.removeItem('user');
            localStorage.removeItem('users');
            localStorage.removeItem('exercices');
            localStorage.removeItem('emails');
            localStorage.removeItem('summary-teams');
        },
        goToEmails(){
            this.itemSelected = ROUTES.EMAILS;
            this.$router.push('/dashboard/emails');
            this.showListProfil = false;
        },
        goToExercices(){
            this.itemSelected = ROUTES.EXERCICES;
            this.$router.push('/dashboard');
            this.showListProfil = false;
        },
        goToUsers(){
            this.itemSelected = ROUTES.USERS;
            this.$router.push('/dashboard/users');
            this.showListProfil = false;
        },
        goToMonProfil(){
            this.$router.push('/dashboard/profil');
            this.showListProfil = false;
        },
        goToTeams(){
            this.itemSelected = ROUTES.TEAMS;
            this.$router.push('/dashboard/teams');
            this.showListProfil = false;
        },
        showIfAdmin(){
            return this.auth.user.isAdmin;
        },
        canShowTeams(){
            return this.auth.user.showTeams;
        }
    },
    created(){
        if(this.$route.path.includes(ROUTES.EMAILS)){
            this.itemSelected = ROUTES.EMAILS;
        }else if(this.$route.path.includes(ROUTES.USERS)){
            this.itemSelected = ROUTES.USERS;
        }else if(this.$route.path.includes(ROUTES.TEAMS)){
            this.itemSelected = ROUTES.TEAMS;
        }else{
            this.itemSelected = ROUTES.EXERCICES;
        }
    },
    mounted(){
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(user){
            this.$auth.setUser(user);
        }

        if(ROUTES_ONLY_ADMINS.find(r=>this.$route.path.includes(r))){
            console.log('include')
            if(this.auth.user.subscription !== 'admin'){
                console.log('not admin')
                this.$router.push('/dashboard');
            }
        }
    },
    beforeDestroy(){
    }
}
</script>