<template>
  <div class="full">
    <!-- <Frame /> -->
    <header>
      <div id="space"></div>
      <p id="title">VAVE</p>
      <div>
        <button type="button" class="btn btn-light addgroup">Mypage</button>
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
          @click="file_click(filename['fileName'])"
        >
          {{ filename['originalName'] }}
        </button>
      </div>
    </nav>
    <div id="machine">{{ machine_name }}</div>
    <div style="display: flex">
      <div class="graph"></div>
      <div class="graph"></div>
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
        <button id="detail1">Detail</button>
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
import axios from 'axios'
import { reactive } from 'vue'

export default {
  name: 'HomeView',
  conponents: {
    // Frame: Frame
  },
  data() {
    return {
      machine_name: 'machine_1',
      uploadcsvFile: ''
    }
  },
  setup() {
    const users = reactive({
      email: ''
    })
    const file_list = reactive({
      file: ''
    })
    const model_result = reactive({
      result: ''
    })

    const model_1 = reactive({
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

    // const model_result_2 = reactive({
    //   accuracy: '',
    //   precision: '',
    //   recall: '',
    //   specificity: '',
    //   failure: ''
    // })

    // axios.get('api/test').then((res) => {
    //   console.log(res.data)
    // })

    axios.get('/api/frame/filelist').then((res) => {
      file_list.file = res.data
      console.log(res.data)
    })

    axios.get('/api/frame/result').then((res) => {
      // console.log(res.data)
      model_result.result = res.data
      // console.log(model_result.result.length)
      // users.email = res.data
    })

    axios.get('/api/frame/model').then((res) => {
      console.log(res.data)
      // users.email = res.data
    })

    // axios.get('/api/frame/graph').then((res) => {
    //   console.log('그래프들')
    //   console.log(res.data)
    //   // users.email = res.data
    // })

    return { users, file_list, model_result, model_1, model_2 }
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
    },
    onFileSelected(event) {
      // 프론트에서 파일첨부한 파일을 변수에 넣음.
      // console.log(this.$refs.uploadFile.files)
      this.uploadcsvFile = this.$refs.uploadFile.files[0]
    },
    async uploadFile() {
      // 확인버튼을 누르면 백앤드로 제출함
      const fd = new FormData()
      fd.append('uploadFile', this.uploadcsvFile)
      // for (const value of fd.values()) {
      //   console.log(value)
      // }
      await axios.post('/api/uploadFile', fd)
    },
    MoveLogin() {
      axios.delete('/api/login').then((res) => {
        alert('로그아웃하였습니다.')
        this.$router.push('/')
      })
    },
    file_click(e) {
      // console.log(e)
      var result_list = ''
      result_list = this.model_result.result
      var cur_result1 = ''
      var cur_result2 = ''
      var detection1 = ''
      var detection2 = ''
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
      console.log(cur_result1['accuracy'])

      // const model_1 = reactive({
      //   accuracy: '',
      //   precision: '',
      //   recall: '',
      //   specificity: '',
      //   failure: ''
      // })
      if (cur_result1['failure'] == 0) {
        detection1 = 'FALSE'
      } else {
        detection1 = 'TRUE'
      }
      if (cur_result2['failure'] == 0) {
        detection2 = 'FALSE'
      } else {
        detection2 = 'TRUE'
      }
      this.model_1.accuracy = cur_result1['accuracy']
      this.model_1.precision = cur_result1['precision']
      this.model_1.recall = cur_result1['recall']
      this.model_1.specificity = cur_result1['specificity']
      this.model_1.failure = detection1
      this.model_2.accuracy = cur_result2['accuracy']
      this.model_2.precision = cur_result2['precision']
      this.model_2.recall = cur_result2['recall']
      this.model_2.specificity = cur_result2['specificity']
      this.model_2.failure = detection2
      console.log(cur_result2)
    }
  }
}
</script>
<style scoped>
/* template */
template {
  /* background-color: rgb(131, 130, 130); */
  height: 100vh;
  width: 100vw;
  margin: 0;
}
.full {
  width: 100vw;
  height: 100vh;
  background-color: rgb(212, 212, 212);
}
/* header */
header {
  display: flex;
  height: 70px;
  width: 100%;
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
  height: calc(100vh - 55px);
  width: 250px;
  /* padding-top: 15px; */
  /* padding-bottom: 25px; */
  margin: 0;

  float: left;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
}
.list-group-item {
  background-color: transparent;
  color: black;
  font-size: 18px;
  border: none;
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
/* #fileBtn {
  background-color: rgb(255, 255, 255);
  color: black;
  margin-left: 125px;
  width: 110px;
  height: 60px;
  margin-top: 50px;
  border-color: white;
  border: 1px solid black;
  border-radius: 0;
} */
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
  width: 550px;
  height: 200px;
  margin-left: 50px;
}
#machine {
  color: black;
  margin-top: 10px;
  margin-left: 260px;
  text-align: left;
  width: 1200px;
  font-size: 30px;
  font-weight: bold;
  /* border: 1px solid black; */
}
#result {
  color: black;
  margin-top: 10px;
  margin-left: 260px;
  /* width: 70vw; */
  /* height: 120px; */
  /* border: 1px solid black; */
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
  /* border: 1px solid black; */
  height: 100px;
  font-size: 30px;
  margin-right: 40px;
  width: 200px;
}
#performance_1,
#performance_2 {
  /* margin-left: 80px; */
  /* border: 1px solid black; */
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
/* #space_1,
#space_2 {
  border: 1px solid black;
} */
</style>
