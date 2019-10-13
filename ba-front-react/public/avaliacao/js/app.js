var app = angular.module('myApp', []);
app.controller('FormCtrl', function ($scope, $http) {
    
    var formData = {
        email: "default"
        
        
    };

    $scope.save = function() {
        formData = $scope.form;
        console.log (formData);
    };

    $scope.submitForm = function() {
        console.log("posting data....");
        formData = $scope.form.userEmail;
        console.log("teste" + formData);
        //$http.post('form.php', JSON.stringify(data)).success(function(){/*success callback*/});
    };

});