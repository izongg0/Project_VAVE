const express = require("express");
const app = express();
const port = 3000;
const database = require("./database"); // 디비연결
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//
const test = ["test1", " test2", "test3"];

app.use(bodyParser.json());
app.use(cookieParser());

// 로그인 시작
global.curuser = "";
app.get("/api/login", async (req, res) => {
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, "46081382", (err, decoded) => {
      if (err) {
        return res.send(401);
      }
      res.send(decoded);
    });
  } else {
    res.sendStatus(401);
  }
});
app.post("/api/login", async (req, res) => {
  // 프론트에서 아이디 비번 입력한걸 백앤드에서 받음.
  const members = await database.run("SELECT * FROM users"); // 디비에 있는 유저정보를 다 가져옴

  const loginId = req.body.loginId;
  const loginpw = req.body.loginPw;
  global.curuser = req.body.loginId;
  const member = members.find(
    // 프론트에서 입력한 아디비번이 디비에 있는지 확인
    (m) => m.userEmail === loginId && m.userPassword === loginpw
  );

  if (member) {
    const option = {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    };

    const token = jwt.sign(
      {
        id: member.userEmail,
        name: member.userPassword,
      },
      "46081382",
      {
        expiresIn: "15m",
        issuer: "vave",
      }
    );
    res.cookie("token", token, option);
    res.send(member);
  } else {
    res.send(404);
  }
});

app.delete("/api/login", async (req, res) => {
  //로그아웃
  if (req.cookies && req.cookies.token) {
    res.clearCookie("token");
  }
  res.sendStatus(200);
});

// 로그인 끝

app.use("/files", express.static("files"));

app.get("/api/test", async (req, res) => {
  res.send(test);
});

// app.get("/api/email", async (req, res) => {
//   const result = await database.run(
//     `SELECT userEmail FROM USERS WHERE userid=1`
//   );
//   res.send(result);
// });

// 프론트에서 파일 받기
const fileSavePath = "files/";
const storage = multer.diskStorage({
  //파일저장경로
  destination(req, file, callback) {
    callback(null, fileSavePath);
  },
  filename: function (req, file, callback) {
    callback(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
global.csvfile = "";
global.jsonfile = "";
global.curfile = "";
app.post(
  "/api/uploadFile",
  upload.single("uploadFile"), // 프론트에서 가져온 파일을 files 폴더에 저장
  async (req, res, next) => {
    global.csvfile = req.file["path"]; // 프론트에서 가져온 파일의 경로
    function csvToJSON(csv_string) {
      const rows = csv_string.split("\r\n");
      const header = rows[0];
      rows.shift();
      let obj = {};
      obj[header] = rows;
      return obj;
    }
    const file_csv = fs.readFileSync(csvfile); // csv파일 읽어오기
    const csvtostring = file_csv.toString(); // 읽어온 csv 파일을 string 형식으로 바꿈
    json_data = csvToJSON(csvtostring);
    // console.log("파일오리지널");
    // console.log(req.file);
    filename = req.file["filename"];
    await database.run(
      `INSERT INTO file (userEmail,fileName,originalName) VALUES ('${curuser}','${req.file["filename"]}','${req.file["originalname"]}')`
    );
  }
);

// 사이드바에 제공 ( 메인에서 같이 사용 )

app.get("/api/frame/filelist", async (req, res) => {
  const File_list = await database.run(
    `SELECT fileName,originalName FROM file WHERE userEmail = "${curuser}"`
  );
  res.send(File_list);
});

// 메인페이지에 제공

app.get("/api/frame/result", async (req, res) => {
  // 파일에 파일이 가진 모든 결과 가져오기
  const Model_result = await database.run(
    `SELECT * FROM result WHERE fileName IN
    (SELECT fileName FROM file WHERE userEmail ='${curuser}');`
  );
  res.send(Model_result);
});

app.get("/api/frame/model", async (req, res) => {
  // 모델 두개 가져오기
  const Model_name = await database.run(`SELECT modelId,modelName FROM model `);
  res.send(Model_name);
});

// app.get("/api/frame/graph", async (req, res) => {
//   // 파일이 가진 모든 그래프 데이터 가져오기
//   const Model_graph = await database.run(
//     `SELECT modelId,fileName,xvalue,yvalue FROM result WHERE fileName = "${curfile}" `
//   );
//   res.send(Model_graph);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
