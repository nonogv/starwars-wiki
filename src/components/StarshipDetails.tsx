import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from './Store';
import { useParams } from 'react-router-dom';
import ToggleFavoriteButton from './ToggleFavoriteButton';
import LoadingState from './LoadingState';
import BreadCrumb from './BreadCrumb';
import { EntityTypes } from '../constants';
import { Starship } from '../types';

const StarshipDetails: React.FC = () => {
  const { starshipId } = useParams<{ starshipId: string}>();
  const { getEntity, setError } = useStore();
  const entityId = EntityTypes.Starships + starshipId + '/';
  const entity = getEntity(entityId) as Starship;

  if (!entity) {
    return <LoadingState />;
  }

  if (!entity.manufacturer) {
    setError('There was an error fetching the requested starship details');
    return null;
  }

  return (
    <>
      <BreadCrumb />
      <div className='text-2xl font-semibold'>
        {entity?.starship_class}: {entity?.name}
      </div>
      <div className='text-xl mt-2 mb-8'>
        {entity?.manufacturer}, {entity?.model}.
      </div>
      {!!starshipId && <ToggleFavoriteButton entityId={entityId} />}
    </>
  );
};

export default observer(StarshipDetails);
