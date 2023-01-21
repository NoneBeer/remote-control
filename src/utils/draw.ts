import { Button, left, mouse, Point, straightTo, up } from "@nut-tree/nut-js";
import { Duplex } from "stream";

export const drawCircle = async (radius: string | number, ws: Duplex) => {
  mouse.config.mouseSpeed = 1000;
  const position = await mouse.getPosition();
  await mouse.move(left(-radius));
  await mouse.pressButton(Button.LEFT);
  const points = [];
  for (let angle = 0; angle < 2 * Math.PI; angle += .1) {
    let x = position.x + (+radius * Math.cos(angle));
    let y = position.y + (+radius * Math.sin(angle));
    points.push({ x, y });
  }
  points.push({ x: position.x + +radius, y: position.y })
  points.forEach(async point => {
    setTimeout(async () => {
      const position = new Point(point.x, point.y);
      await mouse.move(straightTo(position));
    }, 100)
  });
  mouse.releaseButton(Button.LEFT);
  const message = `draw_circle_${radius}px`;
  ws.write(message);
  return message;
};

export const drawRectangle = async (params: string[], ws: Duplex) => {
  const [width, height] = params;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(left(-width));
  await mouse.move(up(-height));
  await mouse.move(left(+width));
  await mouse.move(up(+height));
  mouse.releaseButton(Button.LEFT);
  const message = `draw_rectangle_${width}px,${height}px`;
  ws.write(message);
  return message;
};

export const drawSquare = async (side: string, ws: Duplex) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(left(-side));
  await mouse.move(up(-side));
  await mouse.move(left(+side));
  await mouse.move(up(+side));
  mouse.releaseButton(Button.LEFT);
  return `draw_square_${side}px`;
};
