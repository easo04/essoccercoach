<template>
    <div class="menu-types-exercices">
        <h4>Catégories d'exercices</h4>
        <div class="types">
            <div :class="{'active':current===categorie.name}" @click="goToCategorie(categorie.name);" v-for="(categorie, i) in categories" :key="i">
                <a>{{categorie.label}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    props:['currentCategorie'],
    data(){
        return{
            current:undefined
        }
    },
    computed:{
        ...mapState(['categories'])
    },
    methods:{
        setCategorieActive(categorie){
            this.current = categorie;
        },
        goToCategorie(categorie){
            //this.setCategorieActive(categorie);

            let pathCategorie = `/exercices/categorie/${categorie}`;
            if(categorie === 'populaires'){
                pathCategorie = '/exercices';
            }
            this.$router.push({path:pathCategorie});
        }
    },
    mounted(){
        console.log('current ' + this.currentCategorie)
        this.current = this.currentCategorie || 'populaires'
    }
}
</script>