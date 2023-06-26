import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * @param ssid Wifi ssid
 * @param password Wifi password
 * @param accessPoint Weather you're connecting to an access point or not (default off)
 */
export function wifi(
	this: DroneController,
	ssid: string,
	password: string,
	accessPoint = false,
) {
	return () =>
		this.socket.send(
			encode(`${accessPoint ? "ap" : "wifi"} ${ssid} ${password}`),
			this.options.telloPort,
			this.options.telloIP,
		);
}
