<template>
  <div>
    <!-- <Frame /> -->
    <header></header>
    <nav></nav>
    <div id="machine">{{ machine_name }}</div>
    <div id="result">
      <div id="summary">
        <div id="model_name">CNN</div>
        <div id="performance_1">
          <p>accuracy : 50%</p>
          <p>recall : 50%</p>
        </div>
        <div id="performance_2">
          <p>precision : 50%</p>
          <p>specificity : 50%</p>
        </div>
        <div id="warning">Warning : False</div>
        <button id="detail" @click="viewmore()">Detail</button>
      </div>
      <div id="morespace">
        <div id="space_1">
          <div id="detail_1"></div>
          <div id="detail_2"></div>
        </div>
        <div id="space_2">
          <div id="detail_3"></div>
          <div id="detail_4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Frame from '@/components/Frame.vue'
// import { reactive } from 'vue'

export default {
  name: 'HomeView',
  conponents: {
    // Frame
  },
  data() {
    return {
      machine_name: 'machine_1'
    }
  },
  setup() {
    // const machine = reactive({
    //   machine_name: 'Machine_1'
    // })
    // return machine
  },
  created() {},
  mounted() {},
  methods: {
    viewmore() {
      // more = this.parentElement.previousElementSibling

      const more = document.getElementById('detail').parentElement.nextSibling
      // more.parentElement.previousElementSibling.style.height = '10px'
      if (more.style.display === 'flex') {
        more.style.display = 'none'
      } else {
        more.style.display = 'flex'
      }
    }
  }
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

  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
}

/* nav */
nav {
  background-color: rgb(222, 137, 137);
  height: calc(100vh - 55px);
  width: 250px;
  /* padding-top: 15px; */
  /* padding-bottom: 25px; */
  margin: 0;

  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* main */
#machine {
  margin-top: 10px;
  margin-left: 260px;
  width: 1200px;
  font-size: 30px;
  /* border: 1px solid black; */
}
#result {
  margin-top: 10px;
  margin-left: 260px;
  /* width: 70vw; */
  /* height: 120px; */
  /* border: 1px solid black; */
  background-color: rgb(206, 206, 206);
  overflow: hidden;
}
#summary {
  display: flex;
}
#model_name {
  margin-left: 20px;
  margin-top: 15px;
  /* border: 1px solid black; */
  height: 100px;
  font-size: 30px;
  margin-right: 40px;
}
#performance_1,
#performance_2 {
  /* margin-left: 80px; */
  /* border: 1px solid black; */
  height: 100px;
  font-size: 20px;
  width: 20vw;
  white-space: nowrap;
}
p {
  margin-top: 13px;
}
#warning {
  /* margin-left: 30px; */
  margin-top: 30px;
  /* border: 1px solid black; */
  height: 80px;
  font-size: 35px;
  color: red;
  white-space: nowrap;
}
#detail {
  height: 30px;
  width: 70px;
  margin-left: 20px;
  margin-top: 80px;
}
#morespace {
  /* border: 1px solid black; */
  height: 400px;
  width: 80vw;
  display: none;
  overflow: hidden;
}
#detail_1 {
  border: 1px solid black;
  margin: 15px;
  float: left;
  width: 35vw;
  height: 150px;
}
#detail_2 {
  border: 1px solid black;
  margin: 15px;
  float: left;
  width: 35vw;
  height: 150px;
}
#detail_3 {
  border: 1px solid black;
  margin: 15px;
  float: left;
  width: 35vw;
  height: 230px;
}
#detail_4 {
  border: 1px solid black;
  margin: 15px;
  float: left;
  width: 35vw;
  height: 70px;
}
/* #space_1,
#space_2 {
  border: 1px solid black;
} */
</style>
