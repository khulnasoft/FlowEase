# flowease Expression language support

## Usage

```js
import { parserWithMetaData as floweaseParser } from '@flowease/codemirror-lang';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { parser as jsParser } from '@lezer/javascript';

const floweasePlusJsParser = floweaseParser.configure({
	wrap: parseMixed((node) => {
		if (node.type.isTop) return null;

		return node.name === 'Resolvable'
			? { parser: jsParser, overlay: (node) => node.type.name === 'Resolvable' }
			: null;
	}),
});

const floweaseLanguage = LRLanguage.define({ parser: floweasePlusJsParser });

export function floweaseExpressionLanguageSupport() {
	return new LanguageSupport(floweaseLanguage);
}
```
