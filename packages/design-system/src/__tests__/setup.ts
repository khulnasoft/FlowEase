import '@testing-library/jest-dom';
import { config } from '@vue/test-utils';
import { FloweasePlugin } from '@/plugin';

config.global.plugins = [FloweasePlugin];
