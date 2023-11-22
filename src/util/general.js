const Domain = {
	host: process.env.VERCEL_URL || process.env.APP_HOSTNAME,
	url: process.env.VERCEL_URL ? `https://${host}` : `http://${host}`,
}

export default Domain
