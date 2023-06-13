import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTheme } from '../hooks/customContexts';

describe('useTheme', () => {
	it('should return the initial value', () => {
		const { result } = renderHook(() => useTheme());
		console.log(result);
	});
});
