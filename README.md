# Tellojs!
The easy-to-use javascript (uses ts) library for tello drones.

## Quick Start

First, make sure you have Deno installed. Learn how to [here](https://deno.com/manual@v1.11.0/getting_started/installation). We also recommend using vscode and installing the Deno extension for better dev experience.

If you have the vscode extension, open the command palette and run `> Deno: initialize workspace configuration`, and say yes to the promps

Next, create a file called mod.ts like this:

Replace insert version with the version when you go [here](https://deno.land/x/tellojs@latest). (i.e. v1.0.3)
```ts
// mod.ts
import DroneController from "https://deno.land/x/tellojs@INSERT_VERSION/mod.ts";

const drone = new DroneController();

await drone.connect();
await drone.enqueue(
  drone.takeOff(),
);
await drone.disconnect();
```

Run the file with `deno run -A --unstable mod.ts`

By default, it'll connect to the drone based on these [options](https://github.com/quick007/tellojs/blob/v1.0.2/src/defaultoptions.json). You can pass different connection ports and whatnot in JSON to the drone controller. The code itself is pretty self-explanatory- it connects to the drone, queues the takeoff command, then lands and disconnects the drone via `drone.disconnect()`. 

The enqueue command is pretty important, as it ensures that commands are running once the previous command has been ran, rather than relying on time. You can even stack multiple enqueue commands, or abstract it out into a file or loop. That being said, time isn't out of the question. For example:

```ts
//...
await drone.enqueue(
  drone.takeOff(),
  drone.xMovement(100),
  drone.wait(2000), //waits 2000ms, or 2 seconds before continuing
  drone.zMovement(100)
);
//...
```

If you want to see all the commands, see the API reference or the [deno documentation](https://deno.land/x/tellojs@v1.0.2/src/cmds/mod.ts) (probably more up-to-date.)

## API Reference

Here is the list of commands you can send the drone:

- emergency: Stops the propellers and lands the drone immediatly
- execute: Execute any command on the drone
- flip: Flip in a direction
- goto Go to a location based on coordiantes
- land: Land the drone (part of disconnect)
- rotate: Spin the drone
- speed: Set the speed of the drone
- takeOff: Take off- put the drone in the air
- wait: Wait time in milliseconds
- wifi: Set custom wifi credentials or access point credentials
- xMovement: Move forward and backwards
- yMovement: Move up and down
- zMovement: Move left or right

You can also view specifics about the commands (and see a more up-to-date list too) [here](https://deno.land/x/tellojs@v1.0.2/src/cmds/mod.ts)

Note that we don't support all the commands related to mission pads. Use the `execute()` function to send your own commands to the drone. A full list of the commands is available on the [SDK 2.0 User Guide](https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf).

## Credits and More Information

Made by [@quick007](https://github.com/quick007) and [@Blocksnmore](https://github.com/Blocksnmore)

Mainly reverse-engineered from the [SDK 2.0 User Guide](https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf)

Loosely based on [a repo by jsolderitsch](https://github.com/jsolderitsch/tello-nodejs/blob/master/TelloConsole.js) for udp connection information

