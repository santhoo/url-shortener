import { useEffect } from 'react'
import {
	useBoolean,
	useControllableState,
	Flex,
	Card,
	CardBody,
	IconButton,
	Tooltip,
	Text,
} from '@chakra-ui/react'
import { EditIcon, CopyIcon, CheckIcon } from '@chakra-ui/icons'

export default function RedirCard({ redir, cardKey, appDomain, ...props }) {
	// Estado de copy
	const [copied, setCopied] = useBoolean(false)
	const [copyKey, setCopyKey] = useControllableState({
		defaultValue: '',
		onChange: setCopied.on,
	})
	const handleClipboard = async (redirUrl, key, e) => {
		if (e && e.stopPropagation) e.stopPropagation()
		try {
			await navigator.clipboard.writeText(redirUrl)
			setCopyKey([redirUrl, key])
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}
	useEffect(() => {
		copied === true && setTimeout(setCopied.off, 1500)
	}, [copyKey])

	return (
		<Card
			bg="white"
			mb={{ base: 4, md: 2 }}
			cursor="pointer"
			_hover={{
				background: 'orange.50',
				transition: '.35s all ease',
				boxShadow: 'md',
			}}
			role="group"
			{...props}
		>
			<CardBody p={{ base: 2, md: 5 }}>
				<Flex direction={{ base: 'column', md: 'row' }} align="center">
					<Flex direction="column" grow="1" width="100%">
						<Flex
							direction="row"
							fontSize={{ base: 'xl', md: '2xl' }}
							fontWeight="bold"
							width="100%"
							wrap="nowrap"
						>
							<Text color="gray.400">{appDomain.host}</Text>
							<Text
								color="gray.900"
								_groupHover={{
									color: 'orange.500',
									transition: '.4s all ease',
								}}
								noOfLines={1}
							>
								{`/${redir.path}`}
							</Text>
						</Flex>
						<Flex
							direction="row"
							fontSize={{ base: 'sm', md: 'md' }}
							color="gray.500"
						>
							<Text>Destino:</Text>
							<Text fontWeight="medium" ml="1" noOfLines={1}>
								{redir.url}
							</Text>
						</Flex>
					</Flex>

					<Flex direction="row" mr="0" ml="auto" mt={{ base: 4, sm: 0 }}>
						<Tooltip label={copied ? 'Copiado!' : 'Copiar'}>
							<IconButton
								aria-label="Copiar URL do redirecionamento"
								onClick={(e) =>
									handleClipboard(`${appDomain.url}/${redir.path}`, cardKey, e)
								}
								size={{ base: 'sm', md: 'md' }}
								icon={
									copied && copyKey[1] === cardKey ? (
										<CheckIcon />
									) : (
										<CopyIcon />
									)
								}
								_hover={{
									background:
										copied && copyKey[1] === cardKey ? 'green.600' : 'blue.600',
									color: 'white',
								}}
								color={copied && copyKey[1] === cardKey ? 'white' : 'inherit'}
								bg={copied && copyKey[1] === cardKey ? 'green.600' : 'gray.100'}
								mr={{ base: 2, md: 4 }}
							/>
						</Tooltip>

						<Tooltip label="Editar">
							<IconButton
								aria-label="Editar redirecionamento"
								_groupHover={{
									background: 'orange.400',
									color: 'white',
								}}
								icon={<EditIcon />}
								size={{ base: 'sm', md: 'md' }}
							/>
						</Tooltip>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	)
}
