const GetDomain = () => {
	const host = process.env.APP_HOSTNAME
	const url =
		process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`

	return {
		host,
		url,
	}
}

const Domain = GetDomain()

export default Domain
