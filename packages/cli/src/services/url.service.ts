import { Service } from 'typedi';
import config from '@/config';

@Service()
export class UrlService {
	/** Returns the base URL flowease is reachable from */
	readonly baseUrl: string;

	constructor() {
		this.baseUrl = this.generateBaseUrl();
	}

	/** Returns the base URL of the webhooks */
	getWebhookBaseUrl() {
		let urlBaseWebhook = process.env.WEBHOOK_URL ?? this.baseUrl;
		if (!urlBaseWebhook.endsWith('/')) {
			urlBaseWebhook += '/';
		}
		return urlBaseWebhook;
	}

	/** Return the flowease instance base URL without trailing slash */
	getInstanceBaseUrl(): string {
		const floweaseBaseUrl = config.getEnv('editorBaseUrl') || this.getWebhookBaseUrl();

		return floweaseBaseUrl.endsWith('/') ? floweaseBaseUrl.slice(0, floweaseBaseUrl.length - 1) : floweaseBaseUrl;
	}

	private generateBaseUrl(): string {
		const protocol = config.getEnv('protocol');
		const host = config.getEnv('host');
		const port = config.getEnv('port');
		const path = config.getEnv('path');

		if ((protocol === 'http' && port === 80) || (protocol === 'https' && port === 443)) {
			return `${protocol}://${host}${path}`;
		}
		return `${protocol}://${host}:${port}${path}`;
	}
}
