/**
 * 生成指定大小的文件
 * 这里提供两种写法
 * - callback
 * - Promise
 */

const { promises: fsPromise, createWriteStream } = require("node:fs");
const { resolve } = require("node:path");

/**
 * 定义文件大小
 */
const PER_FILE_SIZE = 1024 * 1024; // 1 MB
const MAX_FILE_SIZE = 10 * PER_FILE_SIZE;

/**
 * 创建 buffer
 * 文件大小：1 MB，填充：a
 */
const fileChunk = Buffer.alloc(PER_FILE_SIZE, "a");

/**
 * 生成文件的地址
 */
const PATH = resolve(__dirname, "../output/bigFile.txt");

function writeFileByCallback() {
  /**
   * 先附上一个官方链接：https://nodejs.cn/api/fs.html#fscreatewritestreampath-options
   * 创建一个 stream 流来写入文件
   * @param path 文件地址
   * @param [options] 配置项
   */
  const writeStream = createWriteStream(PATH);

  // 记录当前写入了多少
  let curWriteSize = 0;

  function write() {
    if (curWriteSize >= MAX_FILE_SIZE) {
      writeStream.end();
      console.log("------- 文件写入结束 ---------");
      return;
    }

    writeStream.write(fileChunk, (err) => {
      if (err) {
        console.log("写入文件报错啦", err);
        writeStream.end();
        return;
      }

      curWriteSize += PER_FILE_SIZE;

      console.log("当前写入了", curWriteSize / PER_FILE_SIZE, "MB");

      write();
    });
  }

  write();
}

async function writeFileByPromise() {
  /**
   * 首先创建出来 promise 方式的句柄
   * 官方链接：https://nodejs.cn/api/fs.html#%E7%B1%BBfilehandle
   */
  const fsHandle = await fsPromise.open(PATH, "w");

  /**
   * 创建 stream 流句柄
   */
  const writeStream = fsHandle.createWriteStream();

  // 记录当前写入了多少
  let curWriteSize = 0;

  async function close() {
    writeStream.end(() => {
      console.log("stream 流已结束");
    });
    try {
      await fsHandle.close();
      console.log("fsHandle 关闭");
    } catch (error) {
      console.log("fsHanle 关闭失败", error);
    }
  }

  async function write() {
    if (curWriteSize >= MAX_FILE_SIZE) {
      close();
      return;
    }

    writeStream.write(fileChunk, (err) => {
      if (err) {
        console.log("写入文件报错啦", err);
        close();
        return;
      }

      curWriteSize += PER_FILE_SIZE;

      console.log("当前写入了", curWriteSize / PER_FILE_SIZE, "MB");

      write();
    });
  }

  write();
}

writeFileByPromise();

module.exports = {
  writeFileByCallback,
  writeFileByPromise,
};
