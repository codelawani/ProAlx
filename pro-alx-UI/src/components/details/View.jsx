import { BsTwitter } from 'react-icons/bs';
import SmallLoader from '../loader/SmallLoader';
import {
  IoLocationSharp,
  IoLogoWhatsapp,
  IoLogoGithub,
  IoMail
} from 'react-icons/io5';
import PropTypes from 'prop-types';
import UserChart from './UserChart';
import { truncateEmail, truncateName } from '../../utils/helper_functions';

/* utility components to help display user information */

// display user image, name and cohort
export const ImageName = ({ name, photo_url, cohort_number }) => {
  return (
    <div className='flex items-center justify-start gap-4 pb-2 ml:flex-col ml:items-start border-b mb-3 border-gray-500 dark:border-gray-700'>
      <img
        src={photo_url}
        alt={`profile picture of ${name}`}
        className='mb-3 rounded-lg h-1/4 w-1/2 md:w-3/5'
      />
      <div className='flex gap-1 items-start text-lg pb-4 flex-col ml:flex-row ml:items-center ml:gap-3'>
        <span className='text-2xl'>{truncateName(name)}</span>
        {cohort_number && (
          <span className='text-sm'>{`Cohort ${cohort_number}`}</span>
        )}
      </div>

    </div>
  );
};

ImageName.propTypes = {
  name: PropTypes.string,
  photo_url: PropTypes.string,
  cohort_number: PropTypes.number
};

// display relevant user information
export const Details = ({ user }) => {
  // styles for span elements
  const span = 'flex gap-2 items-center py-2 text-base tb:text-xl md:text-xl';

  // styles for react icons used
  const iconStyle = 'text-2xl';
  return (
    <div className='w-full'>
      <span className={span}>
        <IoLogoGithub className={iconStyle} />
        <a
          href={`https://github.com/${user?.github_login}`}
          className='text-blue-500 hover:underline'
          target='_blank'
          rel='noreferrer'
        >
          {user?.github_login}
        </a>
      </span>
      <span className={span}>
        <IoLocationSharp className={iconStyle} />
        {user?.timezone || '-'}
      </span>
      <span className={`${span}`}>
        <IoMail className={`${iconStyle} text-bar-dark o`} />{' '}
        {user?.email && (
          <a
            href={`mailto:${user.email}`}
            className='text-blue-300 hover:underline'
            target='_blank'
            title={`Send mail to ${user.email}`}
            rel='noreferrer'
          >
            {truncateEmail(user.email)}
          </a>
        )}
        {!user?.email && '-'}
      </span>

      <span className={span}>
        <IoLogoWhatsapp className={`${iconStyle} text-green-700`} />{' '}
        {user?.whatsapp && (
          <a
            href={`https://wa.me/${user.whatsapp}`}
            className='text-blue-500 hover:underline'
            target='_blank' rel='noreferrer'
            title='chat on whatsapp or try a call'
          >
            {user.whatsapp}
          </a>
        )}
        {!user?.whatsapp && '-'}
      </span>
      <span className={`${span}`}>
        <BsTwitter className={`${iconStyle} text-blue-600`} />
        <a
          href={`https://twitter.com/${user?.twitter_username}`}
          className='text-blue-500 hover:underline'
          target='_blank'
          rel='noreferrer'
        >
          {user?.twitter_username}
        </a>
      </span>
      <span className='capitalize'>
        {`most active time - ${
          user?.most_active_time ? user?.most_active_time : 'not available'
        }`}
      </span>
      {user?.requested_partners && (
        <p className='py-4 border-y my-3 dark:border-gray-700 text-blue-900 border-gray-500'>
          <span>
            {`${user?.name} currently needs ${user?.requested_partners} Partner(s) for the ${user?.requested_project} team project`}
          </span>
          <span className='block pt-2'>{`Date requested: ${user?.last_request_date}`}</span>
        </p>
      )}
      {/* display only when user has not connected wakatime */}
      {!user?.waka_connected && (
        <span className='text-dark-hero text-base dark:text-main block pt-4'>
          *Wakatime not connected
        </span>
      )}
    </div>
  );
};

Details.propTypes = {
  user: PropTypes.object
};

export const DisplayChart = ({ waka_stats, git_stats, waka_connected }) => {
  // checks if the wakatime stats for a user has data
  const isWakatimeNotEmpty = Object.values(waka_stats || []).some(
    item => Object.values(item).length > 0
  );

  // return a loader while data is being fetched from server
  if (!waka_stats && !git_stats) return <SmallLoader />;

  return (
    <>
      {/* use wakatime stats if it contains data otherwise display github commits */}
      {isWakatimeNotEmpty && !waka_stats?.error
        ? (
          <UserChart value={waka_stats} />
          )
        : (
          <UserChart value={git_stats} isGithubData />
          )}
      {/* display if no wakatime data and user has connected wakatime */}
      {waka_connected && !isWakatimeNotEmpty
        ? (
          <span className='block text-bar dark:text-bar-dark pt-5'>
            No wakatime activity for the week
          </span>
          )
        : null}
    </>
  );
};

DisplayChart.propTypes = {
  waka_stats: PropTypes.object,
  git_stats: PropTypes.object,
  waka_connected: PropTypes.bool.isRequired
};

export const OverLay = ({ handleClick }) => {
  return (
    <div
      className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen'
      onClick={handleClick}
    />
  );
};

OverLay.propTypes = {
  handleClick: PropTypes.func
};
