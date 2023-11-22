import { useRef } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
} from '@chakra-ui/react'

import FormItem from 'components/FormItem'

export default function ModalCreate({
	isOpen,
	onClose,
	refresh,
}) {
	// Foco no campo de caminho ao abrir o modal
	const initialRef = useRef()

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			initialFocusRef={initialRef}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					Adicionar Redirecionamento
				</ModalHeader>
				<ModalCloseButton />

				<FormItem
					onClose={onClose}
					initialRef={initialRef}
					refresh={refresh}
				/>
			</ModalContent>
		</Modal>
	)
}
