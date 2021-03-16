<template>
  <div id="app">
    <nav>
      <h1 style="font-size: 70px; font-weight: 300"><u>Koon Hian's best store!!</u></h1>
      <div>
        <ul>
          <li><a><router-link to="/" exact>Home</router-link></a></li>
          <li><router-link to="/orders" exact>Orders</router-link></li>
          <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
