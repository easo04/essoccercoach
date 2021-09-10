<template>
    <div class="modal-custom" :class="`modal-${name}`">
        <div class="modal-header">
            <slot name="modal-header"></slot>
        </div>
        <div class="modal-content">
            <slot name="modal-content"></slot>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <slot name="modal-footer"></slot>  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['name'],
    methods:{
        hide(){
            this.$modal.hide(`modal-${this.name}`);
        },
    }
}
</script>