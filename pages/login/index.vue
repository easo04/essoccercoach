<template>
    <div class="login-page">
        <h3>Commensez votre session</h3>
        <form class="form-content" @submit.prevent="login()">
            <div class="form-group">
                <label class="label-control" for="v">Usager: </label>
                <input type="text" name="email" class="form-control" v-model="user.email" />
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
export default {
    data(){
        return{
            user:{
                email:undefined,
                password:undefined
            }
        }
    },
    methods:{
        async login(){
            const data = {
                email:this.user.email,
                password:this.user.password
            }
            try{
                
                let response = await this.$auth.loginWith('local', { data });

                const userParsed = JSON.stringify(response.data.user);
                localStorage.setItem('user', userParsed);

                this.$auth.setUser(response.data.user);
            }catch(err){
                console.log('error' + err)
            }
        }
    }
}
</script>
