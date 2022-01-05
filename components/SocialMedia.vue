<template>
    <div class="list-resaux">
        <h3>Suivez-nous sur les réseaux sociaux</h3>
        <div>
        <a href="https://www.instagram.com/essoccercoach/" target="_blanc"><img src="@/assets/images/icons/instagram.svg"/></a>
        <a href="https://www.facebook.com/essoccercoach" target="_blanc"><img src="@/assets/images/icons/facebook.svg"/></a>
        <a href="https://www.youtube.com/channel/UC7tPGITAH1B0UYVS5vbhOmQ" target="_blanc"><img src="@/assets/images/icons/youtube.svg"/></a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/assets/css/variables.scss';
    .list-resaux{
        h3{
            color:$color-white-fonts;
        }
        >div{
            display: flex;
            grid-column-gap: 10px;
            img{
                width: 50px;
                height: auto;
                @media screen and (max-width: $screen-sm) {
                    width: 30px;
                }
            }
        }
    }
</style>