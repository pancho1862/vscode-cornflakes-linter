import * as vscode from 'vscode';

import Flake8LintingProvider from './features/flake8Linter';

export function activate(context: vscode.ExtensionContext) {
	let linter = new Flake8LintingProvider();
	linter.activate(context.subscriptions);
}
