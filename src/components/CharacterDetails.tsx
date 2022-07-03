import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useStore } from './Store';
import { Menu } from '@headlessui/react';
import ToggleFavoriteButton from './ToggleFavoriteButton';
import LoadingState from './LoadingState';
import BreadCrumb from './BreadCrumb';
import { API_URL, EntityTypes } from '../constants';
import { Character } from '../types';

const CharacterDetails: React.FC = () => {
  const navigate = useNavigate();
  const { characterId } = useParams<{ characterId: string}>();
  const { getEntity, setError } = useStore();
  const entityId = EntityTypes.People + characterId + '/';
  const entity = getEntity(entityId) as Character;

  if (!entity) {
    return <LoadingState />;
  }

  if (!entity.birth_year) {
    setError('There was an error fetching the requested character details');
    return null;
  }

  return (
    <>
      <BreadCrumb />
      <div className='mb-8'>
        <div className='text-2xl font-semibold'>
          {entity?.name}
        </div>
        <div className='text-xl mt-2'>
          Born on {entity?.birth_year}, {entity?.eye_color} eyes.
        </div>
      </div>
      <div className='flex row'>
        {!!characterId && <ToggleFavoriteButton entityId={entityId} />}
        <button
          className='mx-4 p-2 border bg-slate-50 hover:bg-slate-100 rounded-lg flex row'
          onClick={() => navigate(entity?.homeworld.replace(API_URL, '/'))}
        >
          Visit homeworld
        </button>
        {!!entity?.starships.length && (
          <Menu as='div' className='relative overflow-visible'>
            <Menu.Button className='capitalize p-2 pr-1 border bg-slate-50 hover:bg-slate-100 rounded-lg flex row items-center'>
              Starships
              <ChevronDownIcon className='w-4 h-4 ml-1' />
            </Menu.Button>
            <Menu.Items className="absolute w-24 border mt-1 overflow-hidden rounded-lg shadow-lg bg-white">
              {entity?.starships.map((url, index) => (
                <Menu.Item key={url}>
                  <div
                    className='p-2 cursor-pointer hover:bg-slate-50 border-b'
                    onClick={() => navigate(url.replace(API_URL, '/'))}
                  >Starship {index + 1}</div>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        )}
      </div>
    </>
  );
};

export default observer(CharacterDetails);
