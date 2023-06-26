import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Move your drone on the x axis (forwards or backwards)
 * @param move Move forward (+) or move backwards (-)
 */
export function xMovement(this: DroneController, move: number) {
	if (500 < move || move < 20) {
		throw new Error("Move values must be between or equal to 20 and 500");
	}
	const to = move >= 0 ? `forward ${move}` : `back ${move * -1}`;
	console.log(to);
	return () =>
		this.socket.send(encode(to), this.options.telloPort, this.options.telloIP);
}
