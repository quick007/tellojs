import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Move your drone on the x axis (left or right)
 * @param move Move left (+) or move right (-)
 */
export function zMovement(this: DroneController, move: number) {
	const m = move > 0 ? move : move * -1
	if (500 < m || m < 20) {
		throw new Error("Move values must be between or equal to 20 and 500");
	}
	const to = move >= 0 ? `left ${m}` : `right ${m}`;
	return () =>
		this.socket.send(encode(to), this.options.telloPort, this.options.telloIP);
}
