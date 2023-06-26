import { encode } from "../lib/text.ts";
import DroneController from "../mod.ts";

/**
 * Execute any command
 * @param rotation See this page for commands: https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf
 */

export function execute(this: DroneController, command: string) {
	return () =>
		this.socket.send(
			encode(command),
			this.options.telloPort,
			this.options.telloIP,
		);
}
