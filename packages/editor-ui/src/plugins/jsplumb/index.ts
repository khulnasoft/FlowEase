import type { Plugin } from 'vue';
import { FloweasePlusEndpointHandler } from '@/plugins/jsplumb/FloweasePlusEndpointType';
import * as FloweasePlusEndpointRenderer from '@/plugins/jsplumb/FloweasePlusEndpointRenderer';
import { FloweaseConnector } from '@/plugins/connectors/FloweaseCustomConnector';
import * as FloweaseAddInputEndpointRenderer from '@/plugins/jsplumb/FloweaseAddInputEndpointRenderer';
import { FloweaseAddInputEndpointHandler } from '@/plugins/jsplumb/FloweaseAddInputEndpointType';
import { Connectors, EndpointFactory } from '@jsplumb/core';

export const JsPlumbPlugin: Plugin<{}> = {
	install: () => {
		Connectors.register(FloweaseConnector.type, FloweaseConnector);

		FloweasePlusEndpointRenderer.register();
		EndpointFactory.registerHandler(FloweasePlusEndpointHandler);

		FloweaseAddInputEndpointRenderer.register();
		EndpointFactory.registerHandler(FloweaseAddInputEndpointHandler);
	},
};
