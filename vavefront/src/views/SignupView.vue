<template>
  <div class = "tcolor">
    <title>VAVE_Signup</title>
    <div class="totalContainer">
      * 표시된 항목은 필수 항목입니다. 반드시 입력해주세요.
      <div>
        <label for="userEmail" class="midname"><b>* Email</b></label>
      </div>
      <div>
        <input
          v-model="signupinf.signup.id"
          type="text"
          placeholder="Email 입력하세요"
          id="signup_id"
          name="userEmail"
          required
          @keyup.enter="goSignup()"
        />
      </div> 
      <div>
        <span id="duplicate">ID중복 여부를 확인해주세요.</span>
        <button id="duplicate_button" @click="checkID()">
          &nbsp;ID 중복 검사&nbsp;
        </button>
      </div>
      <div>
        <label for="userName" class="midname"><b>* Name</b></label>
      </div>
      <div>
        <input
          v-model="signupinf.signup.name"
          type="text"
          placeholder="이름을 입력하세요"
          id="signup_name"
          name="userName"
          required
          @keyup.enter="goSignup()"
        />
      </div>
      <div>
        <label for="userPassword" class="midname"><b>* Password</b></label>
      </div>
      <div>
        <input
          v-model="signupinf.signup.pw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          id="signup_pw"
          name="userPassword"
          maxlength="16"
          required 
          @keyup.enter="goSignup()"
        />
      </div>
      <div>
        <label for="userCheckPassword" class="midname"><b>* Check password</b></label>
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호를 한번더 입력하세요"
          id="signup_check"
          name="userCheckPassword"
          maxlength="16"
          required
          @blur="passwordCheckValid"
          @keyup.enter="goSignup()"
        />
      </div>
          <div v-if="!passwordCheckFlag">비밀번호가 동일하지 않습니다.</div>
          <span>
            <button type="submit" @click="MoveMain()"><b>Sing up</b></button>
            <button id="backButton" @click="MoveLogin()">뒤로가기</button>
          </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'

export default {
  components: {},
  data() {
    return {
      passwordCheck: '',
      passwordCheckFlag: true,
      passwordValidFlag: true,
    }
  },
  setup() {
    const signupinf = reactive({
      signup: {
        id: '',
        name: '',
        pw: '',
      }
    })

    axios.get('/api/signup').then((res) => {})
    axios.get('/api/checkid').then((res) => {
      signupinf.signup.id = res.data
    })

    return { signupinf }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    MoveLogin() {
      this.$router.push('/login')
    },
    MoveMain() {
      const content = this.signupinf.signup
      axios.post('/api/signup', { content }).then((res) => {})

      const nameSignup = document.getElementById('signup_name').value
      const idSignup = document.getElementById('signup_id').value
      const passwordSignup = document.getElementById('signup_pw').value
      const checkSignup = document.getElementById('signup_check').value

      if (
        (nameSignup === '') &
        (idSignup === '') &
        (passwordSignup === '') &
        (checkSignup === '')
      ) {
        alert('필수항목이 입력되지 않았습니다. 다시 입력해 주세요.')
      } else if (nameSignup === '') {
        alert('이름을 입력해주세요.')
      } else if (idSignup === '') {
        alert('ID를 입력해주세요.')
      } else if ((passwordSignup === '') & (this.passwordCheck === '')) {
        alert('비밀번호를 입력해주세요.')
      } else if (checkSignup === '') {
        alert('비밀번호 확인을 입력해주세요.')
      } else if (passwordSignup != checkSignup) {
        alert('비밀번호를 동일하게 입력해주세요')
      } else {
        if (confirm('가입하시겠습니까?')) {
          alert('회원가입 성공!')
          this.$router.push('/')
        }
      }
    },
    MoveBack() {
      this.$router.push('/')
    },
    // passwordValid() {
    //   if (
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(
    //       this.signupinf.signup.password
    //     )
    //   ) {
    //     this.passwordValidFlag = true
    //   } else {
    //     this.passwordValidFlag = false
    //   }
    // },
    passwordCheckValid() {
      if (this.signupinf.signup.pw === this.passwordCheck) {
        this.passwordCheckFlag = true
      } else {
        this.passwordCheckFlag = false
      }
    },
    checkID() {
      const content = this.signupinf.signup.id
      axios.post('/api/checkid', { content }).then((res) => {
        if (res.data === '사용불가능') {
          alert('이미 존재하는 아이디입니다.')
        } else if (res.data === '사용가능') {
          alert('사용가능한 아이디입니다.')
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
.tcolor{
  background-color: rgb(212, 212, 212);
  height: 100vh;
}
/* container */
.totalContainer {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.midname{
  float: left;
}
.signupContainer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: solid rgb(53, 99, 16);
}
/*input box*/
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
input::placeholder{
  color : black
}
/*button*/
button[type='submit'] {
  background-color: rgb(129, 129, 129);
  border: none;
  cursor: pointer;
  float:right;
}
#overlapButton {
  float: right;
}
#backButton {
  float: left;
  background-color: rgb(129, 129, 129);
  border: 1px solid rgb(172, 171, 171);
  color : black;
}
/*button hover*/
button:hover {
  opacity: 0.3;
}
/*img*/
#back {
  margin-left: 1vw;
  height: 100%;
  width: 2vw;
}
#logo {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -100%);
  display: block;
  margin: 0px auto;
}
/* 중복여부 */
#duplicate {
  color: red;
  margin-right: 60px;
}
#duplicate_button {
  background-color: rgb(129, 129, 129);
  border: 1px solid rgb(172, 171, 171);
  float: right;
  color : black;
}
</style>
