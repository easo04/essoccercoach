<template>
    <div class="container">
        <h1 class="title" v-if="modePresentation">
            essoccercoach
        </h1>
        <h1 class="title" v-else>
            off essoccercoach
        </h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    head(){
        return{
            title:'Exercices de soccer | ESsoccercoach',
            meta:[
                {
                    hid:'description',
                    name:'description',
                    content:'Exercices de soccer'
                }
            ]
        }
    },
    computed:{
        ...mapState(['modePresentation'])
    }
}
</script>

<style lang="scss">

</style>