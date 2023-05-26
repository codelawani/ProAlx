import Home from './pages/home/Home';
function App() {
	const test = import.meta.env.VITE_TEST;
	console.log(test);
	return (
		<>
			<Home />
		</>
	);
}

export default App;
