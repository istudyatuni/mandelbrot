import { render } from '@testing-library/svelte'
import App from '../src/components/App'

test('renders learn svelte link', () => {
	const { getByText } = render(App)
	const linkElement = getByText(/learn svelte/i)
	expect(linkElement).toBeInTheDocument()
})
