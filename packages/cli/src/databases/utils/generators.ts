import { customAlphabet } from 'nanoid';
import type { FloweaseInstanceType } from '@/Interfaces';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16);

export function generateNanoId() {
	return nanoid();
}

export function generateHostInstanceId(instanceType: FloweaseInstanceType) {
	return `${instanceType}-${nanoid()}`;
}
