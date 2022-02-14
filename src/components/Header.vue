<template>
    <div id="nav">
        <router-link to="/" id="logo_url"><img :src="logo" :alt="alt" id="logo" /></router-link>
        <router-link to="/">Inicial</router-link> |
        <router-link to="/orders">Pedidos</router-link>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['logo', 'alt'],
};
</script>

<style scoped>
#nav {
    display: flex;
    background-color: #222;
    border-bottom: 4px solid #dddddd;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
}

#logo_url {
    margin: auto;
    margin-left: 0px;
}

#logo {
    height: 40px;
}
</style>
