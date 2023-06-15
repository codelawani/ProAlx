// handle redirect to github endpoint for OAuth authorization

export const handleAuth = updateLoading => {
	// env file in path ProAlx/pro-alx-UI
	const { VITE_GITHUB_ID: CLIENT_ID } = import.meta.env;
	// REDIRECT_URI used 'http://localhost:5173/';
	const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
	const SCOPE = 'read:user';

	updateLoading(true);
	const authUrl =
		GITHUB_AUTH_URL +
		`?client_id=${CLIENT_ID}` +
		'&response_type=code' +
		`&scope=${SCOPE}`;
	window.location.assign(authUrl);
};
