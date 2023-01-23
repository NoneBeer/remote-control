import { drawCircle, drawRectangle, drawSquare } from './draw.js';
import { mouseUp, mouseDown, mouseLeft, mouseRight, mousePosition } from './mouseNavigation.js';
import { printShot } from './screenShot.js';

type Commands = 'mouse_up' | 'mouse_down' | 'mouse_left' | 'mouse_right' | 'mouse_position' | 'draw_circle' | 'prnt_scrn';

const commands = {
  mouse_up: mouseUp,
  mouse_down: mouseDown,
  mouse_left: mouseLeft,
  mouse_right: mouseRight,
  mouse_position: mousePosition,
  draw_circle: drawCircle,
  draw_rectangle: drawRectangle,
  draw_square: drawSquare,
  prnt_scrn: printShot
};

export const getCommand = (command: Commands) => commands[command];
