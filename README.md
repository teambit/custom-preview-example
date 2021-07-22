# custom-preview-example

a workspace showcasing a custom preview aspect

# setup

- `bit install`
- `bit compile`
- make sure there are no errors using `bit status`
- `bit start` (add `--dev` when editing the custom extension)

# to tackle

- types for `AbstractVinyl` (currently getting them from `@teambit/legacy/dist/consumer/component/sources`)
- using the custom preview in the remote scope
- sometimes getting `cannot read .postMessage of undefine` error

# Tips

- Only React components can hot reload correctly. You might have to restart server to see changes
