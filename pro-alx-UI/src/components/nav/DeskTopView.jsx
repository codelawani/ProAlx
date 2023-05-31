import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';

const DeskTopView = () => {
	const style = 'border border-main w-15 p-1';
	return (
		<div className='hidden md:grid content-center justify-center'>
			<NavLinks />
			<LoginWithGithub style={style} />
		</div>
	);
};

export default DeskTopView;
