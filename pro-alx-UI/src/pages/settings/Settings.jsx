import { useState } from 'react';
// import Cohort from '../../components/details/Cohort';
import Button from '../../components/Button';
// import EditProfile from '../../components/details/EditProfile';

const Settings = () => {
  const [updateCohort, setUpdateCohort] = useState(false);
  // const [editProfile, setEditProfile] = useState(false);

  const handleCohortChange = () => {
    setUpdateCohort(prev => !prev);
  };

  // const handleProfileChange = () => {
  // 	setEditProfile(prev => !prev);
  // };
  const style =
		'hover:bg-dark-blue hover:text-body border py-1 px-4 text-dark-blue mt-2 border-dark-blue self-center dark:text-main dark:border-warm';

  return (
    <div>
      <h3 className='py-3 uppercase font-semibold'>Settings</h3>
      <div>
        <div className='flex gap-4'>
          <Button
            value='edit profile'
            onClick={handleCohortChange}
            style={style}
          />
          <Button
            value='update cohort'
            onClick={handleCohortChange}
            style={style}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
