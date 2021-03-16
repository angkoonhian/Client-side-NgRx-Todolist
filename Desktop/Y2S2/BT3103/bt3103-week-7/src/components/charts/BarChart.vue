<template>
  <div class="chart">
    <h1>Bar Chart</h1>
    <chart></chart>
  </div>
</template>
<script>
import Chart from "./BarChart.js";
export default {
  name: "BarChart",
  components: {
    Chart
  }
};
</script>

<style>
  #BarChart {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>