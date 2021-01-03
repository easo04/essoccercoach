<template>
    <div class="select-list">
        <div class="item" v-for="(item, i) in listeItems" :key="i">
            {{item.label}}
        </div>
    </div>
</template>
<script>
export default {
    props:['listeItems']
}
</script>