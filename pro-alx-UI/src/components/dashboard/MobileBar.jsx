import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';
import Theme from '../Theme';

const MobileBar = ({ handleClick }) => {
  const { user } = useUser();
  const style = 'text-white border px-3 py-1';
  return (
    <>
      <div
        className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50'
        onClick={handleClick}
      />
      <div className='fixed bg-dark text-white top-16  right-4 md:hidden p-4 z-50 flex flex-col justify-center items-start rounded gap-2'>
        <Button
          value={<TfiClose />}
          style='self-end pb-3'
          handleClick={handleClick}
        />
        <DashboardNav handleClick={handleClick} />
        <Button value='wakatime' style={style} />
        <div className='flex gap-2 items-center border border-blur rounded-lg mb-2 w-fit px-2'>
          <img
            src={user.photo_url}
            alt='profile photo'
            className='rounded-full w-10'
          />
          <span>{user.name}</span>
        </div>
        <Theme />
      </div>
    </>
  );
};

MobileBar.propTypes = {
  handleClick: PropTypes.func
};

export default MobileBar;
