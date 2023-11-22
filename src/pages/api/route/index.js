import { docAll } from 'util/firebase/docs'

export default async function allRoutes(req, res) {
	const getAll = await docAll()

	return res.status(200).json({ data: getAll })
}
