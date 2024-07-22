const { promises: fsPromise, writeFile, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");

const FILE_PATH = resolve(__dirname, "../../output/saying.txt");
const FILE_DATA =
  "通常让人迷茫的原因只有一个，那就是本该拼搏的年纪，却想得太多，做得太少，人生在于拼搏，想十次不如干一次。想要赢，就别怕输，强者就是把对他人“羡慕嫉妒恨”的时间，全部用来提高自己。\n";

fsPromise
  .writeFile(FILE_PATH, FILE_DATA, {
    flag: "a",
  })
  .then(() => {
    console.log("写入文件成功");
  })
  .catch((err) => {
    console.log("写入文件出错了", err);
  });

writeFile(
  FILE_PATH,
  FILE_DATA,
  {
    flag: "a",
  },
  (err) => {
    if (err) {
      console.log("写入文件出错了", err);
      return;
    }
    console.log("写入文件成功");
  }
);

try {
  writeFileSync(FILE_PATH, FILE_DATA, {
    flag: "a",
  });
  console.log("写入文件成功");
} catch (error) {
  console.log("写入文件出错了", error);
}
