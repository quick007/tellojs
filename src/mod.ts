import { takeOff, wait, xMovement, land } from "./cmds/mod.ts";
import { dgram } from "./deps.ts";
import { encode } from "./lib/text.ts";

export default class DroneController {
  public takeOff = takeOff;
	public wait = wait;
	public xMovement = xMovement
	public land = land

  readonly options: Options;
  public socket!: dgram.Socket;
  public webServer!: Deno.Listener;
  public state: string;
	public events: (() => void)[] = [];
  private isEventLoopRunning = false;
  private resolveQueue: (() => void)[] = [];

  constructor(options: Options) {
    this.options = options;
    this.state = "";
  }

  async connect() {
    console.log("Connecting...");
    this.socket = dgram.createSocket({ type: "udp4" });
    this.socket.bind(this.options.telloStatePort);
    console.log("Created socket...");
		this.enqueue(() => this.socket.send(encode("command"), this.options.telloPort, this.options.telloIP))
    await this.waitForQueueToFinish();
		
			console.log("Connected to tello!")
		
    if (this.options.webserver) {
      this.webServer = Deno.listen({ port: this.options.webserver });
    }
  }

  enqueue(...cmds: (() => void)[]) {
    this.events.push(...cmds);
    if (!this.isEventLoopRunning) {
      this.eventLoop();
    }
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
    console.log("Starting to execute command")
    const [_, res] = await Promise.all([
      await cmd(),
      await new Promise<string>((resolve) => {
        this.socket.once("message", (msg: string) => {
					console.log("started to resolve msg from server")
          resolve(msg);
					console.log("resolved msg from server")
        });
      })
    ]);

		if (res == "error") {
			throw new Error("Command failed to execute")
		}
    console.log("Execeuted function")
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
}
