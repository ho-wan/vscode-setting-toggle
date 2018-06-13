# Change Log
All notable changes to the "setting-toggle" extension will be documented in this file.

## [1.2.2 ] (13 June 2018)
- getPath method moved to UserDataPath class. Code refactored.

## [1.2.1 ] (13 June 2018)
- Add environment tests to extension.test.ts.
- settings.json path updated and should now work on Mac and Linux (if not, let me know in repository.)
- Main command renamed to Setting Toggle Primary (for easier ctrl+p searching)

## [1.2.0 ] (12 June 2018)
- Now non-boolean settings can be toggled between preset values.
- Gifs demonstrating int and string toggling added.

## [1.1.1 ] (11 June 2018)
- Minor amendments to readme.

## [1.1.0 ] (11 June 2018)
- Now supports up to 3 settings from commands (1 from button).
- "setting-toggle.setting" changed to "toggle.setting.title".

## [1.0.1 ] (09 June 2018)
- Gifs added to readme.

## [1.0.0] (09 June 2018)
- Now matches incorrect formatting uses regex and applies correct formatting to user settings.
- Provides warning message if setting is found but commented out.
- Error messages and routes improved.

## [0.1.0] (09 June 2018)
- Specified setting now added to settings.json if not already in user settings.

## [0.0.2] (08 June 2018)
- Additional info in readme. Minor refactoring of variable types and error messages.

## [0.0.1]  (08 June 2018)
- Initial release
