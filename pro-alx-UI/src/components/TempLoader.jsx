const TempLoader = () => {
	return (
		<>
			<div className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50 dark:bg-body ' />
			<div className='fixed inset-x-0 inset-y-0 grid content-center justify-center'>
				<h2 className='animate-loader text-3xl'>🌀</h2>
			</div>
		</>
	);
};

export default TempLoader;
