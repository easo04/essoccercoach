<template>
    <div class="modal-open-alignements modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Entrez les informations de l'alignement</h3></div>
        </div>
        <div class="modal-content">
            <div class="form-content">
                <div class="form-group">
                    <label class="label-control" for="addText">Nom de l'équipe (Obligatoire): </label>
                    <input type="text" name="addText" class="form-control" autocomplete="off" v-model="modelAlignement.nom"/>
                </div>
                <div class="form-group">
                    <label class="label-control" for="nbPlayers">Nombre de joueurs: </label>
                    <select name="nbPlayers" class="form-control" v-model="modelAlignement.nbPlayers" @change="changeNbJoueurs()">
                        <option :value="nb" v-for="(nb, index) in lstNbJoueurs" :key="index">
                            {{nb}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="label-control" for="system">Système de jeu: </label>
                    <select name="system" class="form-control" v-model="modelAlignement.systeme">
                        <option :value="systeme" v-for="(systeme, index) in lstSystemes" :key="index">
                            {{systeme.systeme}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default-ghost" @click="hide()">Quittez</button>
                <button class="btn btn-default" @click="save()" :class="{'disabled' : isBtnNextDisabled()}" :disabled="isBtnNextDisabled()">Commencez</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    computed:{
        lstSystemes11Players(){
            return this.$store.state.alignement.lstSystemes11Players;
        },
        lstSystemes9Players(){
            return this.$store.state.alignement.lstSystemes9Players;
        },
        lstSystemes7players(){
            return this.$store.state.alignement.lstSystemes7players;
        },
        lstSysteme5players(){
            return this.$store.state.alignement.lstSysteme5players;
        },
    },
    data(){
        return{
            modelAlignement:{
                nom:undefined,
                nbPlayers:11,
                systeme:{'systeme':'4-4-2','att':2,'mc':4, 'def':4}
            },
            lstNbJoueurs:[11,9,7,5],
            lstSystemes:[]
        }
    },
    methods:{
        hide () {
            this.$modal.hide('open-alignements-modal');
            location.href = "/";
        },
        isBtnNextDisabled(){
            return this.modelAlignement.nom === undefined || this.modelAlignement.nom === '';
        },
        save() {
            this.setAlignement(this.modelAlignement);
            this.$root.$emit('initAlignement');
            this.$modal.hide('open-alignements-modal');
        },
        changeNbJoueurs(){
            if(this.modelAlignement.nbPlayers === 11){   
                this.lstSystemes = this.lstSystemes11Players;
                this.modelAlignement.systeme = {'systeme':'4-4-2','att':2,'mc':4, 'def':4};
            }else if(this.modelAlignement.nbPlayers === 9){
                this.lstSystemes = this.lstSystemes9Players;
                this.modelAlignement.systeme = {'systeme':'3-3-2','att':2,'mc':3, 'def':3};
            }else if(this.modelAlignement.nbPlayers === 7){
                this.lstSystemes = this.lstSystemes7players;
                this.modelAlignement.systeme = {'systeme':'2-3-1','att':1,'mc':3, 'def':2};
            }else if(this.modelAlignement.nbPlayers === 5){
                this.lstSystemes = this.lstSysteme5players;
                this.modelAlignement.systeme = {'systeme':'2-2','att':2,'mc':0, 'def':2};
            }
            this.changeSysteme();
        },
        ...mapMutations({setAlignement:'alignement/setAlignement'})
    },
    created(){
        this.lstSystemes = this.lstSystemes11Players;
    }
}
</script>