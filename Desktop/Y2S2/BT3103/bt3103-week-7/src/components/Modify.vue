<template lang="">
    <div>
        <form v-on:submit="updateOrder">
            <h3 v-for="(dish, idx) in dataPacket[0]" :key="idx" id="orderList">
                {{dish.name}} : {{dish.quantity}}
                <br>
                <input type="number" placeholder="0" min="0" v-model.number="subOrder[0][idx].quantity">
            </h3>
            <button type="submit" id="update">Update Order</button>
        </form>
    </div>
</template>
<script>
import database from '../firebase.js'

export default {
    name: 'modify',
    props: ['orderID'],
    data() {
        return {
            subOrder: [],
            dataPacket: []
        }
    },
    created() {
        this.fetchItem();
    },
    methods: {
        updateOrder: function(e) {
            e.preventDefault();
            console.log("hello")
            database.collection('orders').doc(this.orderID).set({
                orders: this.subOrder[0]
            }).then(this.$router.push({path: `/orders`, name: "orders"}))
        },
        fetchItem: function() {
            let lazyOrder = [];
            console.log(this.orderID);
            database.collection('orders').doc(this.orderID).get().then(function(doc) {
                for (let i = 0; i < doc.data().orders.length; i++) {
                    lazyOrder.push(doc.data().orders[i])
                }
            });
            this.dataPacket.push(lazyOrder);
            this.subOrder.push(lazyOrder);
        }
    }
}


</script>
<style>
    input {
        height: 30px;
        width: 200px;
        margin-top: 10px;
    }

    #update {
        height: 40px;
        width: 200px;
        font-weight: 700;
        font-size: 20px;
    }
</style>