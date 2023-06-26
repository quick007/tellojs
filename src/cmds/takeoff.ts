import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function takeOff(this: DroneController) {
  this.socket.send(
    encode("takeoff"),
    this.options.telloPort,
    this.options.telloIP
  );
}
