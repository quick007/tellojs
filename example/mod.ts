import options from "../options.json" assert { type: "json" }

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const addr = {
	transport: "udp",
	port: options.telloport,
	hostname: options.telloip
} as const
const socket = Deno.listenDatagram(addr);

for await (const data of socket) {
	console.log(decoder.decode(data[0]))
}

socket.send(encoder.encode("command"), addr)