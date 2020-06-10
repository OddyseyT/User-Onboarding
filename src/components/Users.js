import React, { useState } from "react";

const Users = props => {
  console.log(props)
    return (
      <div className="user_list">
        {props.user.map(person => (
          <div className="information" key={person.id}>
            <p>{person.name}</p>
            <p>{person.email}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Users;  
