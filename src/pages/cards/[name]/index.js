import Head from 'next/head'
import {
	Avatar,
	Button,
	Container,
	Flex,
	Heading,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import {
	FaWhatsapp,
	FaLinkedinIn,
	FaFacebookF,
	FaRegEnvelope,
} from 'react-icons/fa6'

import { GetCardPaths, Cards } from 'util/cards'

import Logo from 'svg/logo-horizontal.svg'

const WhiteLogo = styled(Logo)(
	(props) =>
		`
		width: 5.5rem;
		height: auto;

		& path {
			fill: white;
		}
	`
)

export default function BusinessCard({ card }) {
	const color = {
		base: {
			white: '#fff',
		},
		primary: {
			500: '#2a3ecb',
		},
		darkGrey: {
			300: '#5B5B76',
			500: '#9A9AB1',
			700: '#BABAC5',
		},
		lightGrey: {
			300: '#CBCBD2',
			500: '#E3E3E8',
			700: '#F7F7F8',
		},
	}

	const avatarUrl = `https://firebasestorage.googleapis.com/v0/b/neopro-analytics.appspot.com/o/business-cards%2F${card.avatarFile}?alt=media`

	const linkIcons = {
		whatsapp: FaWhatsapp,
		facebook: FaFacebookF,
		linkedin: FaLinkedinIn,
		email: FaRegEnvelope,
	}

	const linkUseDefaultColorScheme = ['regular', 'email']

	return (
		<>
			<Head>
				<title>{`Aqui é o ${card.firstName} da NeoPro`}</title>
			</Head>

			<Flex
				width="full"
				height="100vh"
				alignItems="center"
				justifyContent="center"
				position="relative"
				bg={color.primary[500]}
			>
				<Container maxWidth="xs" centerContent>
					<Flex
						w="full"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						position="absolute"
						pb="2"
						bottom="0"
						left="50%"
						transform="translateX(-50%)"
						maxWidth="xs"
						px="6"
					>
						<WhiteLogo />

						<Text
							textAlign="center"
							color="white"
							fontSize="xs"
							lineHeight="none"
							mt="1"
						>
							Solução web e mobile de gestão de metas e
							vendas para varejo.
						</Text>
					</Flex>

					<Flex
						w="full"
						padding="4"
						mt="8"
						flexDirection="column"
						alignItems="center"
						rounded="2xl"
						textAlign="center"
						boxShadow="2xl"
						bg={color.lightGrey[700]}
						color={color.darkGrey[300]}
					>
						<Avatar
							size="2xl"
							mb="2"
							mt="-24"
							shadow="lg"
							name={card.name}
							src={avatarUrl}
							bg={color.lightGrey[500]}
						/>
						<Heading size="lg" fontWeight="semibold" mb="6">
							{card.fullName}
						</Heading>
						<Text fontSize="sm" fontWeight="semibold">
							Olá, tudo bem?
						</Text>
						<Text lineHeight="shorter" fontSize="sm">
							{card.about}
						</Text>
					</Flex>

					{card?.links.length > 0 && (
						<Flex
							mt="6"
							w="full"
							flexDirection="column"
							textAlign="center"
						>
							<Heading
								size="sm"
								fontWeight="semibold"
								mb="4"
								color={color.base.white}
							>
								Vamos conversar?
							</Heading>

							<VStack spacing="4">
								{card.links.map((link, index) => {
									const Icon = linkIcons[link.type]

									return (
										<Button
											textDecoration="none"
											w="full"
											boxShadow="dark-lg"
											colorScheme={
												!linkUseDefaultColorScheme.includes(
													link.type
												)
													? link.type
													: null
											}
											leftIcon={Icon ? <Icon /> : null}
											as={Link}
											href={link.url}
											key={index}
											isExternal
										>
											{link.title}
										</Button>
									)
								})}
							</VStack>
						</Flex>
					)}
				</Container>
			</Flex>
		</>
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
