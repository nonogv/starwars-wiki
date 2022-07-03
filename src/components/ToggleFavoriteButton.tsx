import React from "react";
import { useStore } from "./Store";
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { observer } from "mobx-react-lite";

const ToggleFavoriteButton: React.FC<{ entityId: string}> = ({ entityId }) => {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(entityId);

  return (
    <button
      type='button'
      className='p-2 border bg-slate-50 hover:bg-slate-100 rounded-lg flex row'
      onClick={event => {
        event.stopPropagation();
        toggleFavorite(entityId);
      }}
      >
      {isFavorite && (
        <StarIconSolid className='mr-1 w-6 h-6 hover:text-slate-400 text-yellow-500' />
      )}
      {!isFavorite && (
        <StarIconOutline className='mr-1 w-6 h-6 text-slate-400 hover:text-yellow-500' />
      )}
      {(isFavorite ? 'Remove' : 'Add') + ' favorite'}
    </button>
  )
};

export default observer(ToggleFavoriteButton);
