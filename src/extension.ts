"use strict";

import * as vscode from "vscode";
// name of settings strings
const primaryToggle: string = "toggle.settingTitle";
const toggleTitle_s1: string = "toggle.setting1Title";
const toggleTitle_s2: string = "toggle.setting2Title";
// name of setting states and default values specified in package.json
const g_settingState1: string = "toggle.settingState1";
const g_settingState2: string = "toggle.settingState2";
const g_state1Default: string = "state1";
const g_state2Default: string = "state2";

export function activate(context: vscode.ExtensionContext) {
  console.log(`Extension "toggle-btn" is now active!`);
  // Setting Toggle (primary)
  let disposable = vscode.commands.registerCommand("extension.toggle", () => {
    toggleSetting(primaryToggle);
  });
  // Setting 1 Toggle
  let disposable1 = vscode.commands.registerCommand("extension.toggle_s1", () => {
    toggleSetting(toggleTitle_s1);
  });
  // Setting 2 Toggle
  let disposable2 = vscode.commands.registerCommand("extension.toggle_s2", () => {
    toggleSetting(toggleTitle_s2);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}

export function deactivate() { }

export async function toggleSetting(toggleTitle: string) {
  try {
    const config = vscode.workspace.getConfiguration();
    let settingTitle: string = config.get(toggleTitle);

    let state = config.get(settingTitle);
    let newState = !state

    await config.update(settingTitle, newState, true);

		vscode.window.showInformationMessage(`Setting ${settingTitle} set to ${newState}`);
  } catch (err) {
    vscode.window.showErrorMessage("Error caught: " + err);
  }
}
