import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { useStore } from './Store';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const { searchCache, searchPath, favorites, toggleFavorite, search } = useStore();
  const items = searchCache.get(searchPath);

  useEffect(() => search(), [search]);

  return (
    <ul>
      {items?.length === 0 && (
        <div className='p-10 text-xl text-center text-yellow-600'>no results</div>
      )}
      {items?.map(entity => {
        const entityId = entity.url.replace(API_URL, '');
        const isFavorite = favorites.includes(entityId);
        return (
          <li
            key={entity.url}
            className={`
              flex row rounded-lg border p-4 mb-2 items-center justify-between
              last:mb:0 cursor-pointer hover:bg-slate-100
            `}
            onClick={() => navigate(entityId)}
          >
            {entity.name}
            <button
              type='button'
              title={(isFavorite ? 'Remove' : 'Add') + ' favorite'}
              onClick={event => {
                event.stopPropagation();
                toggleFavorite(entityId);
              }}
            >
              {isFavorite && (
                <StarIconSolid className='w-6 h-6 hover:text-slate-400 text-yellow-500' />
              )}
              {!isFavorite && (
                <StarIconOutline className='w-6 h-6 text-slate-400 hover:text-yellow-500' />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(SearchResults);
