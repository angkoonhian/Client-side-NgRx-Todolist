<template lang="">
    <div class="flex-container">
        <div>
            <ul class="flex-child items">
                <li v-for="(item, idx) in items" :key="idx" id="itemsList">
                    <h1 id="itemName">{{ item.name }}</h1>
                    <img v-bind:src="item.imageURL">
                    <h1 id="price">${{ item.price }}</h1>
                    <quantity-counter v-bind:item="item" v-on:counter="onCounter"></quantity-counter>
                </li>
            </ul>
        </div>
        <div class="flex-child order">
            <basket v-bind:itemsSelected="itemsSelected" v-bind:items="items" id="shoppingBasket" ></basket>
        </div>
    </div>
</template>
<script>
import QuantityCounter from './QuantityCounter';
import Basket from './Basket';
import database from '../firebase.js';

export default {
    name: 'pageContent',
    data() {
        return {
            itemsSelected: [],
            items: [],
        }
    },
    created() {
        database.collection('menu').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.items.push(doc.data());
            });
        });
    },
    methods: {
        onCounter: function (item, count) {
            // boolean flag to check if item is in selected
            let itemNotPresent = false;
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    itemNotPresent = false;
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i,1);
                        this.itemsSelected.push([item.name, count, item.price]);
                        break;
                    } 
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name === item.name && count === 0) {
                        this.itemsSelected.splice(i,1)
                        break;
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    else {
                        itemNotPresent = true;
                    }
                }
                // if item not present then we push new item into itemSelected
                if (itemNotPresent) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
    },
    components: {
        QuantityCounter,
        Basket
    },
}
</script>
<style>
    .flex-container {
        display: flex;
    }

    .flex-child {
        flex: auto;
    }
    #itemsList {
        width: 80%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
    }
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
    img {
        width: 135px;
        height: 135px;
    }

    #price {
        font-size: 30px;
    }

    #itemName {
        font-size: 30px;
    }

    #shoppingBasket {
        position: absolute;
        top: 23%;
        left: 78%;
    }
</style>