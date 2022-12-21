<template>
  <div class="full">
    <!-- <Frame /> -->
    <header>
      <div id="space"></div>
      <p id="title">VAVE</p>
      <div>
        <button
          class="btn btn-primary addgroup btn-light"
          id="mypagecolor"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Mypage
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header mypagecolor">
            <button
              type="button"
              class="btn-close xbar"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body mypagecolor">
            <div>
              <label for="userEmail" class="mypagen2"><b>Email</b></label>
              <div>
                <p class="mypageright">{{ users.email }}</p>
              </div>
            </div>
            <div>
              <label for="userName" class="mypagen2"><b>Name</b></label>
              <div>
                <p class="mypageright">{{ users.name }}</p>
              </div>
            </div>
            <div>
              <button id="editsave" @click="MoveMypage()">
                <b>프로필편집하기</b>
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-light addgroup"
          @click="MoveLogin()"
        >
          Logout
        </button>
      </div>
    </header>
    <nav>
      <!-- <button type="button" class="btn btn-light addgroup">그룹 추가</button> -->
      <button
        type="button"
        class="btn btn-light addfile"
        id="fileBtn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        파일 추가
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <strong>파일 추가하기</strong>
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <input
                  type="file"
                  id="ex_file"
                  ref="uploadFile"
                  @change="onFileSelected()"
                  accept="files/*"
                />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="closeBtn"
                data-bs-dismiss="modal"
                @click="uploadFile()"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="list-group">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          :key="t"
          v-for="(filename, t) in file_list.file"
          @click="file_click(filename['fileName'], filename['originalName'])"
        >
          {{ filename['originalName'] }}
        </button>
      </div>
    </nav>
    <div id="machine">{{ model_1.machine }}</div>
    <p>{{ graph_time_data }}</p>
    <p>{{ graph_time_data1 }}</p>
    <div style="display: flex">
      <div class="graph">
        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="graph_time_data1"
        />
      </div>
      <div class="graph1">
        <Bar
          id="my-chart-id"
          :options="chartOptions1"
          :data="graph_fourier_data"
        />
      </div>
    </div>
    <div id="result">
      <div id="summary">
        <div class="model_name" style="font-size: 30px">
          Method1
          <p style="font-size: 21px">Autoencoding + MLP</p>
        </div>
        <div id="performance_1">
          <p>accuracy : {{ model_1.accuracy * 100 }}%</p>
          <p>recall : {{ model_1.recall * 100 }}%</p>
        </div>
        <div id="performance_2">
          <p>precision : {{ model_1.precision * 100 }}%</p>
          <p>specificity : {{ model_1.specificity * 100 }}%</p>
        </div>
        <div id="warning">Warning : {{ model_1.failure }}</div>
        <!-- <button id="detail1">Detail</button> -->
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
    <div id="result">
      <div id="summary">
        <div class="model_name">
          Method2
          <p style="font-size: 21px">PCA + Tsne + MLP</p>
        </div>
        <div id="performance_1">
          <p>accuracy : {{ model_2.accuracy * 100 }}%</p>
          <p>recall : {{ model_2.recall * 100 }}%</p>
        </div>
        <div id="performance_2">
          <p>precision : {{ model_2.precision * 100 }}%</p>
          <p>specificity : {{ model_2.specificity * 100 }}%</p>
        </div>
        <div id="warning">Warning : {{ model_2.failure }}</div>
        <!-- <button id="detail" @click="viewmore()">Detail</button> -->
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
import { reactive } from 'vue'
import axios from 'axios'
// import { reactive } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'HomeView',
  components: {
    Bar
    // Frame: Frame
  },
  data() {
    return {
      // chartData: {
      //   labels: this.graph_time_data.labels, // x
      //   datasets: [{ data: this.graph_time_data.datasets[0]['data'] }] // y
      // },
      chartOptions: {
        responsive: false
      },
      uploadcsvFile: ''
    }
  },
  setup() {
    const users = reactive({
      email: 'asdasd',
      name: 'asdasd'
    })
    const file_list = reactive({
      file: ''
    })
    const model_result = reactive({
      result: ''
    })

    const model_1 = reactive({
      machine: '',
      accuracy: '',
      precision: '',
      recall: '',
      specificity: '',
      failure: ''
    })
    const model_2 = reactive({
      accuracy: '',
      precision: '',
      recall: '',
      specificity: '',
      failure: ''
    })

    const graph_time_data = reactive({
      labels: [],
      datasets: [{ data: [] }]
    })

    const graph_time_data1 = reactive({
      labels: [1, 2, 3],
      datasets: [{ data: [40, 20, 12] }]
    })

    const graph_fourier_data = reactive({
      labels: [''],
      datasets: [{ data: [''] }]
    })

    axios.get('/api/mypage').then((res) => {
      users.email = res.data[0]['userEmail']
      users.name = res.data[0]['userName']
    })

    axios.get('/api/frame/filelist').then((res) => {
      file_list.file = res.data
    })

    axios.get('/api/frame/result').then((res) => {
      model_result.result = res.data
    })

    axios.get('/api/frame/model').then((res) => {
      model_1.accuracy = res.data[0]['accuracy']
      model_1.precision = res.data[0]['precision']
      model_1.recall = res.data[0]['recall']
      model_1.specificity = res.data[0]['specificity']
      model_2.accuracy = res.data[1]['accuracy']
      model_2.precision = res.data[1]['precision']
      model_2.recall = res.data[1]['recall']
      model_2.specificity = res.data[1]['specificity']
    })

    // axios.get('/api/frame/graph').then((res) => {

    //   // users.email = res.data
    // })

    return {
      users,
      file_list,
      model_result,
      model_1,
      model_2,
      graph_time_data,
      graph_fourier_data,
      graph_time_data1
    }
  },
  created() {},
  mounted() {},
  methods: {
    MoveLogin() {
      this.$router.push('/login')
    },
    MoveMypage() {
      this.$router.push('/mypage')
    },
    // viewmore() {
    //   // more = this.parentElement.previousElementSibling

    //   const more = document.getElementById('detail').parentElement.nextSibling
    //   // more.parentElement.previousElementSibling.style.height = '10px'
    //   if (more.style.display === 'flex') {
    //     more.style.display = 'none'
    //   } else {
    //     more.style.display = 'flex'
    //   }
    // },
    onFileSelected(event) {
      // 프론트에서 파일첨부한 파일을 변수에 넣음.
      this.uploadcsvFile = this.$refs.uploadFile.files[0]
    },
    async uploadFile() {
      // 확인버튼을 누르면 백앤드로 제출함
      const fd = new FormData()
      fd.append('uploadFile', this.uploadcsvFile)

      await axios.post('/api/uploadFile', fd)
    },
    MoveLogin() {
      axios.delete('/api/login').then((res) => {
        alert('로그아웃하였습니다.')
        this.$router.push('/')
      })
    },
    file_click(e, a) {
      var result_list = ''

      result_list = this.model_result.result
      var cur_result1 = ''
      var cur_result2 = ''

      for (let i = 0; i < result_list.length; i += 2) {
        if (e == result_list[i]['fileName']) {
          cur_result1 = result_list[i]
        }
      }

      for (let i = 1; i < result_list.length; i += 2) {
        if (e == result_list[i]['fileName']) {
          cur_result2 = result_list[i]
        }
      }
      var detection1 = cur_result1['failure']
      var detection2 = cur_result2['failure']

      this.model_1.machine = a
      this.model_1.failure = detection1
      this.model_2.failure = detection2

      axios.post('/api/graph', { e }).then((res) => {
        const timeseires_x = []
        const timeseires_y = []
        const fourier_x = []
        const fourier_y = []
        for (let i in res.data) {
          if (res.data[i]['domain'] == 1) {
            timeseires_x.push(res.data[i]['xvalue'])
            timeseires_y.push(res.data[i]['yvalue'])
          } else {
            fourier_x.push(res.data[i]['xvalue'])
            fourier_y.push(res.data[i]['yvalue'])
          }
        }
        console.log(this.graph_fourier_data['datasets'][0]['data'])
        this.graph_time_data.labels = timeseires_x
        this.graph_time_data.datasets[0]['data'] = timeseires_y
        this.graph_fourier_data.labels = fourier_x
        this.graph_fourier_data.datasets[0]['data'] = fourier_y
        this.four.labels = timeseires_x
        this.four.datasets[0]['data'] = timeseires_y
        this.tim.labels = fourier_x
        this.tim.datasets[0]['data'] = fourier_y
        console.log(this.graph_fourier_data['datasets'][0]['data'])
      })
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
.full {
  height: 100vh;
  background-color: rgb(212, 212, 212);
}
/* header */
header {
  display: flex;
  height: 70px;
  background-color: #646464;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#title {
  color: white;
  font-size: 50px;
  font-weight: bold;
}
#space {
  margin-left: 220px;
}

/* nav */
nav {
  background-color: rgb(129, 129, 129);
  height: calc(100vh - 70px);
  width: 250px;
  margin: 0;
  float: left;
}
.list-group-item {
  background-color: transparent;
  color: black;
  font-size: 20px;
  border: none;
  height: 30px;
  /* transform: translateY(-50%);
  justify-content: space-between; */
}
.list-group-item:hover {
  background-color: #777777;
}
.list-group {
  margin-top: 10px;
}

.list-group-flush {
  text-align: left;
}
.addfile {
  margin-left: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50px;
  width: 110px;
  height: 50px;
  font-size: 18px;
}
.addgroup {
  margin-right: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 110px;
  height: 50px;
  font-size: 18px;
}
#fileBtn {
  width: 200px;
  height: 60px;
  font-size: 20px;
}
#checkBtn {
  background-color: rgb(202, 198, 198);
  color: black;
  border: 1px solid black;
}
#closeBtn {
  background-color: rgb(202, 198, 198);
  color: black;
  border: 1px solid black;
}
/* main */
.graph {
  border: 1px solid black;
  width: 80%;
  height: 200px;
  margin-left: 17%;
}
.graph1 {
  border: 1px solid black;
  width: 80%;
  height: 200px;
  margin-top: 20px;
  margin-left: 17%;
}
#machine {
  color: black;
  margin-top: 20px;
  margin-left: 290px;
  margin-bottom: 20px;

  text-align: left;
  width: 1200px;
  font-size: 40px;
  font-weight: bold;
}
#result {
  color: black;
  margin-top: 10px;
  margin-left: 260px;
  background-color: rgb(170, 169, 169);
  overflow: hidden;
  border-radius: 10px;
}
#summary {
  display: flex;
}
.model_name {
  margin-left: 20px;
  margin-top: 15px;
  height: 100px;
  font-size: 30px;
  margin-right: 40px;
  width: 200px;
}
#performance_1,
#performance_2 {
  height: 100px;
  font-size: 25px;
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
#detail1 {
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

.mypageright {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(212, 212, 212);
  text-align: left;
  font-weight: bold;
  color: black;
}
.mypagen2 {
  font-size: 30px;
  float: left;
  width: 42%;
  color: black;
}
.xbar {
  margin-left: 90%;
}
.mypagecolor {
  background-color: #8a8787;
}
#editsave {
  float: right;
  width: 230px;
  height: 60px;
  margin-top: 120%;
  margin-right: 5%;
  font-size: 30px;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(212, 212, 212);
}
#my-chart-id {
  width: 100% !important;
  height: 180px !important;
}
</style>
