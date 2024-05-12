import 'reflect-metadata';

jest.mock('@sentry/node');
jest.mock('@flowease_io/license-sdk');
jest.mock('@/telemetry');
jest.mock('@/eventbus/MessageEventBus/MessageEventBus');
jest.mock('@/push');
