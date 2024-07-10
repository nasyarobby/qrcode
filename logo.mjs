import qr from "qr-image";
import Jimp from "jimp";

const qrcode = qr.imageSync(
  "https://dev-api.pajak.go.id/mpajak/auth/mpajak/login/web/super-long-link-because-it-is-an-uuid",
  {
    type: "png",
    ec_level: "M",
  }
);

Jimp.read(qrcode)
  .then((image) => {
    return Jimp.read("./cover.png").then(async (cover) => {
      for (let x = 0; x < cover.getWidth(); x++) {
        for (let y = 0; y < cover.getWidth(); y++) {
          if (cover.getPixelColor(x, y) === 0xff)
            image.setPixelColor(0xFFFFFFFF, x, y);
        }
      }
      return Jimp.read("./base.png").then((base) => ({ image, base }));
    });
  })
  .then(({ image, base }) => {
    return base.mask(image, 0, 0).write("./logo-qr.png");
  })
  .catch((err) => {
    // Handle an exception.
    console.log(err);
  });
