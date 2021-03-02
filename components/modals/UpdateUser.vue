<template>
    <div class="modal-update-user modal-custom">
        <div class="modal-header">
            <div class="titre-modal" v-if="!isModeUpdate"><h3>Ajoutez un usager</h3></div>
            <div class="titre-modal" v-else><h3>Modifiez l'usager</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="form-content">
                <div class="form-group">
                    <label class="label-control" for="prenom">Prénom: </label>
                    <input type="text" name="prenom" class="form-control" v-model="user.first_name"/>
                </div>
                <div class="form-group">
                    <label class="label-control" for="nom">Nom: </label>
                    <input type="text" name="nom" class="form-control" v-model="user.last_name" />
                </div>
                <div class="form-group">
                    <label class="label-control" for="email">Email: </label>
                    <input type="text" name="email" class="form-control" v-model="user.email" />
                </div>
                <div class="form-group" v-if="canChangeSubscription">
                    <label class="label-control" for="subscription">Subscription: </label>
                    <select name="subscription" class="form-control" v-model="user.subscription">
                        <option :value="sub" v-for="(sub, index) in subscriptions" :key="index">
                            {{sub}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button v-if="!isModeUpdate" class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Créez l'usager</button>
                <button v-else class="btn btn-default" @click="save()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Modifiez l'usager</button>
            </div>
        </div>
    </div>
</template>
<script>
const LIST_SUBSCRIPTIONS_OPTIONS = ['admin', 'premium', 'middle', 'free'];
const CODE_SUCCES = 200;
export default {
    props:['isModeUpdate', 'userProps', 'canChangeSubscription', 'fromMonProfil'],
    data(){
        return{
            user:{
                id:undefined,
                email:undefined,
                first_name:undefined,
                last_name:undefined,
                user_name:undefined,
                subscription:undefined
            },
            subscriptions:LIST_SUBSCRIPTIONS_OPTIONS
        }
    },
    methods:{
        hide(){
            this.$modal.hide('update-user-modal');
        },
        async save(){

            const data = this.user;
            console.log(data)
            try{
                let response = undefined;
                if(this.isModeUpdate){
                    response = await this.$axios.post('/api/users/update', data);    
                }else{
                    response = await this.$axios.post('/api/users/signup-by-admin', data);
                }

                if(response.data.code === CODE_SUCCES){
                    localStorage.removeItem('users');
                    if(this.fromMonProfil){
                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.$root.$emit('loadUser');
                    }else{
                        this.$root.$emit('loadUsers');
                    }
                    this.hide();
                }
            }catch(err){
                console.log(err);
            }

        },
        isBtnSaveDisabled(){
            return false;
        }
    },
    created(){
        if(this.userProps){
            this.user.id =  this.userProps.id;
            this.user.first_name = this.userProps.first_name;
            this.user.last_name = this.userProps.last_name;
            this.user.email = this.userProps.email;
            this.user.user_name = this.userProps.user_name;
            this.user.subscription = this.userProps.subscription;
        }
    }
}
</script>
<style lang="scss">

</style>