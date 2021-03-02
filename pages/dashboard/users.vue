<template>
    <div class="dashboard">
        <div class="addNewUser"><button class="btn btn-default" @click="createUser()">Nouveau <font-awesome-icon :icon="['fas', 'plus']"/></button></div>
        <h2>Usagers</h2>
        <p>La liste des usagers de l'application.</p>
        <MessageSection :message="customMessage" :custom-style="customStyle" v-if="showMessage"/>
        <div class="lst-users">
            <div class="item-user" v-for="(user, index) in users" :key="user.id">
                <h4>{{user.first_name}} {{user.last_name}} <span v-if="user.user_name">({{user.user_name}})</span></h4>
                <div>{{user.email}}</div>
                <div class="delete"><span @click="deleteUserApi(index, user.id)"><font-awesome-icon :icon="['fas', 'trash']"/></span></div>
                <div class="type" :class="user.subscription">Subscription: {{user.subscription}}</div>
                <button class="btn btn-default-ghost" @click="openUpdateModal(user)">Modifiez</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import MessageSection from '../../components/MessageSection.vue';
import UpdateUserVue from '../../components/modals/UpdateUser.vue';
export default {
    components: { MessageSection },
    middleware: 'authentificated',
    layout:'connected',
    computed:{
        ...mapState(["auth", "users"])
    },
    data(){
        return{
            showMessage:false,
            customStyle:'succes',
            customMessage:'Succes',
        }
    },
    methods:{
        async getAllUsers(){
            const usersLocal = JSON.parse(localStorage.getItem('users'));
            if(!usersLocal){
                let response = await this.$axios.$get('/api/users');
                this.setListUsers(response.users);

                //save exercices in localstorage
                const usersParsed = JSON.stringify(response.users);
                localStorage.setItem('users', usersParsed);
            }else{
                this.setListUsers(usersLocal);
            }
        },
        async deleteUserApi(index, id){
            try{
                console.log(id)
                await this.$axios.$delete('/api/users/' + id);
                this.deleteUser(index);

                const usersParsed = JSON.stringify(this.users);
                localStorage.setItem('users', usersParsed);

                this.customMessage = 'L\'usager a été supprimé!';
                this.customStyle = 'succes';
                this.showMessage = true;
            }catch(err){
                console.log(err);
                this.customMessage = 'Erreur lors de la suppression de l\'usager';
                this.customStyle = 'error';
                this.showMessage = true;
            }

        },
        openUpdateModal(user){
            this.$modal.show(
                UpdateUserVue,
                { isModeUpdate : true, userProps: user, canChangeSubscription:true},
                {name : 'update-user-modal', classes:['modal-lg2'], scrollable:true, height:'auto'},
                {}
            );
        },
        createUser(){
            this.$modal.show(
                UpdateUserVue,
                { isModeUpdate : false, canChangeSubscription:true},
                {name : 'update-user-modal', classes:['modal-lg2'], scrollable:true, height:'auto'},
                {}
            );
        },
        ...mapMutations({setListUsers:'setListUsers', deleteUser:'deleteUser'})
    },
    mounted(){

        //récupérer tous les usagers
        this.getAllUsers();

        this.$root.$on('closeMessage', () => this.showMessage = false);

        this.$root.$on('loadUsers', () => {
            this.getAllUsers();
            this.customMessage = 'L\'usager a été modifié!';
            this.customStyle = 'succes';
            this.showMessage = true;
        });
    }
}
</script>