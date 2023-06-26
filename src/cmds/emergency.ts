import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function emergency(this: DroneController) {
  return () => this.socket.send(
    encode("emergency"),
    this.options.telloPort,
    this.options.telloIP
  );
}
