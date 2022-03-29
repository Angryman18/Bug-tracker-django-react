// vendors
import React from 'react'

// components
import UserCard from './user-card';
import Wrapper from '../../components/wrapper/wrapper';


const UsersList = () => {
    return (
        <Wrapper>
            Users
            <UserCard />
        </Wrapper>
    )
}


export default UsersList;