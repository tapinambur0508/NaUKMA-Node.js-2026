// import * as fs from 'node:fs';

// fs.readFile("read.txt", {encoding: "utf-8"}, (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data);
// });

import * as fs from "node:fs/promises";

fs.readFile("read.txt", { encoding: "utf-8" })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

const p1 = fs.readFile("file1.txt", { encoding: "utf-8" });
const p2 = fs.readFile("file2.txt", { encoding: "utf-8" });

Promise.all([p1, p2])
  .then(([data1, data2]) => console.log({ data1, data2 }))
  .catch((error) => console.error(`Error during read files`, error));

async function readFile() {
  const data = await fs.readFile("read.txt", { encoding: "utf-8" });
  const transform = data.toUpperCase();
  return transform;
}

readFile()
  .then((data) => console.log(data))
  .catch((error) => console.error(errro));
