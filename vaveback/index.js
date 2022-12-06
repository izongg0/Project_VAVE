const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const test = ["test1", "test2", "test3"];

app.use("/files", express.static("files"));

app.get("/api/test", async (req, res) => {
  res.send(test);
});

app.get("/api/email", async (req, res) => {
  const result = await database.run(
    `SELECT userEmail FROM USERS WHERE userid=1`
  );
  res.send(result);
});

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
app.post(
  "/api/uploadFile",
  upload.single("uploadFile"), // 프론트에서 가져온 파일을 files 폴더에 저장
  async (req, res, next) => {
    global.csvfile = req.file["path"]; // 프론트에서 가져온 파일의 경로

    // csv에서 JSON형식으로 바꾸는 함수
    function csvToJSON(csv_string) {
      const rows = csv_string.split("\r\n");
      const jsonArray = [];
      const header = rows[0].split(",");

      for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let row = rows[i].split(",");
        for (let j = 0; j < header.length; j++) {
          obj[header[j]] = row[j];
        }
        jsonArray.push(obj);
      }
      return jsonArray;
    }
    const file_csv = fs.readFileSync(csvfile); // csv파일 읽어오기

    const csvtostring = file_csv.toString(); // 읽어온 csv 파일을 string 형식으로 바꿈
    json_data = csvToJSON(csvtostring);
    // 잘 변형되었는지 10개만 확인 ( 총 80000개임 )
    for (let i = 0; i < 10; i++) {
      console.log(json_data[i]);
    }
  }
);

// end csv to json
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
