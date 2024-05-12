import { Container } from 'typedi';
import { mock } from 'jest-mock-extended';
import type { DeepPartial } from 'ts-essentials';
import { DataSource, EntityManager, type EntityMetadata } from '@flowease/typeorm';
import type { Class } from 'flowease-core';

export const mockInstance = <T>(
	serviceClass: Class<T>,
	data: DeepPartial<T> | undefined = undefined,
) => {
	const instance = mock<T>(data);
	Container.set(serviceClass, instance);
	return instance;
};

export const mockEntityManager = (entityClass: Class) => {
	const entityManager = mockInstance(EntityManager);
	const dataSource = mockInstance(DataSource, {
		manager: entityManager,
		getMetadata: () => mock<EntityMetadata>({ target: entityClass }),
	});
	Object.assign(entityManager, { connection: dataSource });
	return entityManager;
};
