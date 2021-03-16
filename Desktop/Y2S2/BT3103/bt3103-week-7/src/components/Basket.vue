<template lang="">
    <div>
        <h1>Menu:</h1>
        <div v-for="(item, idx) in itemsSelected" :key="idx">
            <li style="border: 0px; font-weight: 400; font-size: 30px;">
                {{item[0]}} x {{item[1]}}
            </li>
        </div>
        <button style="height: 30px; 
        border-radius: 10px; 
        background-color: #CC2936;
        color: white;
        " v-on:click="findTotal(); sendOrder()">Add Order</button>
        <h2 v-show="calculated">SubTotal: ${{ subTotal }}</h2>
        <h2 v-show="calculated">GrandTotal: ${{grandTotal}}</h2>
    </div>
</template>
<script>
import database from '../firebase.js';

export default {
    name: 'basket',
    props: ['itemsSelected', 'items'],
    data() {
        return {
            itemList: this.itemsSelected.length,
            subTotal: 0,
            grandTotal: 0,
            calculated: false,
        }
    },
    watch: {
        subTotal: function() {
            this.grandTotal = (this.subTotal * 1.07).toFixed(2);
        },
    },
    methods: {
        findTotal: function() {
            this.calculated = true;
            this.subTotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                this.subTotal = this.subTotal + curr_item[1] * curr_item[2];
            }
        },
        sendOrder: function() {
            let orders= [];
            for (let i = 0; i < this.items.length; i++) {
                orders.push({
                    name: this.items[i].name,
                    quantity: 0
                })
            }
            for (let i = 0; i < this.itemsSelected.length; i++) {
                for (let j = 0; j < orders.length; j++) {
                    if (this.itemsSelected[i][0] === orders[j].name) {
                        orders[j].quantity = this.itemsSelected[i][1];
                    }
                }
            }
            database.collection('orders').add({
                    orders
                }).then(() => {
                    location.reload();
                })
        }
    },
    created() {
        console.log(this.items);
    }
}
</script>
<style lang="">
    
</style>