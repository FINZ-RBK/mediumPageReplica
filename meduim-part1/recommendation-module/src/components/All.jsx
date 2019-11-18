import React from "react";
import OneComp from "./OneComp.jsx";

class All extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: props.users,
      arts: props.arts
    };
  }

  // to get 3 random items of an array
  random(arr) {
    var result = [];
    while (result.length < 3) {
      var randomnum = Math.floor(Math.random() * arr.length);
      if (!(result.includes(arr[randomnum]))) {
        result.push(arr[randomnum]);
      }
    }
    return result;
  }
  
  // to get a user by it's userId
  getUserById(id) {
    return this.state.users.filter((user) =>  user.id === id);
  }

  render() {
    // console.log('in All, the users are ', this.state.users);
    // console.log('in All, the articles are ', this.state.arts);

    // getting 3 random articles.
    var randomArts = this.random(this.state.arts);

    return( <div>
      <h2 className="RECmore">More From Medium</h2>
      <div className="RECall">
        {randomArts.map(oneArt => {
          return <OneComp key={oneArt._id} art={oneArt} user={this.getUserById(oneArt.authorId)[0]}/>;
        })}
      </div>
    </div>
    );
  }
}

export default All;