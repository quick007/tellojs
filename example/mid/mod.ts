import options from "../easy/options.json" assert { type: "json" };
import DroneController from "../../src/mod.ts";

// Start by creating a drone object
const drone = new DroneController(options);

// Next, connect to the drone
await drone.connect();

// You can queue up commands by using the enqueue function, which will run once the previous one has completed
await drone.enqueue(drone.takeOff(), drone.yMovement(40));

// This flies the drone in an octagon
for (let i = 0; i < 360; i += 45) {
  await drone.enqueue(drone.xMovement(20), drone.rotate(-45));
}

await drone.disconnect();
