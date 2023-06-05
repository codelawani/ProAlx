import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';
import Theme from '../Theme';

const DeskTopView = () => {
	const style =
		'border border-yellow w-15 p-1 transition-all duration-200 px-2 py-2 rounded-md active:outline-none transform active:scale-x-[0.8] hover:scale-x-[1.05] transition ease-in-out hover:bg-yellow hover:text-dark';
	return (
		<div className='hidden md:flex items-center justify-center'>
			<NavLinks />
			<LoginWithGithub style={style} />
			<span className='pl-3'>
				<Theme />
			</span>
		</div>
	);
};

export default DeskTopView;
