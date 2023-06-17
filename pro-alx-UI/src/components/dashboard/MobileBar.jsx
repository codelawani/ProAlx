import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';
import Theme from '../Theme';
import LoginWithGithub from '../GithubLogin';
import { useNavigate } from 'react-router-dom';

const MobileBar = ({ handleClick }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div
        className='bg-body fixed top-0 bottom-0 left-0 right-0 z-10 opacity-20'
        onClick={handleClick}
      />
      <div className='fixed dark:bg-[#010414] text-white right-2 p-4 z-50 flex flex-col justify-center rounded gap-2 duration-300 ease-linear transition transform top-14 animate-nav origin-top bg-dark-blue w-fit '>
        <div className='flex items-center justify-between w-full pb-2 '>
          <Theme />
          <Button value={<TfiClose />} style='' handleClick={handleClick} />
        </div>
        <DashboardNav handleClick={handleClick} />

        <LoginWithGithub
          style='font-mono text-sm font-bold uppercase pb-2 px-2'
          handleClick={handleClick}
        />

        <div
          className='flex gap-2 items-center rounded-lg mb-2 w-fit px-2 cursor-pointer'
          onClick={() => {
					  navigate('/profile');
					  handleClick();
          }}
        >
          <img
            src={user.photo_url}
            alt='profile photo'
            className='rounded-full w-10'
          />
          <span className='font-mono text-sm font-bold uppercase'>
            {user.name}
          </span>
        </div>
      </div>
    </>
  );
};

MobileBar.propTypes = {
  handleClick: PropTypes.func,
  handleConnect: PropTypes.func
};

export default MobileBar;
