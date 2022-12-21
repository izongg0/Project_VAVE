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
    const filename = req.file["filename"]; // 현재 받아온 파일 이름 변수저장
    await database.run(
      `INSERT INTO file (userEmail,fileName,originalName) VALUES ('${curuser}','${req.file["filename"]}','${req.file["originalname"]}')`
    );

    app.post("/data/", async (req, res) => {
      res.send(json_data);
    });

    app.get("/data/", async (req, res) => {
      console.log(req.body);
    });

    // request("http://localhost:8000/data/", function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body);
    //   }
    // });
    const example_result = {
      pca: "abnormal",
      auto: "normal",
      fourier_freq: [
        [0.0, 0.001438935],
        [100.0, 2.001438935],
        [200.0, 4.001438935],
        [300.0, 2.081438935],
        [400.0, 4.031438935],
        [500.0, 2.001438935],
      ],
    };

    const fourier_xval = [];
    const fourier_yval = [];
    const timedata = csvtostring.split("\r\n"); // 시간데이터 리스트로
    timedata.shift(); // abnormal 칸 없어짐
    // 널값제거
    const time_yval = timedata.filter((element) => {
      return element !== undefined && element !== null && element !== "";
    });

    function range(start, end) {
      let array = [];
      for (let i = start; i < end; ++i) {
        array.push(i);
      }
      return array;
    }
    const time_xval = range(1, time_yval.length + 1);

    // 모델api에서 넘어온 데이터 전처리
    for (i in example_result["fourier_freq"]) {
      fourier_xval.push(example_result["fourier_freq"][i][0]);
      fourier_yval.push(example_result["fourier_freq"][i][1]);
    }
    for (i in example_result["time"]) {
      fourier_xval.push(example_result["time"][i][0]);
      fourier_yval.push(example_result["time"][i][1]);
    }

    // 전처리한 결과 db에 저장
    // for (i in time_xval) {
    //   // 타임시리즈 디비 넣기
    //   // 타임 도메인 = 1 , 주파수 도메인 = 2
    //   await database.run(
    //     `INSERT INTO graph (fileName,xvalue,yvalue,domain) VALUES ('${filename}','${time_xval[i]}','${time_yval[i]}',1)`
    //   );
    // }
    // for (i in example_result["fourier_freq"]) {
    //   // 푸리에 결과 디비 넣기
    //   await database.run(
    //     `INSERT INTO graph (fileName,xvalue,yvalue,domain) VALUES ('${filename}','${fourier_xval[i]}','${fourier_yval[i]}',2)`
    //   );
    // }
    // await database.run(
    //   `INSERT INTO result (fileName,modelId,failure) VALUES ('${filename}',1,'${example_result["pca"]}')`
    // );
    // await database.run(
    //   `INSERT INTO result (fileName,modelId,failure) VALUES ('${filename}',2,'${example_result["auto"]}')`
    // );
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
// 그래프 가져오기
app.post("/api/graph", async (req, res) => {
  console.log("aaaaaa");
  console.log(req.body.e);
  const graph_value = await database.run(
    `SELECT xvalue,yvalue,domain FROM graph WHERE fileName = "${req.body.e}"`
  );
  res.send(graph_value);
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
// 백앤드 테스트
app.get("/api/test/test", async (req, res) => {
  const file_csv = fs.readFileSync("files/timetest.csv"); // csv파일 읽어오기
  const csvtostring = file_csv.toString();
  const tlist = csvtostring.split("\r\n");
  tlist.shift();

  for (i in tlist) {
    if (i == 0) {
      continue;
    }
    console.log(tlist[i]);
  }
  res.send(tlist);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
