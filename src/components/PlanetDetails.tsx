import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from './Store';
import { useParams } from 'react-router-dom';
import ToggleFavoriteButton from './ToggleFavoriteButton';
import LoadingState from './LoadingState';
import BreadCrumb from './BreadCrumb';
import { EntityTypes } from '../constants';
import { Planet } from '../types';

const PlanetDetails: React.FC = () => {
  const { planetId } = useParams<{ planetId: string}>();
  const { getEntity, setError } = useStore();
  const entityId = EntityTypes.Planets + planetId + '/';
  const entity = getEntity(entityId) as Planet;

  if (!entity) {
    return <LoadingState />;
  }

  if (!entity.climate) {
    setError('There was an error fetching the requested planet details');
    return null;
  }

  return (
    <>
      <BreadCrumb />
      <div className='text-2xl font-semibold'>
        {entity?.name}
      </div>
      <div className='text-xl mt-2 mb-8'>
        {entity?.terrain}, {entity?.climate} climate.
      </div>
      {!!planetId && <ToggleFavoriteButton entityId={entityId} />}
    </>
  );
};

export default observer(PlanetDetails);
