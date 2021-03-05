<template>
    <div class="application">
        <Header/>
        <div class="content help-page">
            <div class="menu-help" :class="{'show' :  show}">
                <div class="item-principal" :class="{'active':itemSelected==='esdesigner'}">
                    <h4 v-if="itemSelected==='esdesigner'" @click="setItemSelected('esdesigner')"><font-awesome-icon :icon="['fas', 'chevron-down']"/> ESDesigner</h4>
                    <h4 v-else @click="setItemSelected('esdesigner')"><font-awesome-icon :icon="['fas', 'chevron-right']"/> ESDesigner</h4>
                    <div class="items-secondaires" v-show="itemSelected==='esdesigner'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsDesigner" :key="i" @click="setSencondaryItem(item.item)">
                            <NuxtLink :to="item.url">{{item.label}}</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="item-principal" :class="{'active':itemSelected==='seance'}">
                    <h4 v-if="itemSelected==='seance'"><font-awesome-icon :icon="['fas', 'chevron-down']"/> Création d'une séance d'entrâinement</h4>
                    <h4 v-else @click="setItemSelected('seance')"><font-awesome-icon :icon="['fas', 'chevron-right']"/>  Création d'une séance d'entrâinement</h4>
                    <div class="items-secondaires" v-show="itemSelected==='seance'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsSeance" :key="i" @click="setSencondaryItem(item.item)">
                            <NuxtLink :to="item.url">{{item.label}}</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="item-principal" :class="{'active':itemSelected==='alignement'}" @click="setItemSelected('alignement')">
                    <h4 v-if="itemSelected==='alignement'"><font-awesome-icon :icon="['fas', 'chevron-down']"/> Création d'un alignement</h4>
                    <h4 v-else><font-awesome-icon :icon="['fas', 'chevron-right']"/>  Création d'un alignement</h4>
                    <div class="items-secondaires" v-show="itemSelected==='alignement'">
                        <div class="item" :class="{'selected': item.item === secondarySelected}" v-for="(item, i) in itemsAlignement" :key="i" @click="setSencondaryItem(item.item)">
                            <NuxtLink :to="item.url">{{item.label}}</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="unshow-menu" @click="showMenu()"><font-awesome-icon :icon="['fas', 'caret-left']"/></div>
            </div>
            <div class="show-menu" @click="showMenu()" v-if="!show"><font-awesome-icon :icon="['fas', 'bars']"/></div>
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
            title:'Documentation | ESsoccercoach',
        }
    },
    data(){
        return{
            itemSelected:'esdesigner',
            itemsDesigner:[{item:'commencer', label:'Commencer', selected:false, url:'/help'}, {item:'formes', label:'Ajouter des formes', selected:false, url:'/help/esdesigner-formes'},
            {item:'texte', label:'Ajouter du texte', selected:false, url:'/help/esdesigner-texte'}],
            itemsSeance:[{item:'commencer-seance', label:'Commencer', selected:false, url:'/help/seances'}, {item:'ajout-exercice', label:'Ajouter un exercice', selected:false, url:'/help/seances/add-exercice'}],
            itemsAlignement:[{item:'commencer-alignement', label:'Commencer', selected:false, url:'/help/alignements'}],
            secondarySelected:'commencer',
            show:false
        }
    },
    methods:{
        setItemSelected(item){
            this.itemSelected = item;

            if(item ==='seance'){
                this.setSencondaryItem('commencer-seance');
                this.$router.push('/help/seances');
            }else if(item ==='alignement'){
                this.setSencondaryItem('commencer-alignement');
                this.$router.push('/help/alignements');
            }else{
                this.setSencondaryItem('commencer');
                this.$router.push('/help');
            }
        },
        setSencondaryItem(item){
            this.secondarySelected = item;
            this.showMenu();
        },
        showMenu(){
            this.show = !this.show;
        }
    },
    created(){
        const path = this.$route.path;
        let item = this.itemsDesigner.find(i=>i.url === path);
        let itemLabel = 'esdesigner';
        if(!item){
            item = this.itemsSeance.find(i=>i.url === path);
            itemLabel = 'seance';
            if(!item){
                item = this.itemsAlignement.find(i=>i.url === path);
                itemLabel = 'alignement';
            }
        }

        if(item){
            this.itemSelected = itemLabel;
            this.secondarySelected = item.item;
        }
    }
}
</script>