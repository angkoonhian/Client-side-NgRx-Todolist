import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels:["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette"],
                datasets: [{
                    label: ["Dishes"],
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#ffff99"],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Number of dishes ordered'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    var item = doc.data().orders
                    for (let i = 0; i < item.length; i++) {
                        this.addData(item[i]);
                    }
                })
                this.renderChart(this.datacollection, this.options);
            })
        },
        addData: function(dish) {
            for (let i = 0; i < this.datacollection.labels.length; i++) {
                if (dish.name == this.datacollection.labels[i]) {
                    this.datacollection.datasets[0].data[i] += dish.quantity;
                }
            }
        }
    },
    created() {
        for (let i = 0; i < this.datacollection.labels.length; i++) {
            this.datacollection.datasets[0].data.push(0);
        }
        this.fetchItems();
    }
}