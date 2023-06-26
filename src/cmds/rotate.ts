import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Rotate the drone clockwise or counterclockwise
 * @param rotation Rotate clockwise (+) or counterclockwise (-)
 */

export function rotate(this: DroneController, rotation: number) {
	if (rotation > 360 || rotation == 0 || rotation < -360) {
		throw new Error("Invalid rotation number! Must be between 360 and -360");
	}
	const r = rotation > 0 ? `cw ${rotation}` : `ccw ${rotation * -1}`;
	return () =>
		this.socket.send(
			encode(r),
			this.options.telloPort,
			this.options.telloIP,
		);
}
