import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

export function wait(this: DroneController, delay: number) {
	return () => new Promise<void>((resolve) => setTimeout(() => {
		this.socket.send(encode("battery"), this.options.telloPort, this.options.telloIP);
		resolve();
	}, delay));
}
