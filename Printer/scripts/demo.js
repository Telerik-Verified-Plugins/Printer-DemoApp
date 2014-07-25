(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        checkAvailable: function () {
            if (!this.checkSimulator()) {
                window.plugin.printer.isServiceAvailable(
                    function (isAvailable) {
                        alert(isAvailable ? 'Service is available' : 'Service not available');
                    }
                );
            }
        },

        print: function () {
            if (!this.checkSimulator()) {
                var printThis = document.body;
                // TODO second argument: options, see readme
                window.plugin.printer.print(printThis);
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