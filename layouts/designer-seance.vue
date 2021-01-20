<template>
    <div class="application">
        <Header/>
        <div class="content">
            <Nuxt />
        </div>
        <div class="footer-designer-seance">
            © Outil créé par ESsoccercoach
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
    .footer-designer-seance{
        width: 100%;
        background: #28ABB9;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#FBFBFB;
        font-family: Open Sans;
        font-size: 12px;
        height: 25px;
    }
</style>