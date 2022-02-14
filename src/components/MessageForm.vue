<template>
    <div class="container-message">
        {{ prop_message }}
    </div>
</template>

<script>
export default {
    name: 'MessageForm',
    props: {
        prop_message: String,
    },
};
</script>

<style scoped></style>
