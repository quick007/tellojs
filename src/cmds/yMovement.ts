import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

let height = 20;

export function yMovement(this: DroneController, move: number) {
  if (move < 20) {
	throw new Error("Minimum height is 20cm");
  }
  const to = height >= move ? `down ${move}` : `up ${move}`;
  return () => this.socket.send(encode(to), this.options.telloPort, this.options.telloIP);
}
