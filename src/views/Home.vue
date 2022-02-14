<template>
    <Banner />
    <div class="container_main">
        <div id="home">
            <BurgerForm />
        </div>
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import BurgerForm from '@/components/BurgerForm.vue';

export default {
    name: 'Home',
    components: { Banner, BurgerForm },
};
</script>

<style scoped>
#home {
    min-height: 200px;
}
</style>
