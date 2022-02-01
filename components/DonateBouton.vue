<template>
    <div class="btn-donate">
        <a class="btn" href="https://www.paypal.com/donate?business=5TQZPY2XR6WS4&no_recurring=0&item_name=Merci+de+soutenir+le+projet+ESSoccercoach&currency_code=CAD" target="_blank">Faites un don <font-awesome-icon :icon="['fas', 'heart']"/></a>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

.btn-donate{
    margin: 40px 0;
    text-align: center;
    .btn{
        @include btn-default;
        background-color: #BAA616;
        @include font-xm-sbold;
        &:hover{
            background-color: #7e710d;
        }
    }
    
}
</style>