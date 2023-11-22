import { docCreate, docPath } from 'util/firebase/docs'

export default async function createRoute(req, res) {
	const { body } = req

	if (!body.path || !body.destination) {
		return res.status(400).json({
			data: 'Preencha o Caminho e Destino do redirecionamento.',
		})
	}

	if (await docPath(body.path)) {
		return res.status(400).json({
			data: 'Caminho já cadastrado.',
		})
	} else {
		try {
			docCreate({
				path: body.path,
				url: body.destination,
			})
			console.log(
				'Redirecionamento cadastrado: ',
				body.path
			)
			return res
				.status(200)
				.json({ data: docPath(body.path) })
		} catch (err) {
			console.log('Falha ao criar: ', err)
			return res.status(400).json({
				data: 'Falha ao cadastrar.',
			})
		}
	}
}
