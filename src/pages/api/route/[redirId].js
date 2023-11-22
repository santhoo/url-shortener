import { docGet } from 'util/firebase/docs'

export default async function routeById(req, res) {
	const { query } = req
	const doc = await docGet(query.redirId)

	if (!query.redirId || !doc) {
		return res.status(400).json({
			data: 'Registro inválido.',
		})
	}

	return res.status(200).json({ data: doc })
}
