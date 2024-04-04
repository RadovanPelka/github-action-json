github-action-json
===

[![CI](https://github.com/RadovanPelka/github-action-json/actions/workflows/ci.yml/badge.svg)](https://github.com/RadovanPelka/github-action-json/actions/workflows/ci.yml)

Edit or Read the content of any json file or the `package.json` that you want.

## Inputs
`with:`
- `path` (Optional) The path of the `package.json` file.  Default: `package.json`
- `replaceWith` (Optional) json data for changing for example the `package.json`.  Default: `{}`. If a key exists in both objects and both values are objects, the two values will be recursively merged otherwise the value from the second object will be used.


## Example Usage
`Getter`

```yaml
- name: Get values from the package.json
  id: packageJson
  uses: RadovanPelka/github-action-json@main
  with:
    path: "package.json" # default value

- run: echo "name - ${{ steps.packageJson.outputs.name }}"
- run: echo "version - ${{ steps.packageJson.outputs.version }}"
- run: echo "author - ${{ steps.packageJson.outputs.author }}"
```

`Setter & Getter`

```yaml
- name: Set and Get values from the package.json
  id: packageJson
  uses: RadovanPelka/github-action-json@main
  with:
    path: "package.json" # default value
    replaceWith: |
      {
        "engines": { "node": "20" }
        "version": 10
      }

- run: echo "version - ${{ steps.packageJson.outputs.version }}"
- run: echo "engines - ${{ steps.packageJson.outputs.engines }}"
```

### Output Parameters

- `steps.packageJson.outputs.[YOUR_JSON_KEY]` Value by key.

Example for the `package.json`

- `steps.packageJson.outputs.name` The name of the package.
- `steps.packageJson.outputs.description` This helps people discover your package, as it's listed in 'npm search'.

## Author

👤 **Radovan Pelka**

- Twitter: [@PelkaRadovan](https://twitter.com/PelkaRadovan)
- Github: [@RadovanPelka](https://github.com/RadovanPelka)

## License

Licensed under the MIT License.
