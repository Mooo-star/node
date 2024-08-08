const { promises: fsPromise, readFile, readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const filePath = resolve(__dirname, "../../static/saying.txt");

/**
 * 自己尝试的时候注释其中两种，只运行一种就行
 */

// fsPromise
//   .readFile(filePath, "utf-8")
//   .then((res) => {
//     console.log("res", res);
//   })
//   .catch((err) => {
//     console.log("读取文件报错", err);
//   });

// readFile(filePath, "utf-8", (err, data) => {
//   if (err) {
//     console.log("读取文件报错", err);
//     return;
//   }

//   console.log("res", data);
// });

try {
  const res = readFileSync(filePath, "utf-8");
  console.log("res", res);
} catch (error) {
  console.log("读取文件报错", error);
}
