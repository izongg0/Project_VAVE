<template>
  <div class="full">
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
              <button id="editsave2" @click="MoveMypage()">
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
    <div class="myContainer">
      <div id="myedit"><b>내 프로필 편집</b></div>
      <div>
        <label for="userEmail" class="mypagen"><b>Email</b></label>
        <p class="mypageleft">{{ users.email }}</p>
      </div>
      <div>
        <label for="userName" class="mypagen"><b>Name</b></label>
        <input
          v-model="mypageinf.name"
          type="text"
          placeholder="변경할 이름을 입력하세요"
          id="edit_name"
          name="userName"
          required
          @keyup.enter="goSignup()"
        />
      </div>
      <div>
        <label for="userPassword" class="mypagen"><b>Password</b></label>
        <input
          v-model="mypageinf.pw"
          type="password"
          placeholder="변경할 비밀번호를 입력하세요"
          id="edit_pw"
          name="userPassword"
          maxlength="16"
          required
          @keyup.enter="goSignup()"
        />
      </div>
      <div>
        <button type="submit" id="editsave" @click="MoveMain()">
          <b>변경사항 저장</b>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'

export default {
  setup() {
    const users = reactive({
      email: '',
      name: ''
    })
    const mypageinf = reactive({
      name: '',
      pw: ''
    })
    axios.get('/api/mypage').then((res) => {
      // console.log(res.data)
      users.email = res.data[0]['userEmail']
      users.name = res.data[0]['userName']
      console.log(res.data)
    })
    axios.get('/api/signup').then((res) => {})
    return { users, mypageinf }
  },
  methods: {
    MoveLogin() {
      this.$router.push('/login')
    },
    MoveMain() {
      const name_edit = document.getElementById('edit_name').value
      const pw_edit = document.getElementById('edit_pw').value
      const content = [name_edit, pw_edit]
      console.log(content)
      axios.post('/api/mypage/edit', { content }).then((res) => {})
      confirm('변경사항을 저장하시겠습니까?')
      this.$router.push('/main')
    },
    MoveMypage() {
      this.$router.push('/mypage')
    }
  }
}
</script>

<style scoped>
template {
  /* background-color: rgb(131, 130, 130); */
  height: 100vh;
  width: 100vw;
  margin: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
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
.addgroup {
  margin-right: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 110px;
  height: 50px;
  font-size: 18px;
}
.myContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(230, 219, 219);
  height: 70%;
  width: 50%;
  background-color: #8a8787;
}
#myedit {
  font-size: 40px;
  margin-right: 60%;
  margin-top: 30px;
  color: black;
}
.mypagen {
  font-size: 35px;
  margin-right: 50px;
  width: 150px;
  color: black;
}
input[type='text'],
input[type='password'] {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(212, 212, 212);
}
input::placeholder {
  color: black;
}
#editsave {
  float: right;
  width: 250px;
  height: 80px;
  margin-top: 20%;
  margin-right: 5%;
  font-size: 30px;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(212, 212, 212);
}
.xbar {
  margin-left: 90%;
}
.mypagecolor {
  background-color: #8a8787;
}
#editsave2 {
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
.mypagen2 {
  font-size: 30px;
  float: left;
  width: 42%;
  color: black;
}
.mypageinput {
  width: 100%;
  padding: 22px 40px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(212, 212, 212);
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
.mypageleft {
  width: 70%;
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
</style>
