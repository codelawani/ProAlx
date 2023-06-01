import PropTypes from 'prop-types';
import User from './User';

const UserList = ({ users }) => {
  if (!users.length) return <p>loading....</p>;

  return (
    <div>
      {users.map(user => (
        <User key={user.name} {...user} />
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array
};

export default UserList;
