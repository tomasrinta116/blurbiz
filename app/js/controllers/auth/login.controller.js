/**
 * Master Controller
 */

angular.module('Blurbiz')
    .controller('LoginController', ['$scope', '$cookieStore', '$state', 'socket', 'AuthService', LoginController]);

function LoginController($scope, $cookieStore, $state, socket, AuthService) {
    $scope.message = {};
    $scope.login = function() {
        socket.emit('authenticate', {
            'login': $scope.email,
            'password': $scope.password
        });
    };   

    socket.on('authenticate_response', function(msg) {
        debugger;
        console.log('authenticate response: ' + JSON.stringify(msg));
        if (msg.success == false) {
            $scope.message = {
                error: msg.msg,
                success: false
            };
            return;
        }
        if (msg == null) {
                console.log('ERROR: msg is null');
                return;
        }
        if (msg.success == true && msg.token != null) {
                console.log('CORRECT');
                AuthService.saveToken(msg.token);
                $state.go("index");
                return;
        }
        if (msg.success == true && msg.token == null) {
                console.log('ERROR: token is null');
                return;
        }
        if (msg.err != null && msg.err != '') {
                console.log('ERROR: ' + err);
        }
    });
 
}