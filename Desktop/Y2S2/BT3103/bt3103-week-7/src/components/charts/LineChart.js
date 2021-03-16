import { Line } from 'vue-chartjs';
import axios from 'axios';

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: []
            },
            options: {
                legend: { display: true }, 
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRation: false
            },
            borderColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#ffff99"]
        }
    },
    methods: {
        fetchItems: function() {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response => {
                for (let i = 0; i < response.data.region_metadata.length; i++) {
                    let inputData = {
                        data: [],
                        label: response.data.region_metadata[i].name,
                        borderColor: this.borderColor[i],
                        fill: false
                    }
                    this.datacollection.datasets.push(inputData);
                }
                for (let i = 0; i < response.data.items.length; i++) {
                    this.datacollection.labels.push(response.data.items[i].timestamp)
                }
                console.log(response.data.items);
                this.addData(response.data.items);
                this.renderChart(this.datacollection, this.options)
            })
        },
        addData: function(data) {
            for (let i = 0; i < data.length; i++) {
                this.checkRegion(data[i].readings.psi_twenty_four_hourly);
            }
        },
        checkRegion: function(psiReading) {
            let psiData = 0;
            for (let i = 0; i < this.datacollection.datasets.length; i++) {
                if (i == 0) {
                    psiData = psiReading.west;
                } else if (i == 1) {
                    psiData = psiReading.national;
                } else if (i == 2) {
                    psiData = psiReading.east;
                } else if (i == 3) {
                    psiData = psiReading.central;
                } else if (i == 4) {
                    psiData = psiReading.south;
                } else {
                    psiData = psiReading.north;
                }
                this.datacollection.datasets[i].data.push(psiData);
            }
        }
    },
    created() {
        this.fetchItems();
    }
}