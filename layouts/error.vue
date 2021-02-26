<template>
    <div class="error-page">
        <div v-if="error.statusCode === 404" class="page-content">
            <div>
                <h2>Page non trouvée</h2>
                <span class="error-code">404</span>
            </div>
        </div>
        <div v-else class="page-content">
            <div>
                <h2>Erreur inconnue :(</h2>
                <span class="error-code">500</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page
}
</script>