import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';
const MobileView = () => {
  const style = 'border border-main w-15 p-1';
  return (
    <div className='md:hidden fixed top-20 right-0 left-0 bottom-0 bg-red-100 grid content-center justify-center pt-6'>
      <NavLinks color='black' />
      {/* <Login style='text-black text-left' /> */}
      <LoginWithGithub style={style} />
    </div>
  );
};

export default MobileView;
