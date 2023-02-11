import { Server } from "socket.io";

const io = new Server({});

console.log('hey');

io.on("connection", (socket) => {
	console.log('connection');
	socket.on("listenDiscordEvent", () => {
		setTimeout(() => io.emit("theDiscordEvent", { a: 1 }), 100);
		setTimeout(() => io.emit("theDiscordEvent", { a: 2 }), 200);
		setTimeout(() => io.emit("theDiscordEvent", { a: 3 }), 300);
	})
});

io.listen(3000);