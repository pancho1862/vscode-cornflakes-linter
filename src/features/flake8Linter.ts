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
			runTrigger: section.get<string>('linter.run', 'onType')
		}
	}

	public process(lines: string[]): Diagnostic[] {
		let diagnostics: Diagnostic[] = [];
		lines.forEach(function (line) {
			const regex = /^(.+):(\d+):(\d+):\ (\S+\d+):?\ (.+)$/gm;
			const matches = regex.exec(line);
			if (matches === null) {
				return;
			}
			diagnostics.push({
				range: new Range(parseInt(matches[2]) - 1, 0, parseInt(matches[2]) - 1, Number.MAX_VALUE),
				severity: DiagnosticSeverity.Information,
				message: matches[5],
				code: matches[4],
				source: 'cornflakes'
			});
		});
		return diagnostics;
	}
}