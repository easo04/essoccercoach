<template>
    <footer class="footer">
        <div class="infolettre">
            <div>
                <p>Abonnez-vous à notre infolettre pour recevoir les dernières 
                    nouveautées: </p>
                <div class="form-group-flex email-send">
                    <input type="email" name="addText" class="form-control" placeholder=" Votre email" v-model="email" autocomplete="off"/>
                    <button class="btn btn-default" @click="sendEmail()"><font-awesome-icon :icon="['fas', 'paper-plane']"/></button>
                </div>
            </div>
        </div>
        <div class="content-footer">
            <div class="liste-services">
                <div class="services">
                    <h4>Nos services</h4>
                    <div class="liste">
                        <a>Création d'exercice</a>
                        <a>Création de séance</a>
                        <a>Création d'alignements</a>
                    </div>
                </div>
                <div class="exercices">
                    <h4>Exercices</h4>
                    <div class="liste">
                        <a>Populaires</a>
                        <a>Offensifs</a>
                        <a>Déffensifs</a>
                        <a>Rondos</a>
                        <a>Physiques</a>
                        <a>Tactiques</a>
                        <a>Gardiens</a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contactez-nous</h4>
                    <a class="mailto" href="mailto:contact@essoccercoach.com"><font-awesome-icon :icon="['fas', 'envelope']"/> contact@essoccercoach.com</a>
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
            <span>© Copyrigth ESsoccerCoach 2021</span>
        </div>
    </footer>
</template>
<script>
export default {
    data(){
        return{
            email:undefined
        }
    },
    methods:{
        sendEmail(){
            
        }
    }
}
</script>