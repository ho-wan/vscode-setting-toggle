"use strict";

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

const settingsPath = getSettingsPath();

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);

  let disposable = vscode.commands.registerCommand("extension.toggle", () => {

    let settingToToggle = vscode.workspace.getConfiguration('',null).get("setting-toggle.setting");
    fs.readFile(settingsPath, "utf8", function(err, userSettings) {
      if (err) {
        vscode.window.showErrorMessage("Error: unable to read settings.");
      }

      let newSettings = toggleSetting(userSettings, settingToToggle.toString());
      fs.writeFile(settingsPath, newSettings, function(err) {
        if (err) {
          vscode.window.showErrorMessage("Error: unable to write settings.");
        }
      });

    });

  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function toggleSetting(userSettings: string, settingTitle: string) {
  try {
    let state = vscode.workspace.getConfiguration('',null).get(settingTitle);
    if (typeof(state) !== "boolean") {
      vscode.window.showErrorMessage(`Error: ${settingTitle} is not a boolean`);
      return userSettings;
    }
    let newState = !state;

    if (userSettings.match(settingTitle)) {
      let settings = userSettings.replace(`"${settingTitle}": ${state}`, `"${settingTitle}": ${newState}`);
      vscode.window.setStatusBarMessage(`${settingTitle} is now ${newState}`);
      return settings;
    } else {
      vscode.window.setStatusBarMessage(`${settingTitle} not found`);
      return userSettings;
    }
  }
  catch (err) {
    vscode.window.showErrorMessage(err);
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
