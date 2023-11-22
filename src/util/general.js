const GetDomain = () => {
	const host = process.env.VERCEL_URL || process.env.APP_HOSTNAME
	const url = process.env.VERCEL_URL ? `https://${host}` : `http://${host}`

	return {
		host,
		url,
	}
}

const Domain = GetDomain()

export default Domain
