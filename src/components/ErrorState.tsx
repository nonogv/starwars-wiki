import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './Store';

const ErrorState: React.FC<{ error: string }> = ({ error }) => {
  const navigate = useNavigate()
  const { setError } = useStore();

  return (
    <div className='p-8'>
      <div className='text-red-600 font-semibold text-lg mb-4'>
        There was an error: {error}
      </div>
      <button
        type='button'
        className='p-2 border bg-slate-50 hover:bg-slate-100 rounded-lg'
        onClick={() => {
          setError(undefined);
          navigate('/');
        }}
      >Back to home page</button>
    </div>
  )
};

export default observer(ErrorState);
