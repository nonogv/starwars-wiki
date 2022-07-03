import React, { createContext, ReactNode, useContext } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import { EntityType, SearchResponse, StarWarsEntity } from './types';
import { API_URL, EntityTypes } from './constants';

class Store {
  isLoading = false;
  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };
  isLoadingEntity = false;
  setIsLoadingEntity = (value: boolean) => {
    this.isLoadingEntity = value;
  };
  error: string | undefined = undefined;
  setError = (value: string | undefined) => {
    this.error = value;
  };
  entityType: EntityType = EntityTypes.People;
  setEntityType = (value: EntityType) => {
    this.entityType = value;
  }
  searchTerm = '';
  setSearchTerm = (value: string) => {
    this.searchTerm = value;
  };
  searchCache: Map<string, StarWarsEntity[]> = new Map();
  setSearchCache = (value: Map<string, StarWarsEntity[]>) => {
    this.searchCache = value;
  };
  entities: Map<string, StarWarsEntity> = new Map();
  setEntity = (id: string, entity: StarWarsEntity) => {
    this.entities.set(id, entity);
  };
  setEntities = (value: Map<string, StarWarsEntity>) => {
    this.entities = value;
  };
  favorites: string[] = [];
  toggleFavorite = (entityId: string) => {
    if (this.favorites.includes(entityId)) {
      this.favorites = this.favorites.filter(id => id !== entityId);
    } else {
      this.favorites.push(entityId);
    }
  };

  get searchPath() {
    return this.entityType + (this.searchTerm && `?search=${this.searchTerm}`);
  }

  get favoriteEntities() {
    return [...this.entities.values()].filter(
      entity => this.favorites.includes(entity.url?.replace(API_URL, ''))
    );
  }

  constructor() {
    makeAutoObservable(this);
  }

  search = () => {
    if (!this.searchCache.has(this.searchPath) && !this.isLoading) {
      this.setIsLoading(true);
      const cache = toJS(this.searchCache);
      fetch(API_URL + this.searchPath)
        .then(response => response.json())
        .then(({ results }: SearchResponse) => {
          cache.set(this.searchPath, results.map(entity => {
            this.setEntity(entity.url.replace(API_URL, ''), entity);
            return entity;
          }));
          this.setIsLoading(false);
          this.setSearchCache(cache);
        })
        .catch(error => this.setError(error.message || error));
    }
  };

  getEntity = (id: string) => {
    if (!this.entities.has(id) && !this.isLoadingEntity) {
      this.setIsLoadingEntity(true);
      const entities = toJS(this.entities);
      fetch(API_URL + id)
        .then(response => {
          if (response.status !== 200) {
            const error = 'ERROR ' + response.status;
            this.setError(error);
            throw new Error(error);
          }
          return response.json();
        })
        .then((entity: StarWarsEntity) => {
          entities.set(id, entity);
          this.setEntities(entities);
          this.setIsLoadingEntity(false);
        })
        .catch(error => this.setError(error.message || error));
    }
    return this.entities.get(id);
  };
}

const StoreContext = createContext<Store | undefined>(undefined);

const store = new Store();

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
