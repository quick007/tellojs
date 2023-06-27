import options from "./options.json" assert { type: "json" };
import DroneController from "../../src/mod.ts";

// Start by creating a drone object
const drone = new DroneController(options);

// Next, connect to the drone
await drone.connect();

// You can queue up commands by using the enqueue function, which will run once the previous one has completed
await drone.enqueue(
	drone.takeOff(),
	drone.yMovement(70),
	// Need your drone to take a quick break? No problem!
	drone.wait(5000),
	drone.yMovement(30),
);
// You can even use multiple enqueues, so feel free to abstract or componitize however
await drone.enqueue(
	drone.xMovement(100)
)

// Disconnecting automagically turns off the websocket connection and lands the drone, then exits the Deno process
await drone.disconnect();
