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
// 로그인 끝
// 로그아웃
app.delete("/api/login", async (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.clearCookie("token");
  }
  res.sendStatus(200);
});

//
app.use("/files", express.static("files"));

app.get("/api/test", async (req, res) => {
  res.send(test);
});

// 프론트에서 파일 받고 디비에 넣기
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
// 메인페이지
// 파일의 각 모델 별 고장여부 가져오기
app.get("/api/frame/result", async (req, res) => {
  const Model_result = await database.run(
    `SELECT * FROM result WHERE fileName IN
    (SELECT fileName FROM file WHERE userEmail ='${curuser}');`
  );
  res.send(Model_result);
});

// 모델 두개 이름이랑 성능 가져오기
app.get("/api/frame/model", async (req, res) => {
  const Model_name = await database.run(`SELECT * FROM model `);
  res.send(Model_name);
});

// 회원가입
app.post("/api/signup", async (req, res) => {
  await database.run(
    `INSERT INTO users (userEmail,userPassword,userName) VALUES ('${req.body.content.id}','${req.body.content.pw}','${req.body.content.name}')`
  );
});

app.post("/api/checkid", async (req, res) => {
  const query = await database.run(`SELECT userEmail FROM users;`);
  let result = "사용가능";
  for (i in query) {
    const exist = query[i].userEmail;
    if (req.body.content === exist) {
      result = "사용불가능";
    }
  }
  res.send(result);
});

// 마이페이지에 제공
app.get("/api/mypage", async (req, res) => {
  const user_information = await database.run(
    `SELECT userEmail,userName FROM users WHERE userEmail = "${curuser}"`
  );
  res.send(user_information);
});
// 프로필 편집
app.post("/api/mypage/edit", async (req, res) => {
  const editname = req.body.content[0];
  const editpw = req.body.content[1];
  if (editname == "") {
    await database.run(
      `UPDATE users SET userPassword = '${editpw}' WHERE userEmail = '${curuser}';`
    );
  } else if (editpw == "") {
    await database.run(
      `UPDATE users SET userName = '${editname}' WHERE userEmail = '${curuser}';`
    );
  } else {
    await database.run(
      `UPDATE users SET userName = '${editname}',userPassword = '${editpw}' WHERE userEmail = '${curuser}';`
    );
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
