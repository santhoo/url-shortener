export const handle = {
	create: handleCreate,
	update: handleUpdate,
	delete: handleDelete,
	get: handleGet,
	all: handleAll,
}

// Cria um novo redirecioanmento
async function handleCreate(values) {
	const response = await fetch('/api/route/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			path: values.path,
			destination: values.url,
		}),
	})

	const { data } = await response.json()

	if (response.status === 200) {
		return data
	} else {
		throw new Error(data)
	}
}

// Atualiza um redirecioanmento
async function handleUpdate(item, update) {
	const response = await fetch('/api/route/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			route: item,
			new: update,
		}),
	})

	const { data } = await response.json()

	if (response.status === 200) {
		return data
	} else {
		throw new Error(data)
	}
}

// Deleta um redirecionamento
async function handleDelete(deleteEl) {
	const response = await fetch('/api/route/delete', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			route: deleteEl,
		}),
	})

	const { data } = await response.json()

	if (response.status === 200) {
		return data
	} else {
		throw new Error(data)
	}
}

// Consulta um registro
async function handleGet(id) {
	const response = await fetch(`/api/route/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { data } = await response.json()

	if (response.status === 200) {
		return data
	} else {
		throw new Error(data)
	}
}

// Retorna todos os registros
async function handleAll() {
	const response = await fetch(`${process.env.APP_URL}/api/route`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { data } = await response.json()

	if (response.status === 200) {
		return data
	} else {
		throw new Error(data)
	}
}
