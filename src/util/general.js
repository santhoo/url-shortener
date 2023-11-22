const Domain = {
	host: process.env.VERCEL_URL || process.env.APP_HOSTNAME,
	url: process.env.APP_URL,
}

export default Domain
