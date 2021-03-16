<template lang="">
    <div class="chart">
        <h1>Bar Chart</h1>
        <BarChart></BarChart>
        <h1>Line Chart (API)</h1>
        <LineChart></LineChart>
    </div>
</template>
<script>
import BarChart from "./charts/BarChart.js"
import LineChart from "./charts/LineChart.js"

export default {
    name: 'Dashboard',
    components: {
        BarChart,
        LineChart
    }
}

</script>
<style>
</style>