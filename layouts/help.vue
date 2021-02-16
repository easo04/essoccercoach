<template>
    <div class="application">
        <Header/>
        <div class="content help-page">
            <div class="menu-help">
                <div class="item-principal" :class="{'active':itemSelected==='esdesigner'}" @click="setItemSelected('esdesigner')">
                    <h4 v-if="itemSelected==='esdesigner'"><font-awesome-icon :icon="['fas', 'chevron-down']"/> ESDesigner</h4>
                    <h4 v-else><font-awesome-icon :icon="['fas', 'chevron-right']"/> ESDesigner</h4>
                    <div class="items-secondaires" v-show="itemSelected==='esdesigner'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsDesigner" :key="i" @click="setSencondaryItem(item.item)">
                            {{item.label}}
                        </div>
                    </div>
                </div>
                <div class="item-principal" :class="{'active':itemSelected==='seance'}" @click="setItemSelected('seance')">
                    <h4 v-if="itemSelected==='seance'"><font-awesome-icon :icon="['fas', 'chevron-down']"/> Création d'une séance d'entrâinement</h4>
                    <h4 v-else><font-awesome-icon :icon="['fas', 'chevron-right']"/>  Création d'une séance d'entrâinement</h4>
                    <div class="items-secondaires" v-show="itemSelected==='seance'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsSeance" :key="i" @click="setSencondaryItem(item.item)">
                            {{item.label}}
                        </div>
                    </div>
                </div>
                <div class="item-principal" :class="{'active':itemSelected==='alignement'}" @click="setItemSelected('alignement')">
                    <h4 v-if="itemSelected==='alignement'"><font-awesome-icon :icon="['fas', 'chevron-down']"/> Création d'un alignement</h4>
                    <h4 v-else><font-awesome-icon :icon="['fas', 'chevron-right']"/>  Création d'un alignement</h4>
                    <div class="items-secondaires" v-show="itemSelected==='alignement'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsAlignement" :key="i" @click="setSencondaryItem(item.item)">
                            {{item.label}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-help">
                <nuxt/>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
export default {
    head(){
        return{
            title:'Le créateur d\'exercices de soccer | ESSoccerCoach',
            meta:[
                {
                    hid:'description',
                    name:'description',
                    content:'Vous cherchez un outil pour créer vos exercices de soccer gratuitement? Nous avons le meilleur outil pour vous ✅ Création d\'exercices ✅ Création de séances ✅ Création d\'alignements'
                },
                {
                    hid:'keywords',
                    name:'keywords',
                    content:'exercices de soccer, soccer coach, créateur d\'exercices'
                },
                {
                    hid:'robots',
                    name:'robots',
                    content:'index'
                },
            ],
        }

    },
    data(){
        return{
            itemSelected:'esdesigner',
            itemsDesigner:[{item:'commencer', label:'Commencer', selected:false, url:''}, {item:'formes', label:'Formes', selected:false, url:''}],
            itemsSeance:[{item:'commencer-seance', label:'Commencer', selected:false, url:''}, {item:'ajout-exercice', label:'Ajouter exercice', selected:false, url:''}],
            itemsAlignement:[{item:'commencer-alignement', label:'Commencer', selected:false, url:''}, {item:'ajout-joueurs', label:'Ajouter joueur', selected:false, url:''}],
            secondarySelected:'commencer'
        }
    },
    methods:{
        setItemSelected(item){
            this.itemSelected = item;

            if(item==='seance'){
                this.setSencondaryItem('commencer-seance');
            }else if(item==='alignement'){
                this.setSencondaryItem('commencer-alignement');
            }else{
                this.setSencondaryItem('commencer');
            }
        },
        setSencondaryItem(item){
            this.secondarySelected = item;
        }
    }
}
</script>