import options from "../options.json" assert { type: "json" }
import * as dgram from "https://deno.land/std@0.170.0/node/dgram.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const addr = {
	transport: "udp",
	port: options.telloport,
	hostname: options.telloip
} as const

const socket = dgram.createSocket({ type: "udp4" })

socket.bind(8890, options.telloip);

socket.on("message", (msg) => console.log(msg))

socket.send(encoder.encode("command"), options.telloport, options.telloip)

// const socket = Deno.listenDatagram(addr);

// for await (const data of socket) {
// 	console.log(decoder.decode(data[0]))
// }

// socket.send(encoder.encode("command"), addr)