# Readme

"cornflakes-linter" is a wrapper for `flake8`.

vscode currently already has flake8 integration HOWEVER it doesn't play nicely with flake8 plugins in that the regex can't parse the output correctly. This means that the errors/warnings/information do not show up in the problems tab. This extension rectifies this.

it is expected that flake8 is installed and already added to the path. If it is installed but cannot be found, add the path to your preferences (settings.json) as seen below.

```json
{
	"cornflakes.linter.executablePath": "path/to/flake8"
}
```

## Acknowledgements

The extension architecture is based off of the PHPValidationProvider from the built-in [php extension](https://github.com/Microsoft/vscode/tree/master/extensions/php).

And is virtually a direct copy of [ruby-linter](https://github.com/hoovercj/vscode-ruby-linter)
