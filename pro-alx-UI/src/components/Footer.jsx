// import NavLinks from "../nav/NavLinks";

const Footer = () => {
	const date = new Date();
	const currentYear = date.getFullYear();
	return (
		<footer className=' text-black px-3 flex justify-between gap-1 md:flex-row flex-col dark:bg-dark bg-body dark:text-gray-300 z-[1] py-[5rem]'>
			<h3>ProAlx</h3>
			<ul>
				<li>Contact Us</li>
				<li>Documentation</li>
			</ul>
			<p className=''>&copy;{currentYear}ProAlx. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
