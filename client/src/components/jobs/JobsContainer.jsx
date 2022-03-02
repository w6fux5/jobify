import React, { useEffect } from 'react';
import { Loading, Job } from '../../components';
import { useAppContext } from '../../context/AppContext';
import Wrapper from '../../assets/wrappers/JobsContainer';

const JobsContainer = () => {
  const {
    getAllJobs,
    jobs,
    totalJobs,
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (!jobs.length) {
    return (
      <Wrapper>
        <h2>No Jobs.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && 's'} Found
      </h5>

      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
