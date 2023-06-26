import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Flip in a direction
 * @param rotation Flip left (l), right (r), forward (f), back (b)
 */

export function flip(this: DroneController, direction: "l" | "r" | "f" | "b") {
	return () =>
		this.socket.send(
			encode(`flip ${direction}`),
			this.options.telloPort,
			this.options.telloIP,
		);
}
