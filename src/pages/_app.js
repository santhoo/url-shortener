import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { LoadingProvider } from 'context/loading'

const theme = extendTheme({
	styles: {
		global: (props) => ({
			body: {
				bg: '#fafafa',
			},
		}),
	},
})

export default function App({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<LoadingProvider>
				<Component {...pageProps} />
			</LoadingProvider>
		</ChakraProvider>
	)
}
