import { existsSync } from 'fs';
import { mkdir, utimes, open, rm } from 'fs/promises';
import { join, dirname } from 'path';
import { Container } from 'typedi';
import { InstanceSettings } from 'flowease-core';
import { sleep } from 'flowease-workflow';
import { inProduction } from '@/constants';
import { Logger } from '@/Logger';

export const touchFile = async (filePath: string): Promise<void> => {
	await mkdir(dirname(filePath), { recursive: true });
	const time = new Date();
	try {
		await utimes(filePath, time, time);
	} catch {
		const fd = await open(filePath, 'w');
		await fd.close();
	}
};

const { floweaseFolder } = Container.get(InstanceSettings);
const journalFile = join(floweaseFolder, 'crash.journal');

export const init = async () => {
	if (!inProduction) return;

	if (existsSync(journalFile)) {
		// Crash detected
		Container.get(Logger).error('Last session crashed');
		// add a 10 seconds pause to slow down crash-looping
		await sleep(10_000);
	}
	await touchFile(journalFile);
};

export const cleanup = async () => {
	await rm(journalFile, { force: true });
};
