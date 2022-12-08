import { useState, useEffect } from 'react'

const useMedia = () => {
	const sizes = {
		'small-mobile': '320px',
		'mobile': '576px',
		'small-tablet': '768px',
		'tablet': '1024px',
		'desktop': '1025px'
	}

	const queries = Object.values(sizes).map((size, idx, arr) => {
		
		const isLastEl = idx === (arr.length - 1)
		const minOrMax = isLastEl ? 'min' : 'max'
		return `(${minOrMax}-width: ${size})`
	})

	const mediaQueryLists = queries.map((q) => window.matchMedia(q))

	const getValue = () => {
		const index = mediaQueryLists.findIndex((mql) => mql.matches)
		return Object.keys(sizes)[index]
	}

	const [value, setValue] = useState(getValue)

	useEffect(() => {
		const handler = () => setValue(getValue)
		mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler))

		return () =>
			mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return value
}

export default useMedia