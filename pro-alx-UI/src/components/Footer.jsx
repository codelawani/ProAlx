//import NavLinks from "../nav/NavLinks";

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear()
  return (
		<footer className="pt-3 mt-3">
			{/* <div className="px-3">
				<h3>ProAlx</h3>
				<p>Find project partner(s) easily</p>
				<NavLinks color='black' />
			</div> */}
			<p className='bg-gradient-to-bl from-dark to-red-950 py-4 text-body px-3'>
				&copy;{currentYear}ProAlx. All rights reserved.
			</p>
		</footer>
	);
}

export default Footer