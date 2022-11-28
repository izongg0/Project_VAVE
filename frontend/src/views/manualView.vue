<template>
  <div>
    <Frame />
    <section>
      <div id="sectionBox">
        <div class="manualDiv" id="informationDiv">
          <span id="logo" style="margin-bottom: 10px">
            <img src="../assets/logo.png" />
          </span>
          <div id="subtitle" style="margin-bottom: 10px">확실한 성취를 위한 스케줄러, 따옴</div>
          <div id="information">
            <span style="margin-bottom: 7px; text-align: center;">
              "따옴"은 효과적인 일정 관리를 위한 스케줄 관리 사이트입니다.
            </span>
            <span style="text-align: center;">
              개인 일정부터 프로젝트까지, 끝까지 완주할 수 있도록 도와드려요!
            </span>
          </div>
        </div>
        <div class="manualDiv">
          <div class="listDiv">
            <div class="icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" class="bi bi-calendar2-week" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              </svg>
            </div>
            <div class="manualTitle">
              <span>원하는 일정을 한 눈에</span>
            </div>
            <div class="manualBody">
              <span>개인 일정부터 프로젝트 일정까지, 원하는 일정만 선택하여 동시에 확인하세요.</span>
            </div>
          </div>
          <div class="listDiv">
            <div class="icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" class="bi bi-patch-plus" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
              </svg>
            </div>
            <div class="manualTitle">
              <span>효율적인 프로젝트 관리</span>
            </div>
            <div class="manualBody">
              <span>프로젝트를 생성하고, 일정을 등록하세요. 프로젝트의 진행률과 세부 사항을 함께 확인할 수 있습니다.</span>
            </div>
          </div>
        </div>
        <div class="manualDiv" style="margin-top:10px">
          <div class="listDiv">
            <div class="icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" class="bi bi-person-plus-fill" viewBox="0 0 16 16"><path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/></svg>
            </div>
            <div class="manualTitle">
              <span>원활한 협업 활동</span>
            </div>
            <div class="manualBody">
              <span>협업 프로젝트를 등록하고 팀원을 추가하세요. 구성원과 일정을 공유할 수 있습니다.</span>
            </div>
          </div>
          <div class="listDiv">
            <div class="icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" class="bi bi-journals" viewBox="0 0 16 16">
                <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
                <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"/>
              </svg>
            </div>
            <div class="manualTitle">
              <span>여러분의 작품집</span>
            </div>
            <div class="manualBody">
              <span>프로젝트 목록을 확인해 보세요. 되돌아보면 의미있는 기록이 될 겁니다!</span>
            </div>
          </div>
        </div>
        <div class="manualDiv"><button style="height:15px; width:15px"></button></div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Frame from '@/components/Frame.vue'

export default {
  name: '',
  components: {
    Frame
  },
  methods: {}
}
</script>
<style scoped>
template {
  width: 100%;
}

section {
  margin: 0;
  padding: 0 5% 0 5%;
  height: calc(100vh - 55px);
  background-color: white;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;
}

#sectionBox {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.manualDiv {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.listDiv {
  min-width: 450px;
  max-width: 450px;
  height: 200px;
  margin: 0 10px 10px 10px;
  padding: 0;
  border: 1px solid rgb(84, 84, 84);
  border-radius: 15px;
}

.icons {
  width: 180px;
  height: 200px;
  margin: 0;
  padding-left: 10px;
  fill: rgb(60, 60, 60);

  display: inline-flex;
  float: left;
  justify-content: center;
  align-items: center;
}

.manualTitle {
  width: 265px;
  height: 80px;
  margin: 0;
  padding: 15px 10px 0 10px;
  font-size: 20px;
  font-weight: bold;
  display: inline-flex;
  float: right;
  flex-direction: column;
  justify-content: center;
}

.manualBody {
  width: 265px;
  height: 120px;
  margin: 0;
  padding: 0 10px 0 10px;
  display: inline-flex;
  float: right;
  flex-direction: column;
  align-items: center;
}

#informationDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#subtitle {
  font-size: 30px;
  font-weight: bold;
}

#information {
  margin-top: 10px;
  font-size: 17px;
  display: flex;
  flex-direction: column;
}
</style>
