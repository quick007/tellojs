import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Sets the speed in cm/s
 * @param newspeed Speed between 10 and 100 to set the speed to
 */

export function speed(this: DroneController, newspeed: number) {
	if (newspeed > 100 || newspeed < 10) {
		throw new Error("Invalid speed number! Must be between 10 and 100");
	}

	return () =>
		this.socket.send(
			encode(`speed ${newspeed}`),
			this.options.telloPort,
			this.options.telloIP,
		);
}
