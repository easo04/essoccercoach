<template>
    <footer class="footer">
        <div class="infolettre">
            <div>
                <p>Abonnez-vous à notre infolettre pour recevoir les dernières 
                    nouveautées: </p>
                <div class="form-group-flex email-send" v-if="showInfolettre">
                    <input type="email" name="addText" class="form-control" placeholder=" Votre email" v-model="email" autocomplete="off"/>
                    <button class="btn btn-default" @click="sendEmail()"><font-awesome-icon :icon="['fas', 'paper-plane']"/></button>
                </div>
                <div class="infolettre-succes" v-else>
                    <p>Votre inscription a été fait avec succès! ✅</p>
                </div>
            </div>
        </div>
        <div class="content-footer">
            <div class="liste-services">
                <div class="services">
                    <h4>Nos services</h4>
                    <div class="liste">
                        <a href="/create-exercice">Création d'exercice</a>
                        <a href="/create-seance">Création de séance</a>
                        <a href="/create-alignement">Création d'alignements</a>
                    </div>
                </div>
                <div class="exercices">
                    <h4>Exercices</h4>
                    <div class="liste">
                        <a href="/exercices">Populaires</a>
                        <a href="/exercices/categorie/offensifs">Offensifs</a>
                        <a href="/exercices/categorie/deffensifs">Déffensifs</a>
                        <a href="/exercices/categorie/rondos">Rondos</a>
                        <a href="/exercices/categorie/physiques">Physiques</a>
                        <a href="/exercices/categorie/tactiques">Tactiques</a>
                        <a href="/exercices/categorie/gardiens">Gardiens</a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contactez-nous</h4>
                    <a class="mailto" href="mailto:contact@essoccercoach.com"><font-awesome-icon :icon="['fas', 'envelope']"/> contact@essoccercoach.com</a>
                    <div class="doc">
                        <h4>Pages</h4>
                        <a href="/help">Documentation</a>
                    </div>
                </div>
            </div>
            <div class="reseaux">
                <div>
                    <div class="img">
                        <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
                    </div>
                    <div class="liste-reseaux">
                        <div>
                            <a class="lien"><font-awesome-icon :icon="['fab', 'instagram']"/></a>
                            <a class="lien"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
                            <a class="lien"><font-awesome-icon :icon="['fab', 'youtube-square']"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyrigth-footer">
            <span>© Copyrigth ESsoccercoach 2021</span>
        </div>
    </footer>
</template>
<script>
import SendEmailInput from './SendEmailInput.vue';
const regularExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default {
    components: { SendEmailInput },
    data(){
        return{
            email:undefined,
            showInfolettre:true,
            errorEmail:false
        }
    },
    methods:{
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