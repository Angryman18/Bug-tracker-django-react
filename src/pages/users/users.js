// vendors
import React from 'react'

// components
import UserCard from './user-card';
import Wrapper from '../../components/wrapper/wrapper';


const UsersList = () => {
    return (
        <Wrapper>
            <div className='my-6'>
                <h1 className='text-3xl pb-6 text-sideBarText'>Users Summary</h1>
                <hr />
            </div>
            <div className='grid lg:grid-cols-3 grid-rows-3 gap-8'>
                <div className=''><UserCard role='Developers' className='bg-lightIndigo border-indigo-600' usersNumber='46' /></div>
                <div className=''><UserCard role='Testers' className='bg-lightRose border-rose-600' usersNumber='97'/></div>
                <div className=''><UserCard role='Users' className='bg-lightOrange border-orange-600' usersNumber='164'/></div>
            </div>
        </Wrapper>
    )
}


export default UsersList;