import options from "../easy/options.json" assert { type: "json" };
import DroneController from "../../src/mod.ts";

// Start by creating a drone object
const drone = new DroneController(options);

// Next, connect to the drone
await drone.connect();

// You can queue up commands by using the enqueue function, which will run once the previous one has completed
await drone.enqueue(
	drone.takeOff(),
	drone.yMovement(40),
	drone.xMovement(40)
);

await drone.disconnect();
