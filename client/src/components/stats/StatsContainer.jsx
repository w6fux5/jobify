import React from 'react';

import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import { useAppContext } from '../../context/AppContext';
import Wrapper from '../../assets/wrappers/StatsContainer';
import StatsItem from './StatsItem';

const StatsContainer = () => {
  const { stats } = useAppContext();

  console.log(stats);

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      backgroundColor: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647ecb',
      backgroundColor: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      backgroundColor: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((el) => (
        <StatsItem key={el.title} {...el} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
