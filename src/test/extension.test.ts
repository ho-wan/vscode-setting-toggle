import * as assert from 'assert';
import * as extension from '../extension';

suite("settingsLocator", () => {
    var originalHome : string;
    var originalAppData : string;

    suiteSetup(() => {
        originalHome = process.env.HOME;
        originalAppData = process.env.APPDATA;
    });

    suiteTeardown(() => {
        SetHome(originalHome);
        SetAppData(originalAppData);
    });

	test("if mac then is mac path", () => {
        Object.defineProperty(process, 'platform', {
            value: "darwin"
        });
        SetHome('/Users/user');

        console.log(extension.getSettingsPath());
        assert.equal(extension.getSettingsPath(), "/Users/user/Library/Application Support/Code/User/settings.json")
	});

    test("if windows then is windows path", () => {
        Object.defineProperty(process, 'platform', {
            value: "win32"
        });
        //windows uses the appdata settings not the home
        SetAppData('C:\\Users\\User\\AppData\\Roaming');
        SetHome('');

        console.log(extension.getSettingsPath());
        assert.equal(extension.getSettingsPath(), "C:\\Users\\User\\AppData\\Roaming\\Code\\User\\settings.json")
	});

     test("if linux then is linux path", () => {
        Object.defineProperty(process, 'platform', {
            value: "linux"
        });
        SetHome('/var/local');

        console.log(extension.getSettingsPath());
        assert.equal(extension.getSettingsPath(), "/var/local/.config/Code/User/settings.json")
	});

});

function SetHome(home){
      Object.defineProperty(process.env, 'HOME', {
            value: home
        });
}

function SetAppData(location){
      Object.defineProperty(process.env, 'APPDATA', {
            value: location
        });
}