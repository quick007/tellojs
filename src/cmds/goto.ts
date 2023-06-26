import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Goto a specific location (requires mission pad??)
 * @param coords Coordinates of where you want to go (between -500 and 500)
 * @param speed 10 - 60
 * @param missionPad Go to the coodinates based on a certain mission pad
 */

export function goto(
	this: DroneController,
	coords: { x: number; y: number; z: number },
	speed: number,
	missionPad?: "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8",
) {
	if (speed < 10 || speed > 60) {
		throw new Error("Speed needs to be between 10 and 60");
	}
	return () =>
		this.socket.send(
			encode(
				`go ${coords.x} ${coords.y} ${coords.x} ${speed}${
					missionPad && ` ${missionPad}`
				}`,
			),
			this.options.telloPort,
			this.options.telloIP,
		);
}
