<template lang="">
        <div class="flex-container">
            <div class="col-3 flex-child minus" style="text-align: center;">
                <button v-on:click="decrement()" style="width: 90%; background-color: #CC2936; border-radius: 10px;">
                    <h1>-</h1>
                </button>
            </div>
            <div class="" style="text-align: center; width: 50px;">
                <h1>{{ counter }}</h1>
            </div>
            <div class="flex-child plus" style="text-align: center;">
                <button v-on:click="increment()" style="width: 90%; background-color: #CC2936; border-radius: 10px;">
                    <h1>+</h1>
                </button>
            </div>
        </div>
</template>
<script>
    export default {
        name: 'QuantityCounter',
        props: ['item'],
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            increment: function() {
                if (this.counter == 10) {
                    alert("You cannot buy more than 10 items.");
                } else {
                    this.counter++;
                }
                this.$emit('counter', this.item, this.counter);
            },
            decrement: function() {
                if (this.counter != 0) {
                    this.counter --;
                }
                this.$emit('counter', this.item, this.counter);
            }
        }
    }
</script>

<style>
    .flex-container {
        display: flex;
    }

    .flex-child {
        flex: 6;
    }

    .flex-child:first-child {
        margin-right: 20px;
        margin-left: 200px;
    }

    .flex-child:last-child {
        margin-right: 200px;
        margin-left: 20px;
    }
</style>