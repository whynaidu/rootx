import React from 'react'
import ProfileCard from './ProfileCard';
import Tools from './Tools';
import DashboardLinks from './DashboardLinks'
import Greetings from './Greetings';
import { useAuth } from '../../auth/auth';

export default function DashboardLinksNew() {
 const auth = useAuth()


  return (
    <>
      <div>
        {auth.user}
        <Greetings user={auth.user} />
        <ProfileCard />
        <Tools />
        <DashboardLinks />
      </div>
    </>
  );
}
