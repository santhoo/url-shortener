import Domain from 'util/general'

export default function Teste(props) {
	console.log('props:', props)
	return (
		<ul>
			<li>
				APP_HOSTNAME: <strong>{props.domain.host}</strong>
			</li>
			<li>
				APP_URL: <strong>{props.domain.url}</strong>
			</li>
		</ul>
	)
}

export async function getServerSideProps() {
	console.log('Domain: ', Domain)

	return {
		props: {
			domain: Domain,
		},
	}
}
