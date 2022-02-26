import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { StatsContainer, ChatContainer, Loading } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  console.log(monthlyApplications);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {!!monthlyApplications.length && <ChatContainer />}
    </>
  );
};

export default Stats;
