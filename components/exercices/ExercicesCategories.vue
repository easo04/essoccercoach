<template>
    <div class="menu-types-exercices">
        <h4>Catégories d'exercices</h4>
        <div class="types">
            <div :class="{'active':current==='tous'}" @click="setCategorieActive('tous')"><a>Tous</a></div>
            <div :class="{'active':current==='rondos'}" @click="setCategorieActive('rondos')"><a>Rondos</a></div>
            <div :class="{'active':current==='offensif'}" @click="setCategorieActive('offensif')"><a>Offensifs</a></div>
            <div :class="{'active':current==='deffensif'}" @click="setCategorieActive('deffensif')"><a>Déffensifs</a></div>
            <div :class="{'active':current==='physique'}" @click="setCategorieActive('physique')"><a>Physiques</a></div>
            <div :class="{'active':current==='tactiques'}" @click="setCategorieActive('tactiques')"><a>Tactiques</a></div>
            <div :class="{'active':current==='gardien'}" @click="setCategorieActive('gardien')"><a>Gardiens</a></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            current:'tous'
        }
    },
    methods:{
        setCategorieActive(categorie){
            this.current = categorie;
        }
    }
}
</script>