<template>
    <div class="modal-first-design modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Un nouveau design pour vous</h3></div>
            <div class="close-modal"><span @click="hide()"><i class="fas fa-times"></i></span></div>
        </div>
        <div class="modal-content">

        </div>
        <div class="modal-footer">
            <button class="btn btn-default" @click="hide()">Close</button>
        </div>
    </div>
</template>
<script>
export default {
    props:['text'],
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    },
    mount () {
        //this.show()
    }
}
</script>