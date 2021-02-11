<template>
    <div class="dashoboard">
        <h2>Connect</h2>
        {{auth.user.email}}
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    middleware: 'auth',
    layout:'connected',
    computed: {
        ...mapState(["auth"])
    },
    mounted(){
        console.log(this.auth)
    }
}
</script>