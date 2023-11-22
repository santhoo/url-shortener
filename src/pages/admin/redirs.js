import Head from 'next/head'
import { useRouter } from 'next/router'
import {
	useDisclosure,
	useControllableState,
	Container,
	Flex,
	Stack,
	Box,
	Heading,
	Divider,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	Spinner,
} from '@chakra-ui/react'

import { fullDomain } from 'util/general'
import { handle } from 'util/handlers'
import ModalCreate from 'components/ModalCreate'
import ModalEdit from 'components/ModalEdit'
import RedirCard from 'components/RedirCard'
import { useLoadingContext } from 'context/loading'

export default function RedirPage({ routesList }) {
	const router = useRouter()
	const refreshData = () => {
		router.replace(router.asPath)
	}

	const [loading, setLoading] = useLoadingContext()

	// Modal de criação
	const {
		isOpen: isOpenModalCreate,
		onOpen: onOpenModalCreate,
		onClose: onCloseModalCreate,
	} = useDisclosure()

	// Modal de edição
	const {
		isOpen: isOpenModalEdit,
		onOpen: onOpenModalEdit,
		onClose: onCloseModalEdit,
	} = useDisclosure()
	const [editEl, setEditEl] = useControllableState('')
	const handleOpenModalEdit = async (itemId) => {
		setLoading(true)

		try {
			const redir = await handle.get(itemId)

			setEditEl(redir)
			onOpenModalEdit()
		} catch (err) {
			console.log('err: ', err)
		}

		setLoading(false)
	}
	const handleCloseModalEdit = () => {
		setEditEl('')
	}

	return (
		<>
			<Head>
				<title>
					Gerenciar redirecionamentos - Neopro Shortlinks
				</title>
			</Head>

			<Container maxW="4xl" py="16">
				<Stack direction="column" align="flex-end">
					<Box as="header" w="100%">
						<Heading
							as="h1"
							size={{ base: 'xl', md: '2xl' }}
						>
							Redirecionamentos
						</Heading>
						<Text
							color="gray.400"
							fontSize="lg"
							fontWeight="medium"
						>
							{fullDomain}
						</Text>
					</Box>

					<Button
						colorScheme="blue"
						onClick={onOpenModalCreate}
						size="lg"
						width={{ base: '100%', md: 'auto' }}
					>
						+ Redirecionamento
					</Button>

					<Divider pt={{ base: 4, md: 8 }} />

					<Flex
						as="main"
						pt={{ base: 4, md: 8 }}
						w="100%"
						direction="column"
					>
						{routesList.length > 0 ? (
							routesList.map((item, key) => (
								<RedirCard
									key={key}
									cardKey={key}
									redir={item}
									onClick={() =>
										handleOpenModalEdit(item.id)
									}
								/>
							))
						) : (
							<Box>
								<Heading
									textAlign="center"
									color="gray.500"
									fontSize="xl"
								>
									Nenhum redirecionamento criado
								</Heading>
							</Box>
						)}
					</Flex>
				</Stack>
			</Container>

			{isOpenModalCreate && (
				<ModalCreate
					isOpen={isOpenModalCreate}
					onClose={onCloseModalCreate}
					refresh={refreshData}
				/>
			)}

			{isOpenModalEdit && (
				<ModalEdit
					isOpenModal={isOpenModalEdit}
					onCloseModal={onCloseModalEdit}
					handleClose={handleCloseModalEdit}
					editEl={editEl}
					refresh={refreshData}
				/>
			)}

			{loading && (
				<Modal
					isOpen={loading}
					isCentered
					closeOnEsc={false}
					closeOnOverlayClick={false}
				>
					<ModalOverlay
						bg="whiteAlpha.700"
						backdropFilter="auto"
						backdropBlur="4px"
					/>
					<ModalContent
						bg="transparent"
						alignItems="center"
						boxShadow="none"
					>
						<Spinner size="xl" color="blue.500" />
					</ModalContent>
				</Modal>
			)}
		</>
	)
}

export async function getServerSideProps() {
	const redirs = await handle.all()
	// console.log('server redirs: ', redirs)

	return {
		props: {
			routesList: redirs,
		},
	}
}
