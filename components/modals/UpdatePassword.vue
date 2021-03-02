<template>
    <div class="modal-update-user modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Modifiez le mot de passe</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="errors" v-if="error">
                <div>{{error}}</div>
            </div>
            <div class="form-content">
                <div class="form-group">
                    <label class="label-control" for="passwordOld">Mot de passe actuel: </label>
                    <input type="password" name="passwordOld" class="form-control" v-model="user.password"/>
                </div>
                <div class="form-group">
                    <label class="label-control" for="passwordNew">Nouveau mot de passe: </label>
                    <input type="password" name="passwordNew" class="form-control" v-model="user.newPassword" />
                </div>
                <div class="form-group">
                    <label class="label-control" for="passwordNew2">Confirmez votre mot de passe: </label>
                    <input type="password" name="passwordNew2" class="form-control" v-model="user.confirmNewPassword" />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click="update()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Modifiez le mot de passe</button>
            </div>
        </div>
    </div>
</template>
<script>
const CODE_SUCCES = 200;
export default {
    props:['userProps'],
    data(){
        return{
            user:{
                id:undefined,
                email:undefined,
                password:undefined,
                newPassword:undefined,
                confirmNewPassword:undefined
            },
            error:undefined
        }
    },
    methods:{
        hide(){
            this.$modal.hide('update-password-modal');
        },
        async update(){

            if(this.user.newPassword !== this.user.confirmNewPassword){
                this.error = 'Les deux mot de passes ne sont pas les mêmes.'
                return;
            }

            this.error = undefined;

            const data = {
                email:this.user.email,
                oldPassword:this.user.password,
                newPassword:this.user.newPassword
            }

            try{
                const response = await this.$axios.post('/api/users/update-password', data);  
                console.log(response)
                if(response.data.code === CODE_SUCCES){
                    this.$root.$emit('passwordUpdated');
                    this.hide();
                }
            }catch(err){
                console.log(err);
                this.error = 'Erreur';
            }

        },
        isBtnSaveDisabled(){
            return !this.user.password || !this.user.newPassword || !this.user.confirmNewPassword;
        }
    },
    created(){
        if(this.userProps){
            this.user.id =  this.userProps.id;
            this.user.email = this.userProps.email;
        }
    }
}
</script>