import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/solid';

const BreadCrumb: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-slate-50 p-1 rounded-lg mb-8'>
      <button
        type='button'
        className='text-sm text-slate-400 hover:text-slate-600 flex row items-center'
        onClick={() => {
          navigate('/');
        }}
      >
        <ChevronLeftIcon className='h-6 w-6' />
        Back to search results
      </button>
    </div>
  )
};
export default BreadCrumb;
