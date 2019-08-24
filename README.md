# Readme

"cornflakes-linter" is a wrapper for `flake8`.

** fixed windows pathing issue in the latest release (0.4) **

vscode currently already has flake8 integration HOWEVER it doesn't play nicely with
flake8 plugins in that the regex can't parse the output correctly. This means that the
errors/warnings/information do not show up in the problems tab. This extension rectifies
this.

## Configuration

You need to include the full path to the flake8 executable that you wish to use. this
means that if you are in a virtual environment you need the _path to that particular
flake8_ i.e.

```json
{
	"cornflakes.linter.executablePath": "path/to/venvs/myvenv/bin/flake8"
}
```

## Acknowledgements

And is virtually a direct copy of [ruby-linter](https://github.com/hoovercj/vscode-ruby-linter).

The extension architecture is based off of the PHPValidationProvider from the built-in [php extension](https://github.com/Microsoft/vscode/tree/master/extensions/php).
