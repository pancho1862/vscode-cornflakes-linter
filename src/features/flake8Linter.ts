'use strict';

import { workspace, Disposable, Diagnostic, DiagnosticSeverity, Range } from 'vscode';

import { LintingProvider, LinterConfiguration, Linter } from './utils/lintingProvider';

export default class Flake8LintingProvider implements Linter {

	public languageId = 'python';
	public settingsSection = 'cornflakes'

	public activate(subscriptions: Disposable[]) {
		let provider = new LintingProvider(this);
		provider.activate(subscriptions)
	}

	public loadConfiguration(): LinterConfiguration {
		let section = workspace.getConfiguration(this.settingsSection);
		if (!section) return;

		return {
			executable: section.get<string>('linter.executablePath', 'flake8'),
			fileArgs: [],
			bufferArgs: [],
			extraArgs: [],
			runTrigger: section.get<string>('linter.run', 'onSave')
		}
	}

	public process(lines: string[], filePath: string): Diagnostic[] {
		let diagnostics: Diagnostic[] = [];
		let violations: number = 0;

		const regex = /^(.+):(\d+):(\d+):\ (\S+\d+):?\ (.+)$/gm;
		const filePathRegex = new RegExp(filePath);
		const violationsRegex = /Found a total of \d+ violations and reported (\d+)$/gm;

		lines.forEach(line => {
			const matches = violationsRegex.exec(line);
			violationsRegex.lastIndex = 0;

			if (matches !== null) {
				violations = parseInt(matches[1]);
				return true;
			}

		});

		if (violations === 0) {
			diagnostics = [];
			return diagnostics;
		}

		lines.forEach(line => {
			const matches = regex.exec(line);
			regex.lastIndex = 0;

			// No errors found so return an empty list.
			if (matches === null) {
				return;
			}

			// Check that the the error is actually for the file we are 
			// processing.
			if (matches[1].match(filePathRegex)) {
				diagnostics.push({
					range: new Range(parseInt(matches[2]) - 1, 0, parseInt(matches[2]) - 1, Number.MAX_VALUE),
					severity: DiagnosticSeverity.Information,
					message: matches[5],
					code: matches[4],
					source: 'cornflakes'
				});
			}
		});
		return diagnostics;
	}
}