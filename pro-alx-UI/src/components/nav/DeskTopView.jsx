import NavLinks from './NavLinks';
import Login from '../Login';
import LoginWithGithub from '../GithubLogin';

const DeskTopView = () => {
  return (
    <div className='hidden md:flex'>
      <NavLinks />
      {/* <Login /> */}
      <LoginWithGithub style='text-black text-left' />
    </div>
  );
};

export default DeskTopView;
