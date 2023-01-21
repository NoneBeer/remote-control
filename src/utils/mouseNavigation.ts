import { mouse, left, up } from "@nut-tree/nut-js";
import { Duplex } from "stream";

export const execute = false;

export const mouseUp = async (offset: number, ws: Duplex) => {
  const message = `mouse_up_${offset}px`;
  ws.write(message);
  await mouse.move(up(offset));
  return message;
};

export const mouseDown = async (offset: number, ws: Duplex) => {
  const message = `mouse_down_${offset}px`;
  ws.write(message);
  await mouse.move(up(-offset));
  return message;
};

export const mouseRight = async (offset: number, ws: Duplex) => {
  const message = `mouse_right_${offset}px`;
  ws.write(message);
  await mouse.move(left(-offset));
  return message;
};

export const mouseLeft = async (offset: number, ws: Duplex) => {
  const message = `mouse_left_${offset}px`;
  ws.write(message);
  await mouse.move(left(offset));
  return message;
};

export const mousePosition = async (_: unknown, ws: Duplex) => {
  const position = await mouse.getPosition();
  const message = `mouse_position_${position.x}px,${position.y}px`;
  ws.write(message);
  return message;
};