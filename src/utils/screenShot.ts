import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { Duplex } from "stream";

export const printShot = async (_: unknown, ws: Duplex) => {
  const [w, h] = [200, 200];
  const { x, y } = await mouse.getPosition();
  const screenW = await screen.width();
  const screenH = await screen.height();
  let top = 0;
  let left = 0;
  if ((y - h / 2) > 0) top = y - h / 2;
  if ((x - w / 2) > 0) left = x - w / 2;
  if (y > (screenH - h / 2)) top = screenH - h;
  if (x > (screenW - w / 2)) left = screenW - w;
  const region = new Region(left, top, w, h);
  screen.highlight(region);
  const imageData = await (await screen.grabRegion(region)).toRGB();
  const jimpImage = new Jimp({ data: imageData.data, width: w, height: h });

  const buffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
  const base64 = buffer.toString('base64');
  const message = `prnt_scrn ${base64}`;
  ws.write(message);
  return message.split(' ')[0];
};