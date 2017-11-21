var authClient = new OktaAuth({
	url: "https://1337.okta.com",
	clientId: "0oab2v5e6rlRC21eK2p6",
	redirectUri: "http://localhost:81/javascript-sdk.html"
})

var idToken = authClient.tokenManager.get("idToken");

if (idToken) {
	console.log("Hello, " + idToken.claims.email + "!");
}
else if (location.hash) {
	authClient.token.parseFromUrl().then(idToken => {
		console.log("Hello, " + idToken.claims.email + "!");
		authClient.tokenManager.add("idToken", idToken);
		console.log(idToken);
	});
}
else {
	// var username = prompt("You're not logged in. Username:");
	// var password = prompt("Password:");

	// authClient.signIn({ username, password }).then(response => {
	// 	if (response.status === "SUCCESS") {
	// 		authClient.token.getWithRedirect({
	// 			sessionToken: response.sessionToken,
	// 			responseType: "id_token"
	// 		});
	// 	}
	// });

	authClient.token.getWithRedirect({
		responseType: "id_token"
	});
}

var accessToken = authClient.tokenManager.get("accessToken");

if (accessToken) {
	console.log(accessToken);
}
else if (location.hash) {
	authClient.token.parseFromUrl().then(accessToken => {
		console.log(accessToken);
		authClient.tokenManager.add("accessToken", accessToken);
	});
}
else {
	// var username = prompt("You're not logged in. Username:");
	// var password = prompt("Password:");

	// authClient.signIn({ username, password }).then(response => {
	// 	if (response.status === "SUCCESS") {
	// 		authClient.token.getWithRedirect({
	// 			sessionToken: response.sessionToken,
	// 			responseType: "token"
	// 		});
	// 	}
	// });

	authClient.token.getWithRedirect({
		responseType: "token"
	})
}