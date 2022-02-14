<template>
    <MessageForm :prop_message="message" v-show="message" />
    <form id="burger-form" @submit="createBurger">
        <div class="input-container">
            <label for="user_name">Nome do cliente</label>
            <input type="text" id="user_name" v-model="user_name" placeholder="Insira seu nome" />
        </div>
        <div class="input-container">
            <label for="bread">Escolha o pao</label>
            <select name="bread" id="bread" v-model="bread">
                <option value="">Selecione...</option>
                <option v-for="b in breads_data" :key="b.id">{{ b.type }}</option>
            </select>
        </div>
        <div class="input-container">
            <label for="beef">Escolha a carne</label>
            <select name="beef" id="beef" v-model="beef">
                <option value="">Selecione...</option>
                <option v-for="b in beefs_data" :key="b.id">{{ b.type }}</option>
            </select>
        </div>
        <div class="input-container">
            <label for="optional">Escolha op ocionais</label>
            <div class="checkbox-container" v-for="o in optional_data" :key="o.id">
                <input type="checkbox" v-model="optional" :value="o.type" />
                <span>{{ o.type }}</span>
            </div>
        </div>
        <div class="input-container">
            <input type="submit" value="Criar sanduiche" />
        </div>
    </form>
</template>

<script>
import MessageForm from './MessageForm.vue';

export default {
    name: 'BurgerForm',
    components: { MessageForm },
    data() {
        return {
            breads_data: [],
            beefs_data: [],
            optional_data: [],
            user_name: null,
            bread: null,
            beef: null,
            optional: [],
            message: null,
        };
    },
    methods: {
        async populateForms() {
            const req = await fetch('http://localhost:3000/ingredients');

            const data = await req.json();

            this.breads_data = data.breads;
            this.beefs_data = data.beefs;
            this.optional_data = data.optional;
        },
        async createBurger(e) {
            e.preventDefault();

            const data = {
                user_name: this.user_name,
                bread: this.bread,
                beef: this.beef,
                optional: Array.from(this.optional),
                status: 'requested',
            };

            const dataJson = JSON.stringify(data);

            const req = await fetch('http://localhost:3000/burgers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: dataJson,
            });

            const res = await req.json();

            this.message = `Pedido ${res.id} realizado!`;

            setTimeout(() => (this.message = ''), 3000);

            this.user_name = '';
            this.bread = '';
            this.beef = '';
            this.optional = '';
        },
    },
    mounted() {
        this.populateForms();
    },
};
</script>

<style scoped></style>
