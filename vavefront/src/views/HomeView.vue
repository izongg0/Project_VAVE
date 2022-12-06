<template>
  <div class="full">
    <!-- <Frame /> -->
    <header>
      <div id="space"></div>
      <p id="title">VAVE</p>
      <p style="color: black">-->{{ users.email }}</p>
      <div>
        <button type="button" class="btn btn-light addgroup">Mypage</button>
        <button type="button" class="btn btn-light addgroup">Logout</button>
      </div>
    </header>
    <nav>
      <button type="button" class="btn btn-light addgroup">그룹 추가</button>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
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

    axios.get('api/test').then((res) => {
      console.log(res.data)
    })

    axios.get('/api/email').then((res) => {
      users.email = res.data[0]['userEmail']
    })

    return { users }
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
.accordion *,
.accordion {
  background-color: transparent;
  color: black;
  font-size: 18px;
  border: none;
}
.accordion {
  margin-top: 0px;
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
