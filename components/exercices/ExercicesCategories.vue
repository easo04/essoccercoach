<template>
    <div class="menu-types-exercices">
        <h4>Catégories d'exercices</h4>
        <div class="types">
            <div :class="{'active':current===categorie.name}" @click="setCategorieActive(categorie.name)" v-for="(categorie, i) in categories" :key="i">
                <a @click="goToCategorie(categorie.name)">{{categorie.label}}</a>
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
            current:this.currentCategorie || 'populaires'
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
            let pathCategorie = `/exercices/categorie/${categorie}`;
            if(categorie === 'populaires'){
                pathCategorie = '/exercices';
            }
            this.$router.push({path:pathCategorie});
        }
    },
    mounted(){
    }
}
</script>