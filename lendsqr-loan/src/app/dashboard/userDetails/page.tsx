import React from "react";
import StatsCard from '@/components/dashboard/StatsCard';
import UsersTable from "@/components/dashboard/UsersTable";
import type { User, } from "@/types/users";


const mockUsers: User[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive'
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby2@irorun.com',
    phoneNumber: '08160780928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending'
  },
  {
    id: '3',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted'
  },
  {
    id: '4',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07003309226',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Pending'
  },
  {
    id: '5',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active'
  },
  {
    id: '6',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '08060780900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active'
  },
  {
    id: '7',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted'
  },
  {
    id: '8',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '08060780900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Inactive'
  },
  {
    id: '9',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Inactive'
  }
];
const UserDetails = () => {
  

  return (
    <main>
      <h1>Users</h1>
      {/* Additional user details content can be added here */}
      <StatsCard/>
      <UsersTable users={mockUsers} />
    </main>
  );
};

export default UserDetails;
