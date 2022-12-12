<template>
  <div>
    <header></header>
    <nav>
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
              class="accordion-button collapsed groupbutton"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseOne"
            >
              group_1
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">machine_1</li>
                <li class="list-group-item">machine_2</li>
                <li class="list-group-item">machine_3</li>
                <li class="list-group-item">machine_4</li>
                <li class="list-group-item">machine_5</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed groupbutton"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              group_2
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div class="accordion-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">machine_6</li>
                <li class="list-group-item">machine_7</li>
                <li class="list-group-item">machine_8</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
            <button
              class="accordion-button collapsed groupbutton"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              group_3
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div class="accordion-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">machine_9</li>
                <li class="list-group-item">machine_10</li>
                <li class="list-group-item">machine_11</li>
                <li class="list-group-item">machine_12</li>
                <li class="list-group-item">machine_13</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- nav끝 -->
  </div>
</template>

<script>
// import Frame from '@/components/Frame.vue'
// import { reactive } from 'vue'

export default {
  conponents: {
    // Frame
  },
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
  height: 70px;
  width: 100%;
  background-color: #838383;

  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
}

/* nav */
nav {
  background-color: rgb(191, 191, 191);
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
.accordion *,
.accordion {
  background-color: transparent;
}
.list-group-flush {
  text-align: left;
}
</style>
