import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function land(this: DroneController) {
  return () => this.socket.send(
    encode("land"),
    this.options.telloPort,
    this.options.telloIP
  );
}
