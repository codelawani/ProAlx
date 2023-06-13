import { test } from 'vitest';
import { render } from '@testing-library/react';
import { UserProvider } from '../hooks/UserContext';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/home/Home';

test('that homepage renders correctly', () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<Home />
			</UserProvider>
		</MemoryRouter>
	);
});
