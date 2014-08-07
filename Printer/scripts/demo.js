(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        checkAvailable: function () {
            if (!this.checkSimulator()) {
                window.plugin.printer.isServiceAvailable(
                    function (isAvailable, installedAppIds) {
                        if (installedAppIds != null) {
                            // this will be set on Android only
	                        alert('The following print apps are installed on your device:\n\n' + installedAppIds.join(',\n'));
                        } else {
	                        alert(isAvailable ? 'Service is available' : 'Service not available');
                        }
                    }
                );
            }
        },

        printThisPage: function () {
            if (!this.checkSimulator()) {
                // note: for the layout to look nice on iOS you need to include all <style> rules inside the printed html
                window.plugin.printer.print(
                    document.body,
                    {}, // options, not currently used
                    function(msg) {console.log('ok: ' + msg)},
                    function(msg) {alert('error: ' + msg)}
                );
            }
        },

        printParagraph: function () {
            if (!this.checkSimulator()) {
                window.plugin.printer.print(
                    document.getElementById('printParagraph').innerHTML,
                    {}, // options, not currently used
                    function(msg) {console.log('ok: ' + msg)},
                    function(msg) {alert('error: ' + msg)}
                );
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugin === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);