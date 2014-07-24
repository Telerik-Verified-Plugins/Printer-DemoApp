(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        checkAvailable: function () {
            if (!this.checkSimulator()) {
                window.plugin.printer.isServiceAvailable(
                    function (isAvailable) {
                        alert(isAvailable ? 'Service is available' : 'Service NOT available');
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
                alert('Plugins are not available in the simulator.');
                return true;
            }
            return false;
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);