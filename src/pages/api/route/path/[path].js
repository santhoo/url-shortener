import { docPath } from 'util/firebase/docs'

export default async function single(req, res) {
	const { query } = req
	const doc = await docPath(query.path)

	if (query.path && doc) {
		return res.status(400).json({
			data: doc.url,
		})
	}

	return res.status(400).json({})
}
