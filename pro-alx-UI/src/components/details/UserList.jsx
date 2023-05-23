import PropTypes from "prop-types";
import User from "./User"

const UserList = ({users}) => {
  return (
      <div>
          {users.length ? (
              <div>
                  {users.map(user => (<User key={user.name} {...user}/>))}  
             </div>
          ): (<p>loading....</p>)}
    </div>
  )
}

UserList.propTypes = {
    users: PropTypes.array,
}

export default UserList