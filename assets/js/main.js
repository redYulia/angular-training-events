var app = angular.module("myApp", []);
app.controller('mainCtrl', function($scope) {});
function inputCtrl($rootScope) {
    this.inputValue = '';
    function addValue() {
        if (this.inputValue !== '') {
            $rootScope.$emit("magicEvent", this.inputValue); 
        }
        this.inputValue = '';
    };
    this.addValue = addValue;
}
function outputCtrl($rootScope) {
    this.values = [];
    var valuesArr = this.values;
    $rootScope.$on('magicEvent', function (event, data) {
        //console.log(data);
        valuesArr.push(data);
    });
}
app.component('inputControl', {  
    templateUrl: 'inputTemplate',
    transclude: true,
    bindings: {
      inputValue: '@'
    },
    controller: ['$rootScope', inputCtrl]
});

app.component('outputControl', {
    templateUrl: 'outputTemplate',
    controller: ['$rootScope', outputCtrl]
});