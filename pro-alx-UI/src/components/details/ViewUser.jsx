import { useUserData } from '../../hooks/fetchData';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Button';
import UserChart from './UserChart';
import { MdOutlineArrowBackIosNew, MdOutlineAlternateEmail } from 'react-icons/md';
import { useUser } from '../../hooks/customContexts';
import { BsTwitter } from 'react-icons/bs';
import { IoLocationSharp, IoLogoWhatsapp } from 'react-icons/io5';

const dataset = {
  '2023-05-14': {
    'alx-higher_level': 9238.773577,
    'alx-system_devops': 299.72227,
    printf: 7119.960505
  },
  '2023-05-15': {
    AirBnB_clone_v2: 2220.406212,
    AirBnB_clone_v3: 10175.88833
  },

  '2023-05-16': {
    'alx-system_engineering': 18196.040971,
    'alx-low_level': 2903.1054,
    AirBnB_clone: 11766.9124
  },
  '2023-05-17': {
    'alx-higher_level': 9238.773577,
    'alx-system_devops': 299.72227,
    printf: 7119.960505
  },
  '2023-05-18': {
    AirBnB_clone_v2: 2220.406212,
    AirBnB_clone_v3: 10175.88833
  },

  '2023-05-19': {
    'alx-system_engineering': 18196.040971,
    'alx-low_level': 2903.1054,
    AirBnB_clone: 11766.9124
  },
  '2023-05-20': {
    'alx-system_engineering': 18196.040971,
    'alx-low_level': 2903.1054,
    AirBnB_clone: 11766.9124
  }
};

const ViewUser = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { value: userDetails } = useUserData({
    queryKey: ['user', id],
    endpoint: `/users/${id}/details`
  });
  console.log(userDetails);

  const { value: userStats } = useUserData({
    queryKey: ['user-stats', id],
    endpoint: `/users/${id}/${
			userDetails?.waka_connected === true ? 'waka_stats' : 'git_stats'
		}`,
    enabled: userDetails
  });
  // console.log(userDetails, userStats);
  const navigate = useNavigate();
  const span = 'flex gap-1 items-center';
  return (
    <div className='w-full relative py-4 mt-[2rem]'>
      <div className='flex items-center justify-between mb-11'>
        <h3 className='text-xl font-semibold'>{`${userDetails?.name}'s Profile`}</h3>
        <Button
          value={
            <span className='flex items-center text-lg '>
              <MdOutlineArrowBackIosNew style={{ fontSize: '1.5rem' }} />
              Go back
            </span>
					}
          handleClick={() => navigate(-1)}
          style=' border p-2 rounded-lg hover:bg-yellow shadow-ul text-dark-blue  dark:text-body hover:text-white dark:hover:text-dark'
        />
      </div>

      <div className='flex flex-col ml:flex-row lg:grid lg:justify-between lg:grid-cols-5 justify-center items-center lg:content-between xl:px-[7rem] lg:px-7'>
        <div
          id='user-details'
          className='flex flex-col justify-center md:full lg:col-span-2'
        >
          <img
            src={userDetails?.photo_url}
            alt='profile picture'
            className='mb-3 rounded-lg h-2/4 w-full md:w-3/5'
          />

          <div>
            <div className='flex gap-8 items-center text-2xl pb-4'>
              <span className=''>{userDetails?.name}</span>
              {userDetails?.cohort_number && (
                <span>{`Cohort ${userDetails?.cohort_number}`}</span>
              )}
            </div>
            <span className={span}>
              <IoLocationSharp />
              {userDetails?.timezone}
            </span>
            <span className={span}>
              <MdOutlineAlternateEmail /> {userDetails?.email}
            </span>
            <span className={span}>
              <IoLogoWhatsapp /> {userDetails?.whatsapp}
            </span>

            <span className={span}>
              <BsTwitter className='text-blue-600' />
              <a
                href={`https://twitter.com/${userDetails?.twitter_username}`}
                className='text-blue-500 hover:underline'
                target='_blank'
                rel='noreferrer'
              >
                {userDetails?.twitter_username}
              </a>
            </span>
            <span>
              {`most active time - ${
								userDetails?.most_active_time
									? userDetails?.most_active_time
									: ''
							}`}
            </span>
          </div>
        </div>
        <div className='w-full flex items-center flex-col justify-center lg:col-span-3 lg:self-end pt-9 lg:pt-0 '>
          {userStats === undefined
            ? (
              <p className='text-center animate-bounce text-blue-400 self-start'>
                Fetching stats...
              </p>
              )
            : (
              <UserChart value={dataset} isGithubData={!user.waka} />
              )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
