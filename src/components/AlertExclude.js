import { useRef } from 'react'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Tag,
	Button,
	Text,
	useToast,
	useBoolean,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { fullDomain } from 'util/general'
import { handle } from 'util/handlers'

export default function AlertExclude({
	isOpen,
	onClose,
	modalOnClose,
	item,
	refresh,
}) {
	const cancelRef = useRef()

	const toast = useToast()

	if (!item && !item?.id) {
		console.error('Registro inválido para exclusão.')
		onClose()
	}

	const [loading, setLoading] = useBoolean(false)

	async function deleteBtn(register) {
		setLoading.on()

		try {
			await handle.delete(register)
			refresh()

			toast({
				title: 'Redirecionamento excluído.',
				status: 'success',
				icon: <DeleteIcon />,
				duration: 2500,
				isClosable: true,
			})

			modalOnClose()
			onClose()
		} catch (err) {
			console.log('Erro ao excluir: ', err)
		}

		setLoading.off()
	}

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isCentered
		>
			<AlertDialogOverlay bg="blackAlpha.800">
				<AlertDialogContent>
					<AlertDialogHeader>
						Excluir Redirecionamento
					</AlertDialogHeader>

					<AlertDialogBody>
						<Text fontSize="lg" mb="4">
							Tem certeza que deseja excluir o
							redirecionamento?
						</Text>

						<Tag
							size="lg"
							colorScheme="red"
							borderRadius="full"
						>
							{`${fullDomain}/${item.path}`}
						</Tag>
					</AlertDialogBody>
					<AlertDialogFooter pt="8">
						<Button
							ref={cancelRef}
							size="lg"
							onClick={onClose}
						>
							Cancelar
						</Button>
						<Button
							size="lg"
							colorScheme="red"
							ml={3}
							onClick={() => deleteBtn(item)}
							isLoading={loading}
						>
							Excluir
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
