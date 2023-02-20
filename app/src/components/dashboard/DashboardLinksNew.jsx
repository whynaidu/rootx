import React from 'react'
import ProfileCard from './ProfileCard';
import Tools from './Tools';
import DashboardLinks from './DashboardLinks'
import Greetings from './Greetings';

export default function DashboardLinksNew() {
  return (
    <div>
      <Greetings/>
      <ProfileCard />
      <Tools />
      <DashboardLinks />
    </div>
  );
}
