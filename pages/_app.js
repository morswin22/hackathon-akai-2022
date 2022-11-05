import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Box} from '@mui/material'
import '../styles/globals.css'
import '../styles/Map.css'

function Application({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}

export default Application
