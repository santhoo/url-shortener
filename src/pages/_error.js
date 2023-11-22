export default function Custom404() {
	return null
}

export function getServerSideProps() {
	// return { props: { error: '404' } }

	return {
		redirect: {
			destination: process.env.APP_ERROR_REDIR,
			permanent: true,
		},
	}
}
