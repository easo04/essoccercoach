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
            <div class="active">
                <div>
                    <div class="icon-svg">
                        <font-awesome-icon :icon="['fas', 'futbol']"/>
                    </div>
                    <div>Exercices</div>
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
export default {
    head(){
        return{
            title:'Dashboard | ESSoccerCoach',
        }
    },
    data(){
        return{
            showListProfil:false
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
        }
    },
    created(){

    },
    mounted(){
        console.log(this.$auth.user)

        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            this.$auth.setUser(user);
            console.log(this.$auth.user)
        }
    },
    beforeDestroy(){
        //localStorage.removeItem('user')
    }
}
</script>