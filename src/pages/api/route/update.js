import {
	docGet,
	docPath,
	docUpdate,
} from 'util/firebase/docs'

export default async function updateRoute(req, res) {
	const { body } = req
	const docId = await docGet(body.route.id)

	if (!body.route || !body.new || !docId) {
		return res.status(400).json({
			data: 'Edição inválida.',
		})
	}

	const getDocPath = await docPath(body.new.path)
	if (getDocPath && getDocPath?.id !== body.route.id) {
		return res.status(400).json({
			data: 'Caminho já cadastrado.',
		})
	} else {
		try {
			await docUpdate(body.route, {
				path: body.new.path,
				url: body.new.url,
			})
			console.log(
				'Redirecionamento atualizado: ',
				body.new.path
			)

			return res
				.status(200)
				.json({ data: { path: body.new.path } })
		} catch (err) {
			console.log('Falha ao atualizar: ', err)
			return res.status(400).json({
				data: 'Falha ao atualizar.',
			})
		}
	}
}
