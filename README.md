# Setting Toggle

## Easily toggle any VS code setting at the **click of a button**!

This extension lets you toggle any custom boolean setting using the command or button by editing the settings.json file.

Now you can quickly toggle codeLens, minimap, word-wrap, or whatever setting you want without having to remember the key binding ;).

---
<img src="https://raw.githubusercontent.com/Ho-Wan/vscode-setting-toggle/master/images/setting-toggle-img1.png"/>

---
## Requirements

- The toggled setting must be a boolean. codeLens is toggled by default.
``` JSON
    "editor.codeLens": false,
```
- To toggle a custom setting, set **"setting-toggle.setting:"** to the name of the custom setting in the user settings. eg.
``` JSON
    "setting-toggle.setting": "editor.minimap.enabled",
    "editor.minimap.enabled": false,
```
- Can only save one setting to toggle at a time. (May add more if there is demand, leave a message in the repository.)

---
## Settings

- `setting-toggle.setting`: The title of the toggled setting. Default is "editor.codeLens".
- `setting-toggle.icon.enabled`: Show or hide the button icon. Default is on.

---
## Known Issues

- Changes to user settings must be saved before the setting is toggled using this extension, cannot write over a dirty settings.json file.

---
## Release Notes

## [1.0.0]
- Now matches incorrect formatting uses regex and applies correct formatting to user settings.
- Provides warning message if setting is found but commented out.
- Error messages and routes improved.
---