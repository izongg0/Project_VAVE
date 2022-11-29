<template>
  <div id="body">
    <header></header>
    <nav></nav>
  </div>
</template>

<script>
export default {
  conponents: {},
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped>
/* template */
template {
  height: 100vh;
  width: 100vw;
  margin: 0;
}

/* header */
header {
  height: 55px;
  width: 100%;
  background-color: #fcc820;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

/* nav */
nav {
  background-color: rgb(222, 137, 137);
  height: calc(100vh - 55px);
  width: 250px;
  padding-top: 15px;
  padding-bottom: 25px;
  margin: 0;

  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
