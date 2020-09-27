<template>
  <div id="app">

    <MainForm />

    <!-- <MainList /> -->

  </div>
</template>

<script>
import MainForm from './components/mainForm.vue'
// import MainList from './components/mainList.vue'

export default {
  name: 'App',
  components: {
    MainForm,
    // MainList,  
  }
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
