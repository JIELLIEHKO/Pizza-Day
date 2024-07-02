import { Link } from 'react-router-dom'

export function PageNotFound() {
	return (
		<>
			<div style={{ marginTop: '5rem' }}>
				<h1>Page Not Found</h1>
				<Link to='/'>Back to home</Link>
			</div>
		</>
	)
}
