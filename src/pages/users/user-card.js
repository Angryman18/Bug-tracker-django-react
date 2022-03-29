import React from 'react'



const UserCard = ({role, usersNumber, className}) => {
    return (
        <div className={`${className} text-white w-full border-b-8 h-44 rounded-2xl shadow-md`}>
            <div className='py-12 px-6'>
                <h1 className='text-4xl'>{role}</h1>
                <h1 className='text-4xl float-right'>{usersNumber}</h1>
            </div>
        </div>
    )
};

UserCard.defaultProps = {
    className: '',
}

export default  UserCard;