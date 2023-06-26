import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function xMovement(this: DroneController, move: number) {
  const to = move >= 0 ? `forward ${move}` : `back ${move}`;
  return () => this.socket.send(encode(to), this.options.telloPort, this.options.telloIP);
}
