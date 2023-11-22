export default function Custom404() {
	return null
}

export function getServerSideProps() {
	// return { props: { error: '404' } }
	return {
		redirect: {
			destination: 'https://www.neopro.com.br',
			permanent: true,
		},
	}
}
