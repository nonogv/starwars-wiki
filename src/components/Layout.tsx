import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../Store';
import TopBar from './TopBar';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const Layout: React.FC = () =>{
  const { error, isLoading } = useStore();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className='p-8'>
      <TopBar />
      {isLoading && <LoadingState />}
      <Outlet />
    </div>
  );
}

export default observer(Layout);
