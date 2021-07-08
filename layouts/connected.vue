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
                <div class="liste-profil" v-if="showListProfil">
                    <h4>{{auth.user.first_name}} {{auth.user.last_name}}</h4>
                    <div class="options-profil">
                        <div @click="goToMonProfil()"><font-awesome-icon :icon="['fas', 'user']"/> <span class="label-icon">Mon profile</span></div>
                        <div class="logout" @click="logout()"><font-awesome-icon :icon="['fas', 'sign-out-alt']"/> <span class="label-icon">Fermez la session</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-mobile">
            <div class="logo">
                <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
            </div>
            <div class="options">
                <div class="profil" @click="setShowListProfil()">
                    <font-awesome-icon :icon="['fas', 'bars']"/>
                </div>
            </div>
            <div class="liste-profil" v-if="showListProfil">
                <h4>{{auth.user.first_name}} {{auth.user.last_name}}</h4>
                <div class="options-profil">
                    <div @click="goToMonProfil()"><font-awesome-icon :icon="['fas', 'user-circle']"/> <span class="label-icon">Mon profile</span></div>
                    <div @click="goToExercices()" v-if="showIfAdmin()"><font-awesome-icon :icon="['fas', 'futbol']"/> <span class="label-icon">Exercices</span></div>
                    <div @click="goToEmails()" v-if="showIfAdmin()"><font-awesome-icon :icon="['fas', 'envelope']"/> <span class="label-icon">Emails</span></div>
                    <div @click="goToUsers()" v-if="showIfAdmin()"><font-awesome-icon :icon="['fas', 'user']"/> <span class="label-icon">Usagers</span></div>
                    <div><font-awesome-icon :icon="['fas', 'clipboard']"/> <span class="label-icon">Séances</span></div>
                    <div @click="goToTeams()" v-if="canShowTeams()"><font-awesome-icon :icon="['fas', 'users']"/> <span class="label-icon">Équipes</span></div>
                    <div class="logout" @click="logout()"><font-awesome-icon :icon="['fas', 'sign-out-alt']"/> <span class="label-icon">Fermez la session</span></div>
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
            this.setShowListProfil();
        },
        goToExercices(){
            this.itemSelected = ROUTES.EXERCICES;
            this.$router.push('/dashboard');
            this.setShowListProfil();
        },
        goToUsers(){
            this.itemSelected = ROUTES.USERS;
            this.$router.push('/dashboard/users');
            this.setShowListProfil();
        },
        goToMonProfil(){
            this.$router.push('/dashboard/profil');
            this.setShowListProfil();
        },
        goToTeams(){
            this.itemSelected = ROUTES.TEAMS;
            this.$router.push('/dashboard/teams');
            this.setShowListProfil();
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