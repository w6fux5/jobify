import React, { useState } from 'react';
import { AreaChartComponent, BarChartComponent } from '../../components';
import Wrapper from '../../assets/wrappers/ChartsContainer';
import { useAppContext } from '../../context/AppContext';

const ChatContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart((prev) => !prev)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent data={monthlyApplications} />
      ) : (
        <AreaChartComponent data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChatContainer;
