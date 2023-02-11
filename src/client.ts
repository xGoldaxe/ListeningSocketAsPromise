import { io } from "socket.io-client";
import listeningSocketAsPromise from "./lib/listeningSocketAsPromise";

const socket = io("http://localhost:3000");

interface DiscordEvent { a: number }

function verificatorDiscordEvent(value: DiscordEvent): boolean {
	return value.a === 3;
}

socket.on("connect", () => {
	(async () => {
		try {
			const discordResult = await listeningSocketAsPromise(socket, "theDiscordEvent", verificatorDiscordEvent, 1000);
			console.log('the event has been well resolved!', discordResult);
		} catch(e) {
			console.error(e);
		}
	})();
	
	// to tell the serverA we want an event to be triggered
	console.log("emit the event");
	socket.emit("listenDiscordEvent", { verificator: verificatorDiscordEvent });
})
