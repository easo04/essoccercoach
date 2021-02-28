<template>
    <div class="dashboard">
        <h2>Emails</h2>
        <p>La liste d'emails de l'infolettre.</p>
        <MessageSection :message="customMessage" :custom-style="customStyle" v-if="showMessage"/>
        <div class="show-all"><span @click="setShowAll()">Voir tous les emails</span></div>
        <div class="form-group" v-if="showAll">
            <textarea id="all-emails-text"   autocomplete="off" name="addText" class="form-control-textarea" v-model="allEmails" readonly></textarea>
            <div class="copy-all" @click="copyAll()"><span>Copier</span></div>
        </div>
        <div class="lst-emails">
            <div class="item-email" v-for="(email, index) in emails" :key="email.id">
                <div class="label-email">{{email.email}}</div>
                <div class="delete"><span @click="deleteEmailApi(index, email.id)"><font-awesome-icon :icon="['fas', 'trash']"/></span></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import MessageSection from '../../components/MessageSection.vue';
export default {
    components: { MessageSection },
    middleware: 'authentificated',
    layout:'connected',
    computed:{
        ...mapState(["auth", "emails"])
    },
    data(){
        return{
            showMessage:false,
            customStyle:'succes',
            customMessage:'Succes',
            allEmails:'',
            showAll:false
        }
    },
    methods:{
        setShowAll(){
            this.showAll = !this.showAll;
        },
        async getAllEmails(){
            const emailsLocal = JSON.parse(localStorage.getItem('emails'));
            if(!emailsLocal){
                let response = await this.$axios.$get('/api/emails');
                this.setListEmails(response.emails);

                //save exercices in localstorage
                const emailsParsed = JSON.stringify(response.emails);
                localStorage.setItem('emails', emailsParsed);
            }else{
                this.setListEmails(emailsLocal);
            }
        },
        async deleteEmailApi(index, id){
            try{
                console.log(id)
                await this.$axios.$delete('/api/emails/' + id);
                this.deleteEmail(index);

                const emailsParsed = JSON.stringify(this.emails);
                localStorage.setItem('emails', emailsParsed);

                this.customMessage = 'L\'email a été supprimé!';
                this.customStyle = 'succes';
                this.showMessage = true;
            }catch(err){
                console.log(err);
                this.customMessage = 'Erreur lors de la suppression de l\'email';
                this.customStyle = 'error';
                this.showMessage = true;
            }

        },
        copyAll(){
            /* Get the text field */
            var copyText = document.getElementById("all-emails-text");

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");
        },
        ...mapMutations({setListEmails:'setListEmails', deleteEmail:'deleteEmail'})
    },
    mounted(){

        //récupérer tous les emails
        this.getAllEmails();

        const lstEmails = this.emails.map(e=>e.email);
        this.allEmails = lstEmails.join(';');

        this.$root.$on('closeMessage', () => this.showMessage = false);
    }
}
</script>