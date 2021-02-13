<template>
    <div class="login-page">
        <h3>Commensez votre session</h3>
        <form class="form-content" @submit.prevent="login()">
            <div class="errors" v-if="errors.length > 0">
                <div v-for="(error, i) in errors" :key="i">{{error}}</div>
            </div>
            <div class="form-group">
                <label class="label-control" for="v">Email: </label>
                <input type="email" name="email" class="form-control" v-model="user.email" />
            </div>
            <div class="form-group">
                <label class="label-control" for="mdp">Mot de passe: </label>
                <input type="password" name="mdp" class="form-control" v-model="user.password" />
            </div>
            <div class="actions">
                <button class="btn btn-default" type="submit">Commencez session</button>
            </div>
        </form>
    </div>
</template>
<script>
const RESPONSE_CODE = {
    OK:{
        CODE:200,
    },
    ERROR_SERVER_EMAIL_PASSWORD_INCORRECT:{
        CODE:500,
        STATUS:'EMAIL_PASSWORD_INCORRECT'
    },
    ERROR_SERVER_ALREADY_LOGGED:{
        CODE:500,
        STATUS:'ALREADY_LOGGED'
    }
}
export default {
    data(){
        return{
            user:{
                email:undefined,
                password:undefined
            },
            errors:[]
        }
    },
    methods:{
        async login(){
            this.errors = [];
            if(!this.user.email || !this.user.password){
                this.errors.push('*Email et mot de passe obligatoires');
                return;
            }

            const data = {
                email:this.user.email,
                password:this.user.password
            };

            try{
                
                let response = await this.$auth.loginWith('local', { data });

                if(response.data.code === RESPONSE_CODE.OK.CODE){
                    this.errors = [];

                    const userParsed = JSON.stringify(response.data.user);
                    localStorage.setItem('user', userParsed);

                    this.$auth.setUser(response.data.user);
                }
            }catch(err){
                const error = err.response.data;
                if(error.status === RESPONSE_CODE.ERROR_SERVER_EMAIL_PASSWORD_INCORRECT.STATUS){
                    this.errors.push('*Usager ou mot de passe incorrect');
                }else if(error.status === RESPONSE_CODE.ERROR_SERVER_ALREADY_LOGGED.STATUS){
                    this.errors.push('*L\'usager est déjà connecté');
                }
            }
        }
    }
}
</script>
