import options from "./options.json" assert { type: "json" };
import DroneController from "../src/mod.ts";

const drone = new DroneController(options);

await drone.connect();
await drone.enqueue(
  drone.takeOff(),
  drone.xMovement(100),
  drone.land()
);
await drone.disconnect()

//drone.enqueue(drone.xMovement(100))

// for await (const conn of server) {
//   serveHttp(conn);
// }

// async function serveHttp(conn: Deno.Conn) {
//   const httpConn = Deno.serveHttp(conn);
//   for await (const requestEvent of httpConn) {
//     // The native HTTP server uses the web standard `Request` and `Response`
//     // objects.
//     const body = `Your user-agent is:\n\n${
//       requestEvent.request.headers.get("user-agent") ?? "Unknown"
//     }`;
//     // The requestEvent's `.respondWith()` method is how we send the response
//     // back to the client.
//     requestEvent.respondWith(
//       new Response(body, {
//         status: 200,
//       }),
//     );
//   }
// }
