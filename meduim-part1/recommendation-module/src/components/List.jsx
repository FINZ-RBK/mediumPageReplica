import React from 'react';

const List = (props) => <div>
    <h5>Hello From Recommendation List</h5>
    <div>
      {props.users.map(user => {
        return <li key={user._id}> user name >  {user.name}</li>;
      })}
    </div>
</div>;

export default List;
