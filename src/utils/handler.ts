import { mouseUp, mouseDown, mouseLeft, mouseRight, mousePosition } from './mouseNavigation.js';

type Commands = 'mouse_up' | 'mouse_down' | 'mouse_left' | 'mouse_right' | 'mouse_position';

const commands = {
  mouse_up: mouseUp,
  mouse_down: mouseDown,
  mouse_left: mouseLeft,
  mouse_right: mouseRight,
  mouse_position: mousePosition,
};

export const getCommand = (command: Commands) => commands[command];
