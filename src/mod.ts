import {
	emergency,
	execute,
	flip,
	goto,
	land,
	rotate,
	speed,
	takeOff,
	wait,
	wifi,
	xMovement,
	yMovement,
	zMovement,
} from "./cmds/mod.ts";
import { dgram } from "./deps.ts";
import { decode, encode } from "./lib/text.ts";
import defaultOptions from "./defaultOptions.json" assert { type: "json" };

export default class DroneController {
	public takeOff = takeOff;
	public wait = wait;
	public xMovement = xMovement;
	public yMovement = yMovement;
	public zMovement = zMovement;
	public land = land;
	public emergency = emergency;
	public flip = flip;
	public goto = goto;
	public rotate = rotate;
	public speed = speed;
	public wifi = wifi;
	public execute = execute;

	readonly options: Options;
	public socket!: dgram.Socket;
	public webServer!: Deno.Listener;
	public state: string;
	public events: (() => void)[] = [];
	private isEventLoopRunning = false;
	private resolveQueue: (() => void)[] = [];
	private allowWait = false;

	constructor(options?: Options) {
		this.options = options || defaultOptions;
		this.state = "";
	}

	async connect() {
		console.log("Connecting...");
		this.socket = dgram.createSocket({ type: "udp4" });
		this.socket.bind(this.options.telloStatePort);
		console.log("Created socket...");
		this.enqueue(() =>
			this.socket.send(
				encode("command"),
				this.options.telloPort,
				this.options.telloIP,
			)
		);
		this.enqueue(() =>
			this.socket.send(
				encode("battery?"),
				this.options.telloPort,
				this.options.telloIP,
			)
		);
		await this.waitForQueueToFinish();

		console.log("Connected to Tello!");
		this.allowWait = true;

		if (this.options.webserver) {
			this.webServer = Deno.listen({ port: this.options.webserver });
		}
	}

	async disconnect() {
		this.events = [];
		this.allowWait = false;
		this.enqueue(this.land());
		await this.waitForQueueToFinish();
		this.socket.removeAllListeners();
		this.socket.close();
		this.webServer.close();
		Deno.exit();
	}

	async enqueue(...cmds: (() => void)[]) {
		if (cmds.length == 0) {
			throw new Error("Enqueue function needs to contain commands");
		}
		this.events.push(...cmds);
		if (!this.isEventLoopRunning) {
			this.eventLoop();
		}
		await this.waitForQueueToFinish();
	}

	public waitForQueueToFinish() {
		return new Promise<void>((resolve) => {
			this.resolveQueue.push(resolve);
		});
	}

	private async eventLoop() {
		this.isEventLoopRunning = true;
		const cmd = this.events.shift();

		if (cmd == undefined) {
			this.isEventLoopRunning = false;
			for (const resolve of this.resolveQueue) {
				resolve();
			}
			return;
		}
		this.options.enhancedLogging && console.log("Starting to execute command");
		const [_, res] = await Promise.all([
			await cmd(),
			await new Promise<string>((resolve) => {
				this.socket.on("message", (msg: Uint8Array | string) => {
					const message = typeof msg == "string" ? msg : decode(msg);
					if (!message.startsWith("pitch")) {
						this.options.enhancedLogging &&
							console.log("started to resolve msg from server");
						resolve(message);
						this.options.enhancedLogging &&
							console.log("resolved msg from server");
					}
				});
			}),
		]);

		if (res == "error") {
			throw new Error("Command failed to execute (check your battery level)");
		}
		this.options.enhancedLogging && console.log(`Function response: ${res}`);
		if (!isNaN(parseInt(res))) {
			console.log(`Current Battery: ${res}`);
		}
		this.options.enhancedLogging && console.log("Execeuted function");

		this.allowWait &&
			(await new Promise((resolve) =>
				setTimeout(resolve, this.options.wait ?? 0)
			));
		this.socket.removeAllListeners("message");
		this.eventLoop();
	}
}

interface Options {
	telloIP: string;
	telloPort: number;
	webserver?: number;
	telloStatePort: number;
	telloVideoPort: number;
	enhancedLogging: boolean;
	wait?: number;
}
