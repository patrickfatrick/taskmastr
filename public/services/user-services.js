export function login (username, key, rememberMe) {
	return fetch('/users/login', {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			key: key,
			rememberMe: rememberMe
		})
	})
	.then(response => {
		if (response.status === 204) return {error: 204, msg: 'No user found. Please confirm your password.'};
		if (response.status === 401) return {error: 401, msg: 'Invalid password.'};
		return response.json();
	})
	.then(response => {
		return response;
	});
}

export function create (username, key, rememberMe) {
	return fetch('/users/create', {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			key: key,
			rememberMe: rememberMe
		})
	})
	.then(response => response.json())
	.then(response => {
		return response;
	});
}

export function forgot (username) {
	return fetch('/users/forgot', {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username
		})
	})
	.then(response => response.json())
	.then(response => {
		return response;
	});
}

export function reset (token, newKey) {
	return fetch('/users/reset', {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: token,
			newKey: newKey
		})
	})
	.then(response => {
		if (response.status === 401) return {
			error: 401, 
			msg: 'This reset link is no longer or never was valid. Please close this window and try again.'
		};
		return response.json();
	})
	.then(response => {
		return response;
	});
}

export function logout () {
	return fetch('/users/logout', {
		method: 'get',
		credentials: 'same-origin'
	})
	.then(response => {
		return response;
	});
	
}

export function getSession () {
	return fetch('/session-data', {
		method: 'get',
		credentials: 'same-origin'
	})
	.then(response => {
		if (response.status === 204) return {error: 204, msg: 'No session data found'};
		return response.json();
	})
	.then(response => {
		return response;
	});
}

export function save (user, deleteAgendas) {
	return fetch('/users/write', {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: user,
			deleteAgendas: deleteAgendas
		})
	})
	.then(response => {
		return response;
	});
}
