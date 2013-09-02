var input_buffer = [];
var current_keys = {};

$(document).keydown(function(e){
    current_keys[e.keyCode] = true;
});

$(document).keyup(function(e){
    current_keys[e.keyCode] = false;
});

var Test = Class(function() {
    Maple.Client(this, 30, 60);

}, Maple.Client, {

    started: function() {
        this.log('Client started');
    },

    update: function(t, tick) {
        //this.log(current_keys);
        var keys_list = [];
        for (var key in current_keys) {
            if(current_keys[key] == true && key != 91) {
                keys_list.push(key);
            }
        }
        if(keys_list.length > 0) {
            this.send(1, keys_list);
        }
    },

    render: function(t, dt, u) {

    },

    stopped: function() {
        this.log('Stopped');
    },

    connected: function() {
        this.log('Connection established');
    },

    message: function(type, tick, data) {
        //this.log('Message received:', type, data);
    },

    syncedMessage: function(type, tick, data) {
        //this.log('Synced message received:', type, data);
    },

    closed: function(byRemote, errorCode) {
        this.log('Connection closed:', byRemote, errorCode);
    }

});

var client = new Test();
client.connect('localhost', 4000);

