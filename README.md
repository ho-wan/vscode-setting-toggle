# Setting Toggle

VS Code extension that lets you toggle a custom setting using a button or command.

---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png"/>

---
## Requirements

- To toggle the setting, the setting must be a boolean with the correct formatting. eg.
``` JSON
    "editor.codeLens": false,
```
- To toggle a custom setting, set **"setting-toggle.setting:"** to the name of the custom setting in the user settings, with the correct formatting. eg.
``` JSON
    "setting-toggle.setting": "editor.minimap.enabled",
    "editor.minimap.enabled": false,
```
- Can only save one setting to toggle at a time.

---
## Settings

- `setting-toggle.setting`: The title of the toggled setting. Default is "editor.codeLens".
- `setting-toggle.icon.enabled`: Show or hide the button icon. Default is on.

---
## Known Issues

- Changes to user settings must be saved before the setting is toggled using this extension, cannot write over a dirty settings.json file.

- Settings.json must have the correct format with the right whitespace.

---
## Release Notes

## [0.1.0]
- Specified setting now added to settings.json if not already in user settings.

---