console.log('Kết nối thành công DangNhap.js');

app.controller('DangNhapCtrl', function ($scope, $http, $location, $rootScope) {
    console.log('Đã khai báo DangNhapCtrl');

    $scope.mess = '';
    $scope.isGood = true;

    $scope.acc = {
        id: '',
        name: '',
        email: '',
        password: '',
        power: ''
    }

    $scope.login = function () {
        if ($scope.acc.email === '') {
            $scope.mess = 'Không được bỏ trống email';
            $scope.isGood = false;
            return;
        }
        if ($scope.acc.password === '') {
            $scope.mess = 'Không được bỏ trống password';
            $scope.isGood = false;
            return;
        }
        $http({
            method: 'GET',
            url: 'http://localhost:3000/account?email=' + $scope.acc.email + '&password=' + $scope.acc.password
        }).then(function (response) {

            if (response.data.length > 0) {
                $scope.acc = response.data[0];
                console.log($scope.acc);

                // Lưu acc này vào JSON
                $http({
                    method: 'PUT',
                    url: 'http://localhost:3000/isLogin/1',
                    data: $scope.acc
                }).then(function(response){
                    
                })

                if ($scope.acc.power === 'admin') {
                    $location.path('/product-list');
                    alert('Đăng nhập admin thành công');
                } else if ($scope.acc.power === 'guest') {
                    $location.path('/');
                    alert('Đăng nhập thành công');
                }
                $rootScope.isLogin = false;
                $rootScope.accountMain = $scope.acc;



            } else {
                // alert('Sai email hoặc mật khẩu');
                $scope.mess = 'Sai email hoặc mật khẩu';
                $scope.isGood = false;
            }
        }, function (error) {
            alert('Sai email hoặc mật khẩu');
        })
    }







})