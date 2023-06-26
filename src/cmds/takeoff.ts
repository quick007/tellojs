import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function takeOff(this: DroneController) {
  return () => 
  this.socket.send(
    encode("takeoff"),
    this.options.telloPort,
    this.options.telloIP
  );
}
