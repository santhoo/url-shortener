import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import {
	useDisclosure,
	Flex,
	Stack,
	Box,
	Text,
	ModalBody,
	ModalFooter,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftAddon,
	Button,
	Tooltip,
	useToast,
} from '@chakra-ui/react'

import AlertExclude from 'components/AlertExclude'
import { handle } from 'util/handlers'

export default function FormItem({
	formEdit,
	item,
	onClose: modalOnClose,
	initialRef,
	refresh,
	appDomain,
}) {
	const toast = useToast()

	// Dialog de exclusao
	const {
		isOpen: isOpenAlertExclude,
		onOpen: onOpenAlertExclude,
		onClose: onCloseAlertExclude,
	} = useDisclosure()

	let itemCreated = ''
	let itemUpdated = ''
	if (formEdit && item?.dateCreated && item?.dateUpdated) {
		const itemCreatedDate = new Date(item.dateCreated)
		const itemUpdatedDate = new Date(item.dateUpdated)

		itemCreated = itemCreatedDate.toLocaleString()
		itemUpdated = itemUpdatedDate.toLocaleString()
	}

	return (
		<Formik
			initialValues={{
				path: item?.path || '',
				url: item?.url || 'https://',
			}}
			validationSchema={yup.object({
				path: yup
					.string()
					.trim()
					.matches(
						/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
						'Digite um caminho de URL válido'
					)
					.required('Digite o caminho de redirecionamento'),
				url: yup
					.string()
					.trim()
					.url('Digite uma URL de destino válida')
					.required('Digite a URL de destino'),
			})}
			onSubmit={async (values, actions) => {
				if (!item) {
					try {
						await handle.create(values)
						refresh()

						toast({
							title: 'Redirecionamento criado.',
							status: 'success',
							duration: 2500,
							isClosable: true,
						})

						modalOnClose()
					} catch (err) {
						actions.setFieldError('path', err.message)
						console.log('err: ', err)
					}
				}

				if (formEdit && item) {
					try {
						const updated = await handle.update(item, values)
						refresh()

						toast({
							title: 'Redirecionamento atualizado.',
							description: `${appDomain.url}/${updated.path}`,
							status: 'success',
							duration: 2500,
							isClosable: true,
						})

						modalOnClose()
					} catch (err) {
						actions.setFieldError('path', err.message)
						console.log('err: ', err)
					}
				}
			}}
		>
			{(props) => (
				<Form>
					<ModalBody>
						<Stack spacing={3} mb="4">
							<InputGroup>
								<InputLeftAddon pointerEvents="none">
									{`${appDomain.url}/`}
								</InputLeftAddon>
								<Field name="path">
									{({ field, form }) => (
										<FormControl
											isInvalid={form.errors.path && form.touched.path}
										>
											<Input
												{...field}
												placeholder="Caminho"
												size="md"
												ref={initialRef}
											/>
											<FormErrorMessage>{form.errors.path}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</InputGroup>
							<Field name="url">
								{({ field, form }) => (
									<FormControl isInvalid={form.errors.url && form.touched.url}>
										<Input
											{...field}
											placeholder="https://www.url_de_destino.com"
											onFocus={
												(e) =>
													setTimeout(function () {
														e.target.selectionStart =
															e.target.selectionEnd = 10000
													}, 0) // cursor no final da URL do campo
											}
											type="url"
											size="md"
										/>
										<FormErrorMessage>{form.errors.url}</FormErrorMessage>
									</FormControl>
								)}
							</Field>

							{formEdit && itemCreated !== '' && itemUpdated !== '' && (
								<Box color="gray.500" pt="2">
									<Text fontSize="xs">Última edição: {itemUpdated}</Text>
									<Text fontSize="xs">Criado em: {itemCreated}</Text>
								</Box>
							)}
						</Stack>
					</ModalBody>
					<ModalFooter>
						{formEdit ? (
							<Flex justify="space-between" direction="row" width="100%">
								<Button
									colorScheme="red"
									ml="0"
									mr="auto"
									variant="ghost"
									onClick={onOpenAlertExclude}
								>
									Excluir
								</Button>
								<Button mr="4" onClick={modalOnClose}>
									Cancelar
								</Button>
								<Tooltip isDisabled={props.dirty} label="Edite os campos">
									<Button
										colorScheme="blue"
										isLoading={props.isSubmitting}
										isDisabled={!props.dirty}
										type="submit"
									>
										Salvar
									</Button>
								</Tooltip>
							</Flex>
						) : (
							<Flex justify="end" direction="row" width="100%">
								<Button mr="4" onClick={modalOnClose}>
									Cancelar
								</Button>
								<Tooltip isDisabled={props.dirty} label="Preencha os campos">
									<Button
										colorScheme="green"
										isLoading={props.isSubmitting}
										isDisabled={!props.dirty}
										type="submit"
									>
										Adicionar
									</Button>
								</Tooltip>
							</Flex>
						)}
					</ModalFooter>

					{isOpenAlertExclude && (
						<AlertExclude
							isOpen={isOpenAlertExclude}
							onClose={onCloseAlertExclude}
							modalOnClose={modalOnClose}
							item={formEdit && item?.id && item}
							refresh={refresh}
							appDomain={appDomain}
						/>
					)}
				</Form>
			)}
		</Formik>
	)
}
