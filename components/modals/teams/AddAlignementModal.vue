<template>
    <div class="modal-add-alignement modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un alignement à votre match</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            Holis
        </div>
    </div>          
</template>
<script>
export default {
    props:['activity'],
    methods:{
        hide(){
            this.$modal.hide('modal-add-alignement');
        }
    }
}
</script>