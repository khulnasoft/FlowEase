import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';

process.env.FLOWEASE_ENCRYPTION_KEY = 'test_key';

const baseDir = join(tmpdir(), 'flowease-tests/');
mkdirSync(baseDir, { recursive: true });

const testDir = mkdtempSync(baseDir);
mkdirSync(join(testDir, '.flowease'));
process.env.FLOWEASE_USER_FOLDER = testDir;

writeFileSync(
	join(testDir, '.flowease/config'),
	JSON.stringify({ encryptionKey: 'test_key', instanceId: '123' }),
	'utf-8',
);
