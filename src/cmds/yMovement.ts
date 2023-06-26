import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

let height = 20;

export function yMovement(this: DroneController, move: number) {
	const finalHeight = move + height;
	if (500 < finalHeight || finalHeight < 20) {
		throw new Error(
			"The final height value must be between or equal to 20 and 500",
		);
	}
	const to = height >= move ? `down ${move * -1}` : `up ${move}`;
	return () =>
		this.socket.send(encode(to), this.options.telloPort, this.options.telloIP);
}
