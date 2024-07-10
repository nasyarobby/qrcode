import qr from "qr-image";
import fs from "fs";

function saveQrImage(filename, value) {
  return new Promise((res, rej) => {
    const stream = fs.createWriteStream(filename + ".png");
    qr.image(value, { type: "png", margin: 1 }).pipe(stream);
    stream.on("finish", () => {
      res();
    });

    stream.on("error", (err) => {
      rej(err);
    });
  });
}

saveQrImage("test", "https://dev-api.pajak.go.id/l").then(() => {
    console.log("finished")
})
.catch(err => {
    console.error(err)
})