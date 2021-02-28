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
                        <div><font-awesome-icon :icon="['fas', 'user']"/> <span class="label-icon">Mon profile</span></div>
                        <div class="logout" @click="logout()"><font-awesome-icon :icon="['fas', 'sign-out-alt']"/> <span class="label-icon">Fermez la session</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-left">
            <div :class="{'active' : itemSelected === 'exercices'}" @click="goToExercices()">
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
            <div class="deactivate">
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
    </div>
</template>
<script>
import {mapState} from 'vuex';
const ROUTES_ONLY_ADMINS = ['users', 'emails'];
export default {
    head(){
        return{
            title:'Dashboard | ESSoccerCoach',
        }
    },
    data(){
        return{
            showListProfil:false,
            itemSelected:'exercices',
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
            localStorage.removeItem('exercices');
            localStorage.removeItem('emails');
        },
        goToEmails(){
            this.itemSelected = 'emails';
            this.$router.push('/dashboard/emails');
        },
        goToExercices(){
            this.itemSelected = 'exercices';
            this.$router.push('/dashboard');
        },
        goToUsers(){
            this.itemSelected = 'users';
            this.$router.push('/dashboard/users');
        },
        showIfAdmin(){
            return this.auth.user.subscription === 'admin';
        }
    },
    created(){
        if(this.$route.path.includes('emails')){
            this.itemSelected = 'emails';
        }else if(this.$route.path.includes('users')){
            this.itemSelected = 'users';
        }else{
            this.itemSelected = 'exercices';
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