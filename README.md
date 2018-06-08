# Setting Toggle

A VS Code extension that lets you toggle a custom setting using a button or command.
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png"/>

## Requirements

- To toggle the setting, the setting must be in the user settings already, with the correct formatting, eg.
``` JSON
    "editor.codeLens": false,
```
- To toggle a custom setting, the name of the custom setting must be in the user settings, with the correct formatting, eg.
``` JSON
    "setting-toggle.setting": "editor.minimap.enabled",
    "editor.minimap.enabled": false,
```


## Settings

- `setting-toggle.setting`: The title of the toggled setting. Default is "editor.codeLens".
- `setting-toggle.icon.enabled`: Show or hide the button.

## Known Issues

- Changes to user settings must be saved before the setting is toggled using this extension.

- Extension does not automatically add new settings to user settings.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of Setting Toggle

---