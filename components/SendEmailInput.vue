<template>
    <div class="send-email-input">
        <div class="infolettre" v-if="showInfolettre">
            <p>Abonnez-vous à notre infolettre pour recevoir les dernières 
                nouveautées: </p>
            <div class="form-group-flex email-send">
                <input type="email" name="addText" class="form-control" :class="{'error' : errorEmail}" placeholder=" Votre email" v-model="email"/>
                <button class="btn btn-default" @click="sendEmail()"><font-awesome-icon :icon="['fas', 'paper-plane']"/></button>
            </div>
        </div>
        <div class="infolettre-succes" v-else>
            <p v-if="showSuccesEmailMessage">Votre inscription a été fait avec succès! ✅</p>
        </div>
    </div>
</template>
<script>
const regularExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default {
    data(){
        return{
            email:undefined,
            showInfolettre:true,
            showSuccesEmailMessage:true,
            errorEmail:false
        }
    },
    methods: {
        async sendEmail(){
            if(this.email){

                try{

                    if(regularExpression.test(this.email)){
                        const data = {
                        email:this.email
                        }
                        
                        //send email to backend
                        await this.$axios.$post('/api/emails', data);
                    }

                    const infosUser = {
                        email:this.email,
                        send:true
                    };

                    //sauvegarder dans le localestorage
                    const infosParsed = JSON.stringify(infosUser);
                    sessionStorage.setItem('infosUserSend', infosParsed);
                    
                    this.showInfolettre = false;
                    this.showSuccesEmailMessage = true;
                }catch(err){
                    console.log(err);
                }
            }else{
                this.errorEmail = true;
            }
        }
    },
    mounted(){
        const infosUser = JSON.parse(sessionStorage.getItem('infosUserSend'));
        if(infosUser){
            this.showInfolettre = false;
            this.showSuccesEmailMessage = false;
        }
    },
}
</script>