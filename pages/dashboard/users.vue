<template>
    <div class="dashboard">
        <h2>Usagers</h2>
        <p>La liste d'usagers de l'application.</p>
    </div>
</template>
<script>
export default {
    middleware: 'authentificated',
    layout:'connected'
}
</script>