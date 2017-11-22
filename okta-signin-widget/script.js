var oktaSignIn = new OktaSignIn({
	baseUrl: "https://1337.okta.com",
	clientId: "0oab306pxqIkpracq2p6",
	authParams: {
		issuer: "https://1337.okta.com/oauth2/default",
		responseType: ['token', 'id_token'],
		display: 'page'
	}
});

if (oktaSignIn.token.hasTokensInUrl()) {
	oktaSignIn.token.parseTokensFromUrl(function success(res) {
		var accessToken = res[0];
		var idToken = res[1]

		console.log("Hello, " + idToken.claims.email);
		console.log(accessToken);

		oktaSignIn.tokenManager.add('accessToken', accessToken);
		oktaSignIn.tokenManager.add('idToken', idToken);

		window.location.hash='';
	}, function error(err) {
		console.error(err);
	});
} else {
	oktaSignIn.session.get(function (res) {
		if (res.status === 'ACTIVE') {
			console.log('Welcome back, ' + res.login);
			return;
		}

		oktaSignIn.renderEl({ el: '#okta-login-container' }, function success(res) { }, function error(err) {
			console.error(err);
		});
	});
}