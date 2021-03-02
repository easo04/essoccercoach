<template>
    <div class="dashboard mon-profil">
        <div class="loading" v-if="loading">
            <Spinner :spinner="true"/>
        </div>
        <div v-else>
            <h2>Mon Profil</h2>
            <MessageSection :message="customMessage" :custom-style="customStyle" v-if="showMessage"/>
            <div class="info-user">
                <h4>Informations de l'usager</h4>
                <p><span class="label">Nom: </span>{{userInfo.first_name}} {{userInfo.last_name}}</p>
                <p><span class="label">Email: </span>{{userInfo.email}}</p>
                <p><span class="label">Subscription: </span>{{userInfo.subscription}}</p>
                <div class="link">
                    <a class="blue-link" @click="openModalUpdate()">Modifiez vos informations</a>     
                </div>
                <div class="link">
                    <a class="blue-link" @click="openModalUpdatePassword()">Modifiez votre mot de passe</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UpdatePasswordVue from '../../components/modals/UpdatePassword.vue';
import UpdateUserVue from '../../components/modals/UpdateUser.vue';
export default {
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            userInfo:undefined,
            showMessage:false,
            customStyle:'succes',
            customMessage:'Succes',
            loading:true
        }
    },
    methods:{
        openModalUpdate(){
            this.$modal.show(
                UpdateUserVue,
                {isModeUpdate : true, userProps: this.userInfo, fromMonProfil:true},
                {name : 'update-user-modal', classes:['modal-lg2'], scrollable:true, height:'auto'},
                {}
            );
        },
        openModalUpdatePassword(){
            this.$modal.show(
                UpdatePasswordVue,
                {userProps: this.userInfo},
                {name : 'update-password-modal', classes:['modal-lg2'], scrollable:true, height:'auto'},
                {}
            );
        },
        loadUser(){
            const user = JSON.parse(localStorage.getItem('user'));
            this.userInfo = user;
            this.loading = false;
        }
    },
    mounted(){
        this.loadUser();

        this.$root.$on('loadUser', ()=>{
            this.loadUser();
            this.customMessage = 'Vos informations ont été modifiés';
            this.customStyle = 'succes';
            this.showMessage = true;
        });

        this.$root.$on('passwordUpdated', ()=>{
            this.customMessage = 'Le mot de passe été modifié';
            this.customStyle = 'succes';
            this.showMessage = true;
        });
    }
}
</script>