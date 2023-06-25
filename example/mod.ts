import options from "../options.json" assert { type: "json" }

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const socket = Deno.listenDatagram({
	transport: "udp",
	port: options.telloport,
	hostname: options.telloip
})

for await (const data of socket) {
	const message = decoder.decode(data[0])
	console.log(message);
}

for (const command of ["command", "battery"]) {
	const data = encoder.encode(command)
	await socket.send(data, socket.addr);
}