<template>
  <div>
    <title>DDAOM_login</title>
    <div class="totalContainer">
      <span id="logo"><img src="../assets/logo.png" /></span>
      <div class="loginContainer">
        <label for="userID"><b>아이디</b></label>
        <input
          v-model="logininf.loginform.loginId"
          type="text"
          placeholder="Enter ID"
          id="login_id"
          name="userID"
          required
          @keyup.enter="goLogin()"
        />
        <label for="psw"><b>비밀번호</b></label>
        <input
          v-model="logininf.loginform.loginPw"
          type="password"
          placeholder="Enter Password"
          id="login_pw"
          name="psw"
          required
          @keyup.enter="goLogin()"
        />
        <button type="submit" @click="goLogin()">로그인</button>
        <div class="addOn">
          <button @click="MoveSignup()">&nbsp;|&nbsp;회원가입</button>
          <button @click="MovePassword()">비밀번호 찾기&nbsp;</button>
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
    },

    MovePassword() {
      this.$router.push('/password')
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}
/* container */
.totalContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loginContainer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: solid rgb(53, 99, 16);
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
}

/* 로그인 button*/
button[type='submit'] {
  background-color: #fcc820;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/*회원가입 button*/
button {
  float: right;
  border: none;
  margin-top: 8px;
  background-color: white;
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
