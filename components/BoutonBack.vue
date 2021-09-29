<template>
    <div class="back-link" :title="title">
        <span @click="back()"><font-awesome-icon :icon="['fas', 'arrow-left']"/> {{title}}</span>
    </div>
</template>
<script>
export default {
    props:['title'],
    methods:{
        back(){
            history.back();
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';
    .back-link{
        span{
            @include blue-link;
            font-size: 0.8em;
            font-style: italic;
        }
        margin-bottom: 20px;
    }
</style>