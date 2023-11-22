import { useRouter } from 'next/router'

import QRCode from 'react-qr-code'

import { GetCardPaths, Cards } from 'util/cards'

export default function QrCodeCardGenerator({ card }) {
	// Get Card URL
	const router = useRouter()
	const currentUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}${router.asPath}`
	// console.log(url.href)
	// const { href: currentUrl } = useUrl()
	const cardUrl = currentUrl.substring(
		0,
		currentUrl.lastIndexOf('/')
	)
	console.log(cardUrl)

	return (
		<div
			style={{
				height: 'auto',
				margin: '0 auto',
				maxWidth: '100%',
				maxHeight: '90vh',
				width: '100%',
				padding: '1rem',
			}}
		>
			<QRCode
				size={256}
				style={{
					height: 'auto',
					maxHeight: '90vh',
					maxWidth: '100%',
					width: '100%',
				}}
				value={cardUrl}
				viewBox={`0 0 256 256`}
			/>
		</div>
	)
}

export function getStaticPaths() {
	const cards = GetCardPaths()

	// If Card doesn't exists
	if (!cards) {
		return {
			notFound: true,
		}
	}

	// Return Cards static paths
	return {
		paths: cards,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	// Return Object from select card
	return {
		props: {
			card: Cards.find((card) => card.name === params.name),
		},
	}
}
