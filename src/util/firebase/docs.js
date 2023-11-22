import { db } from 'util/firebase'
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	where,
	limit,
	doc,
	Timestamp,
} from 'firebase/firestore'

export {
	docCreate,
	docUpdate,
	docDelete,
	docGet,
	docPath,
	docAll,
}

const redirsCol = 'redirs'
const redirsDb = collection(db, redirsCol)

// Cria um novo redirecioanmento
async function docCreate(values) {
	try {
		const response = await addDoc(redirsDb, {
			path: values.path,
			url: values.url,
			dateCreated: Timestamp.now(),
			dateUpdated: Timestamp.now(),
		})

		return response
	} catch (err) {
		throw new Error(err)
	}
}

// Atualiza um redirecioanmento
async function docUpdate(item, update) {
	try {
		const redirRef = doc(db, redirsCol, item.id)

		await updateDoc(redirRef, {
			...update,
			dateUpdated: Timestamp.now(),
		})
	} catch (err) {
		throw new Error(err)
	}
}

// Deleta um redirecionamento
async function docDelete(docId) {
	try {
		const redirRef = doc(db, redirsCol, docId)

		await deleteDoc(redirRef)
	} catch (err) {
		throw new Error(data)
	}
}

// Consulta um registro
async function docGet(id) {
	const docRef = doc(db, redirsCol, id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		return {
			...docSnap.data(),
			id: docSnap.id,
			dateUpdated: docSnap
				.data()
				.dateUpdated?.toDate()
				.getTime(), // timestamp handler
			dateCreated: docSnap
				.data()
				.dateCreated?.toDate()
				.getTime(), // timestamp handler
		}
	} else {
		return false
	}
}

// Consulta um registro pelo PATH
async function docPath(path) {
	try {
		const { docs } = await getDocs(
			query(redirsDb, where('path', '==', path), limit(1))
		)

		if (docs.length >= 1) {
			const doc = docs[0]

			return {
				...doc.data(),
				id: doc.id,
				dateUpdated: doc
					.data()
					.dateUpdated?.toDate()
					.getTime(), // timestamp handler
				dateCreated: doc
					.data()
					.dateCreated?.toDate()
					.getTime(), // timestamp handler
			}
		} else {
			return false
		}
	} catch (err) {
		throw new Error(err)
	}
}

// Retorna todos os registros
async function docAll() {
	try {
		const querySnapshot = await getDocs(
			query(redirsDb, orderBy('path'))
		)

		const response = []
		querySnapshot.forEach((doc) => {
			response.push({
				...doc.data(),
				id: doc.id,
				dateUpdated: doc
					.data()
					.dateUpdated?.toDate()
					.getTime(), // timestamp handler
				dateCreated: doc
					.data()
					.dateCreated?.toDate()
					.getTime(), // timestamp handler
			})
		})

		return response
	} catch (err) {
		throw new Error(err)
	}
}
