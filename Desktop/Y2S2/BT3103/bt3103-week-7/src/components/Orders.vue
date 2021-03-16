<template lang="">
    <div>
        <div>
            <ul class="flex-child items">
                <li v-for="(order, idx) in orders" :key="idx" id="order">
                    <p v-for="(dish, idx) in order[1]" :key="idx" id="dish">
                        {{dish.name}} : {{dish.quantity}}
                    </p>
                    <button v-on:click="deleteItem($event)" v-bind:id="order[0]">Delete</button>
                    <button v-bind:order="idx"
                    v-on:click="route($event)">Modify</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import database from '../firebase.js';

export default {
    name: 'Orders',
    data() {
        return {
            orders: [],
        }
    },
    methods: {
        fetchItems: function() {
           database.collection('orders').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.orders.push([
                    doc.id,
                    doc.data().orders
                ])
            });
        });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            console.log(doc_id);
            database.collection('orders').doc(doc_id).delete().then(() => {
                location.reload();
            });
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("order");
            this.$router.push({ path: `/modify`, name:"modify", params: { orderID: this.orders[doc_id][0] }, props:true});
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }

    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
    }
</style>