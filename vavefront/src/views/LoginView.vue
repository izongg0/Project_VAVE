<template>
  <div class="tcolor">
    <title>VAVE_Login</title>
    <div class="totalContainer">
      <span id="logo"><img src="../assets/logo.png" /></span>
      <div>
        <label for="userEmail" class="midname"><b>Email</b></label>
        <input
          v-model="logininf.loginform.loginId"
          type="text"
          placeholder="Email 입력하세요"
          id="login_id"
          name="userEmail"
          required
          @keyup.enter="goLogin()"
        />
        <label for="userPassword" class="midname"><b>Password</b></label>
        <input
          v-model="logininf.loginform.loginPw"
          type="password"
          placeholder="Password 입력하세요"
          id="login_pw"
          name="userPassword"
          required
          @keyup.enter="goLogin()"
        />
        <div>
          <button @click="MoveSignup()"><b>Sing up</b></button>
          <button type="submit" @click="goLogin()"><b>Login</b></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'

export default {
  components: {},
  data() {
    return {}
  },
  setup() {
    const logininf = reactive({
      loginform: {
        loginId: '',
        loginPw: ''
      }
    })

    return { logininf }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    MoveSignup() {
      this.$router.push('/signup')
    },
    goLogin() {
      const args = {
        loginId: this.logininf.loginform.loginId,
        loginPw: this.logininf.loginform.loginPw
      }

      const idLogin = document.getElementById('login_id').value
      const passwordLogin = document.getElementById('login_pw').value

      axios
        .post('/api/login', args)
        .then((res) => {
          alert('로그인에 성공했습니다.')
          this.$router.push('/main')
        })
        .catch(() => {
          if ((idLogin === '') & (passwordLogin === '') || idLogin === '') {
            alert('ID를 입력해주세요.')
          } else if (passwordLogin === '') {
            alert('비밀번호를 입력해주세요.')
          } else {
            alert('로그인에 실패했습니다. 계정 정보를 확인해주세요.')
          }
        })
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}
.tcolor {
  background-color: rgb(212, 212, 212);
  height: 100vh;
}
/* container */
.totalContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(212, 212, 212);
}
.midname {
  float: left;
}

/* input box */
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(172, 171, 171);
  box-sizing: border-box;
  background-color: rgb(129, 129, 129);
}
input::placeholder {
  color: black;
}

/* 로그인 button*/
button[type='submit'] {
  background-color: rgb(129, 129, 129);
  border: none;
  cursor: pointer;
  float: right;
}

/*회원가입 button*/
button {
  float: left;
  border: none;
  margin-top: 8px;
  background-color: rgb(129, 129, 129);
}

/*button hover*/
button:hover {
  opacity: 0.3;
}
/* img */
img {
  width: 40%;
  height: 30%;
  display: block;
  margin: 0px auto;
}
</style>
