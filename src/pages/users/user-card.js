import React from "react";

const UserCard = ({ role, usersNumber, className, onClick }) => {
  return (
    <div
      className={`${className} text-white w-full border-b-8 h-full rounded-2xl shadow-md cursor-pointer`}
      onClick={e => onClick(e, role)}
    >
      <div className='py-12 px-6'>
        <h1 className='text-4xl'>{role}</h1>
        <h1 className='text-4xl float-right'>{usersNumber}</h1>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  className: "",
  onClick: null
};

export default UserCard;
