import React from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useStore } from '../Store';
import { API_URL, EntityTypes } from '../constants';
import { EntityType } from '../types';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
    entityType,
    setEntityType,
    setSearchTerm,
    search,
    favoriteEntities,
  } = useStore();
  const entityTypeTitle = entityType.replace('/', '');

  const onEntityTypeChange = (value: EntityType) => {
    setEntityType(value);
    search();
    navigate('/');
  };

  const onSearchTermChange = ({
    currentTarget: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    debounce(search, 100)();
    navigate('/');
  };

  return (
    <div className='mb-8 flex justify-items-stretch'>
      <Menu as='div' className='relative overflow-visible'>
        <Menu.Button className='capitalize p-2 pr-1 border bg-slate-50 hover:bg-slate-100 rounded-lg flex row items-center mr-4'>
          {entityTypeTitle}
          <ChevronDownIcon className='w-4 h-4 ml-1' />
        </Menu.Button>
        <Menu.Items className="absolute w-24 border mt-1 overflow-hidden rounded-lg shadow-lg bg-white">
          <Menu.Item>
            <div
              className='p-2 cursor-pointer hover:bg-slate-50 border-b'
              onClick={() => onEntityTypeChange(EntityTypes.People)}
            >People</div>
          </Menu.Item>
          <Menu.Item>
            <div
              className='p-2 cursor-pointer hover:bg-slate-50 border-b'
              onClick={() => onEntityTypeChange(EntityTypes.Planets)}
            >Planets</div>
          </Menu.Item>
          <Menu.Item>
            <div
              className='p-2 cursor-pointer hover:bg-slate-50'
              onClick={() => onEntityTypeChange(EntityTypes.Starships)}
            >Starships</div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <input
        type='text'
        className='border p-2 rounded-lg flex-1 mr-4'
        value={searchTerm}
        placeholder={'type something to search for ' + entityTypeTitle}
        onChange={onSearchTermChange}
      />
      <Menu as='div' className='relative overflow-visible'>
        <Menu.Button className='p-2 border bg-slate-50 hover:bg-slate-100 rounded-lg flex row items-center'>
          Favorites
          <ChevronDownIcon className='w-4 h-4 ml-1' />
        </Menu.Button>
        <Menu.Items className="absolute w-56 border right-0 mt-1 overflow-hidden rounded-lg shadow-lg bg-white">
          {!favoriteEntities.length && (<Menu.Item>
            <div className='p-2 text-slate-500 italic text-center'>No favorites added</div>
          </Menu.Item>)}
          {favoriteEntities.map(favorite => (
            <Menu.Item key={favorite.url}>
              <div
                className='p-2 cursor-pointer hover:bg-slate-50 border-b last:border-b-0'
                onClick={() => navigate(favorite.url.replace(API_URL, ''))}
              >
                {favorite.name}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default observer(TopBar);
