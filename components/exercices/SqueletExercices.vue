<template>
    <div class="squelet-exerice">
        <div class="liens">
            <div class="lien"></div>
        </div>
            <div class="content-exercices-page">
                <div class="content-left-exercices">
                    <div class="liste-exercices">
                        <div class="item-exercice" v-for="(item, i) in items" :key="i">
                            <div class="image"></div>
                            <div class="description">
                                <div class="titre"></div>
                                <div class="infos"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[1,2,3,4,5,7,8,9,10,11,12,13]
        }
    }
}
</script>