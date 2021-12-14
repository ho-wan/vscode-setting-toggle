"use strict";

import * as vscode from "vscode";

// name of setting states and default values specified in package.json
const SettingState1: string = "toggle.settingState1";
const SettingState2: string = "toggle.settingState2";
const State1Default: string = "state1";
const State2Default: string = "state2";

type ToggleSetting = {
  title: string;
  command: string;
  statusBar: {
    item?: vscode.StatusBarItem;
    config: string;
    position: number;
    text: string;
    tooltip: string;
  };
};

let Setting: { [key: string]: ToggleSetting } = {
  primary: {
    title: "toggle.settingTitle",
    command: "extension.toggle",
    statusBar: {
      config: "toggle.showStatusbarPrimary",
      position: 3,
      text: "P",
      tooltip: "Setting Toggle - Primary Setting",
    },
  },
  s1: {
    title: "toggle.setting1Title",
    command: "extension.toggle_s1",
    statusBar: {
      config: "toggle.showStatusbarS1",
      position: 2,
      text: "S1",
      tooltip: "Setting Toggle - S1 Setting",
    },
  },
  s2: {
    title: "toggle.setting2Title",
    command: "extension.toggle_s2",
    statusBar: {
      config: "toggle.showStatusbarS2",
      position: 1,
      text: "S2",
      tooltip: "Setting Toggle - S2 Setting",
    },
  },
};

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);

  for (const [, setting] of Object.entries(Setting)) {
    setting.statusBar.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      setting.statusBar.position
    );
    setting.statusBar.item.text = setting.statusBar.text;
    setting.statusBar.item.tooltip = setting.statusBar.tooltip;
    setting.statusBar.item.command = setting.command;
    context.subscriptions.push(
      setting.statusBar.item,
      vscode.commands.registerCommand(setting.command, () => {
        toggleSetting(setting.title);
      })
    );
  }

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(showInStatusBar)
  );

  showInStatusBar();
}

function showInStatusBar() {
  const config = vscode.workspace.getConfiguration();

  for (const [, setting] of Object.entries(Setting)) {
    const settingTitle: string = config.get(setting.title);
    // shows in status bar if config is enabled and setting has been found
    if (config.get(setting.statusBar.config) && settingTitle) {
      // show (T) or (F) in status bar for boolean status
      let state = config.get(settingTitle);
      if (state != undefined && typeof state === "boolean") {
        if (state) {
          setting.statusBar.item.text = setting.statusBar.text + "(T)";
        } else {
          setting.statusBar.item.text = setting.statusBar.text + "(F)";
        }
      }
      setting.statusBar.item.show();
    } else {
      setting.statusBar.item.hide();
    }
  }
}

export function deactivate() {}

// Regex to match nested setting with parent setting in group 1
// and child setting in group 2
const reMatchNestedSetting = /^\[(.+)\](.*)$/;

function toggleSetting(toggleTitle: string) {
  try {
    let config = vscode.workspace.getConfiguration();
    let settingTitle: string = config.get(toggleTitle);
    let m = settingTitle.match(reMatchNestedSetting);
    if (m && m.length === 3) {
      let language = m[1];
      config = vscode.workspace.getConfiguration("", { languageId: language });
      settingTitle = m[2];
    }

    let state = config.get(settingTitle);
    if (state == undefined) {
      vscode.window.showErrorMessage(
        `Setting Toggle: "${settingTitle}" is not a valid setting.`
      );
      return;
    }

    if (typeof state === "boolean") {
      toggleBoolean(config, settingTitle, state);
    } else if (typeof state === "number" || typeof state === "string") {
      toggleCustom(config, settingTitle, state);
    } else {
      vscode.window.showErrorMessage(
        `Setting Toggle: "${settingTitle}" has invalid type: must be boolean, number or string to toggle.`
      );
    }
  } catch (err) {
    vscode.window.showErrorMessage("Setting Toggle: Error: " + err);
  }
}

async function toggleBoolean(
  config: vscode.WorkspaceConfiguration,
  settingTitle: string,
  oldState: boolean
) {
  const newState = !oldState;
  const isGlobalSetting = true;

  await config.update(settingTitle, newState, isGlobalSetting, true);
  vscode.window.showInformationMessage(
    `Setting Toggle: Setting "${settingTitle}" changed to "${newState}".`
  );
}

async function toggleCustom(
  config: vscode.WorkspaceConfiguration,
  settingTitle: string,
  oldState: number | string
) {
  const settingState1: number | string = config.get(SettingState1);
  const settingState2: number | string = config.get(SettingState2);

  if (settingState1 === State1Default || settingState2 === State2Default) {
    vscode.window.showErrorMessage(
      `Setting Toggle: Set "settingState1" and "settingState2" to toggle non-boolean values.`
    );
    return;
  }

  let newState: number | string;
  // toggle using custom setting values
  if (oldState === settingState1) {
    newState = settingState2;
  } else if (oldState === settingState2) {
    newState = settingState1;
  } else {
    vscode.window.showErrorMessage(
      `Setting Toggle: State does not match state1 or state2. ${settingTitle} cannot be toggled.`
    );
    return;
  }

  const isGlobalSetting = true;
  await config.update(settingTitle, newState, isGlobalSetting);
  vscode.window.showInformationMessage(
    `Setting Toggle: ${settingTitle} changed to ${newState}.`
  );
}
