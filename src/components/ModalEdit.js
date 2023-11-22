import { useRef } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
} from '@chakra-ui/react'

import FormItem from 'components/FormItem'

export default function ModalEdit({
	isOpenModal,
	onCloseModal,
	handleClose,
	editEl,
	refresh,
}) {
	// Foco no campo de caminho ao abrir o modal
	const initialRef = useRef()

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onClose={onCloseModal}
				onCloseComplete={handleClose}
				initialFocusRef={initialRef}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Editar Redirecionamento</ModalHeader>
					<ModalCloseButton />

					<FormItem
						formEdit
						onClose={onCloseModal}
						item={editEl}
						initialRef={initialRef}
						refresh={refresh}
					/>
				</ModalContent>
			</Modal>
		</>
	)
}
