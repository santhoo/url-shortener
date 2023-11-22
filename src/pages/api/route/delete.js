import { docDelete, docGet } from 'util/firebase/docs'

export default async function deleteRoute(req, res) {
	const { body } = req

	if (!body.route || !docGet(body.route.id)) {
		return res.status(400).json({
			data: 'Registro inválido.',
		})
	}

	try {
		await docDelete(body.route.id)
		console.log(
			'Redirecionamento excluido: ',
			body.route.path
		)

		return res.status(200).json({ data: body.route })
	} catch (err) {
		console.log('Falha ao excluir: ', err)

		return res.status(400).json({
			data: 'Falha ao excluir.',
		})
	}
}
