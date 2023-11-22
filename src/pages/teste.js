import Domain from 'util/general'

export default function Teste(props) {
	return (
		<ul>
			<li>
				APP_HOSTNAME: <strong>{props.host}</strong>
			</li>
			<li>
				APP_URL: <strong>{props.url}</strong>
			</li>
		</ul>
	)
}

export async function getServerSideProps() {
	console.log('Domain: ', Domain)

	return {
		props: {
			...Domain,
		},
	}
}
