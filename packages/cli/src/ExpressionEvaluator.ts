import config from '@/config';
import { ErrorReporterProxy, ExpressionEvaluatorProxy } from 'flowease-workflow';

export const initExpressionEvaluator = () => {
	ExpressionEvaluatorProxy.setEvaluator(config.getEnv('expression.evaluator'));
	ExpressionEvaluatorProxy.setDifferEnabled(config.getEnv('expression.reportDifference'));
	ExpressionEvaluatorProxy.setDiffReporter((expr) => {
		ErrorReporterProxy.warn('Expression difference', {
			extra: {
				expression: expr,
			},
		});
	});
};
