import { Socket } from "socket.io-client";

/**
 * Permet de se connecter à un évèment relativement générique et d'en faire une promise. Il est possible de spécifier
 * un validateur pour filter le résultat, dès qu'un résultat convient la promise est résolue avec l'objet recu et prêt
 * à l'utilisation. Dans le cas ou plus de timeoutInMillis ms se sont écoulé, reject la promise. 
 */
export default function listeningSocketAsPromise<T>(
	socket: Socket,
	eventName: string,
	validator?: (value: T) => boolean,
	timeoutInMillis?: number
) {
	const defaultTimeoutInMillis = 60000; // 60s

	return new Promise<T>((resolve, reject) => {
		const eventTimeout = setTimeout(() => {
			reject("Timeout event");
			socket.off(eventName, listener);
		}, timeoutInMillis !== undefined ? timeoutInMillis : defaultTimeoutInMillis);

		function listener(eventObj: T)  {
			if (!validator?.(eventObj)) {
				return;
			}
			resolve(eventObj);
			clearTimeout(eventTimeout);
			socket.off(eventName, listener);
		}

		socket.on(eventName, listener);
	});
}