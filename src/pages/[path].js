import { docPath } from 'util/firebase/docs'

export default function Index() {
	return null
}

export async function getServerSideProps({ params }) {
	const redir = await docPath(params.path)

	if (!redir) {
		return {
			notFound: true,
		}
	}

	return {
		redirect: {
			destination: redir.url, // redireciona para a URL
			permanent: true,
		},
	}
}
