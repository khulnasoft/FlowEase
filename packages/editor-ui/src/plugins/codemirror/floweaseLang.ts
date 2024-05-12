import { parserWithMetaData as floweaseParser } from '@flowease/codemirror-lang';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { javascriptLanguage } from '@codemirror/lang-javascript';

import { floweaseCompletionSources } from './completions/addCompletions';
import { autocompletion } from '@codemirror/autocomplete';

const floweaseParserWithNestedJsParser = floweaseParser.configure({
	wrap: parseMixed((node) => {
		if (node.type.isTop) return null;

		return node.name === 'Resolvable'
			? { parser: javascriptLanguage.parser, overlay: (node) => node.type.name === 'Resolvable' }
			: null;
	}),
});

const floweaseLanguage = LRLanguage.define({ parser: floweaseParserWithNestedJsParser });

export function floweaseLang() {
	return new LanguageSupport(floweaseLanguage, [
		floweaseLanguage.data.of({ closeBrackets: { brackets: ['{', '('] } }),
		...floweaseCompletionSources().map((source) => floweaseLanguage.data.of(source)),
	]);
}

export const floweaseAutocompletion = () =>
	autocompletion({ icons: false, aboveCursor: true, closeOnBlur: false });
