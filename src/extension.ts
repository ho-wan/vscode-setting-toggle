"use strict";

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

const settingsPath = getSettingsPath();

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);

  let disposable = vscode.commands.registerCommand("extension.toggle", () => {
    const settingTitle = vscode.workspace.getConfiguration("", null).get("setting-toggle.setting");
    fs.readFile(settingsPath, "utf8", function(err, userSettings) {
      if (err) {
        vscode.window.showErrorMessage("Error: unable to read settings. " + err);
      }

      const newSettings = toggleSetting(userSettings, settingTitle.toString());
      fs.writeFile(settingsPath, newSettings, function(err) {
        if (err) {
          vscode.window.showErrorMessage("Error: unable to write settings. " + err);
        }
      });
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function toggleSetting(userSettings: string, settingTitle: string) {
  try {
    const state = vscode.workspace.getConfiguration("", null).get(settingTitle);
    if (typeof state !== "boolean") {
      vscode.window.showErrorMessage(`Error: ${settingTitle} is not a boolean`);
      return userSettings;
    }

    const newState: boolean = !state;
    const settingString: string = `"${settingTitle}": ${state}`;
    const newSetting: string = `"${settingTitle}": ${newState}`;
    const correctSettingUsage: string = `"setting-toggle.setting": "${settingTitle}"`;
    if (userSettings.match(settingString)) {
      // find and toggle setting using string replace
      const settings = userSettings.replace(settingString, newSetting);
      vscode.window.setStatusBarMessage(`${settingTitle} is now ${newState}`);
      return settings;
    } else if (userSettings.match(settingTitle + ":") && !userSettings.match(correctSettingUsage)) {
      // if setting title found but not full string, then format is likely incorrect, return original settings
      vscode.window.showErrorMessage("Error: please check setting formatting.");
      return userSettings;
    } else if (userSettings.match(correctSettingUsage) || !userSettings.match(`"${settingTitle}":`)) {
      // only add setting if not already in
      if (!userSettings.match(`"${settingTitle}":`)) {
        // regex to match { followed by any character not " or /
        const jsonStart = /^{[^\/"]*/;
        const settingStart = userSettings.match(jsonStart);
        if (settingStart) {
          // add setting to user settings and return
          const settingStartString = settingStart.toString() + newSetting + ", \n    ";
          const settingAdded = userSettings.replace(jsonStart, settingStartString);
          return settingAdded;
        } else {
          // else formatting error, return original settings
          vscode.window.showErrorMessage(`Error: please add "${settingString}" to your settings.`);
          return userSettings;
        }
      } else {
        // setting is already in user settings but not correct format
        vscode.window.showErrorMessage("Error: incorrect formatting.");
        return userSettings;
      }
    } else {
      // else unkonwn error, return original settings
      vscode.window.showErrorMessage(`Error: unknown reason. Please check your settings.`);
      return userSettings;
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error caught: " + err);
    return userSettings;
  }
}

// get the PATH of settings.json (check Stable or Insiders build?)
function getSettingsPath() {
  let settingsFile;
  let settingsData;
  // var settingsData = process.env.HOME + '/Library/Application Support';
  settingsData =
    process.env.APPDATA ||
    (process.platform == "darwin" ? process.env.HOME + "/Library/Application Support" : "/var/local");
  if (process.execPath.match(/insiders/gi)) {
    settingsFile = path.join(settingsData, "Code - Insiders/User/settings.json");
  } else {
    settingsFile = path.join(settingsData, "Code/User/settings.json");
  }
  // console.log("settingsFile =", settingsFile);

  // Workaround for Linux
  if (process.platform == "linux") {
    let os = require("os");
    settingsData = path.join(os.homedir(), ".config/");
    if (process.execPath.match(/insiders/gi)) {
      settingsFile = path.join(settingsData, "Code - Insiders/User/settings.json");
    } else {
      settingsFile = path.join(settingsData, "Code/User/settings.json");
    }
  }
  return settingsFile;
}
