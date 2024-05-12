import type { EndpointHandler, Endpoint } from '@jsplumb/core';
import { EndpointRepresentation } from '@jsplumb/core';
import type { AnchorPlacement, EndpointRepresentationParams } from '@jsplumb/common';
import { EVENT_ENDPOINT_CLICK } from '@jsplumb/browser-ui';

export type ComputedFloweaseAddInputEndpoint = [number, number, number, number, number];
interface FloweaseAddInputEndpointParams extends EndpointRepresentationParams {
	endpoint: Endpoint;
	width: number;
	height: number;
	color: string;
	multiple: boolean;
}
export const FloweaseAddInputEndpointType = 'FloweaseAddInput';
export const EVENT_ADD_INPUT_ENDPOINT_CLICK = 'eventAddInputEndpointClick';
export class FloweaseAddInputEndpoint extends EndpointRepresentation<ComputedFloweaseAddInputEndpoint> {
	params: FloweaseAddInputEndpointParams;

	constructor(endpoint: Endpoint, params: FloweaseAddInputEndpointParams) {
		super(endpoint, params);

		this.params = params;
		this.params.width = params.width || 18;
		this.params.height = params.height || 48;
		this.params.color = params.color || '--color-foreground-xdark';
		this.params.multiple = params.multiple || false;

		this.unbindEvents();
		this.bindEvents();
	}

	static type = FloweaseAddInputEndpointType;

	type = FloweaseAddInputEndpoint.type;

	bindEvents() {
		this.instance.bind(EVENT_ENDPOINT_CLICK, this.fireClickEvent);
	}

	unbindEvents() {
		this.instance.unbind(EVENT_ENDPOINT_CLICK, this.fireClickEvent);
	}

	setError() {
		this.endpoint.addClass('add-input-endpoint-error');
	}

	resetError() {
		this.endpoint.removeClass('add-input-endpoint-error');
	}

	fireClickEvent = (endpoint: Endpoint) => {
		if (endpoint === this.endpoint) {
			this.instance.fire(EVENT_ADD_INPUT_ENDPOINT_CLICK, this.endpoint);
		}
	};
}

export const FloweaseAddInputEndpointHandler: EndpointHandler<
	FloweaseAddInputEndpoint,
	ComputedFloweaseAddInputEndpoint
> = {
	type: FloweaseAddInputEndpoint.type,
	cls: FloweaseAddInputEndpoint,
	compute: (
		ep: FloweaseAddInputEndpoint,
		anchorPoint: AnchorPlacement,
	): ComputedFloweaseAddInputEndpoint => {
		const x = anchorPoint.curX - ep.params.width / 2;
		const y = anchorPoint.curY - ep.params.width / 2;
		const w = ep.params.width;
		const h = ep.params.height;

		ep.x = x;
		ep.y = y;
		ep.w = w;
		ep.h = h;

		ep.addClass('add-input-endpoint');
		if (ep.params.multiple) {
			ep.addClass('add-input-endpoint-multiple');
		}
		return [x, y, w, h, ep.params.width];
	},

	getParams: (ep: FloweaseAddInputEndpoint): FloweaseAddInputEndpointParams => {
		return ep.params;
	},
};
