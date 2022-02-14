<template>
    <Banner />
    <div class="container oders">
        <div id="orders">Pedidos</div>
        <Dashboard />
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import Dashboard from '@/components/Dashboard.vue';

export default {
    name: 'Orders',
    components: { Banner, Dashboard },
};
</script>

<style scoped>
#orders {
    min-height: 200px;
}
</style>
