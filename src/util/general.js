const Domain = {
	host: process.env.VERCEL_URL || process.env.APP_HOSTNAME,
	get url() {
		return process.env.VERCEL_URL
			? `https://${this.host}`
			: `http://${this.host}`
	},
}

export default Domain
