<template>
    <MessageForm :prop_message="message" v-show="message" />
    <div id="burger-table" v-if="burgers">
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.user_name }}</div>
                <div>{{ burger.bread }}</div>
                <div>{{ burger.beef }}</div>
                <div>
                    <ul v-for="(optional, index) in burger.optional" :key="index">
                        <li>{{ optional }}</li>
                    </ul>
                </div>
                <div>
                    <select name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option :value="s.type" v-for="s in status" :key="s.id" :selected="burger.status == s.type">
                            {{ s.description }}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Deletar</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2>Não há pedidos no momento!</h2>
    </div>
</template>

<script>
import MessageForm from './MessageForm.vue';

export default {
    components: { MessageForm },
    name: 'Dashboard',
    data() {
        return {
            burgers: [],
            burger_id: null,
            status: [],
            message: '',
        };
    },
    methods: {
        async getOrders() {
            const req = await fetch('http://localhost:3000/burgers');

            const data = await req.json();

            this.burgers = data;

            await this.getStatus();
        },
        async getStatus() {
            const req = await fetch('http://localhost:3000/status');

            const data = await req.json();

            this.status = data;
        },
        async updateBurger(event, burgerId) {
            const option_status = event.target.value;

            const dataJson = JSON.stringify({ status: option_status });

            await fetch(`http://localhost:3000/burgers/${burgerId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: dataJson,
            });

            this.message = `Pedido ${burgerId} atualizado!`;

            setTimeout(() => (this.message = ''), 3000);
        },
        async deleteBurger(burgerId) {
            await fetch(`http://localhost:3000/burgers/${burgerId}`, {
                method: 'DELETE',
            });

            this.burgers = this.burgers.filter(({ id }) => id !== burgerId);

            this.message = `Pedido ${burgerId} deletado!`;

            setTimeout(() => (this.message = ''), 3000);
        },
    },
    mounted() {
        this.getOrders();
    },
};
</script>

<style scoped>
#burger-table {
    max-width: 1200px;
    margin: 0 auto;
}
#burger-table-heading,
#burger-table-rows,
.burger-table-row {
    display: flex;
    flex-wrap: wrap;
}
#burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}
.burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #ccc;
}
#burger-table-heading div,
.burger-table-row div {
    width: 19%;
}
#burger-table-heading .order-id,
.burger-table-row .order-number {
    width: 5%;
}
select {
    padding: 12px 6px;
    margin-right: 12px;
}
.delete-btn {
    background-color: #222;
    color: #fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: 0.5s;
}

.delete-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>
