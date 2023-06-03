import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';
import Theme from '../Theme';

const DeskTopView = () => {
  const style = 'border border-main w-15 p-1';
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
