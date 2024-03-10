console.log('Kết nối thành công DangKy.js');

app.controller('DangKyCtrl', function ($scope, $http) {
    console.log('Đã khai báo DangKyCtrl');

    $scope.account = {
        id: '',
        name: '',
        email: '',
        password: '',
        power: 'guest'
    }
    $scope.isGood = true;
    $scope.mess = '';

    $scope.dangKy = function () {
        if ($scope.account.name === '') {
            $scope.isGood = false;
            $scope.mess = 'Vui lòng điền đầy đủ tên';
            return;
        }
        if (!isNaN($scope.account.name)) {
            $scope.isGood = false;
            $scope.mess = 'Tên không được chứa số';
            return;
        }
        if ($scope.account.email === '') {
            $scope.isGood = false;
            $scope.mess = 'Vui lòng điền đầy đủ email';
            return;
        }
        if ($scope.account.password === '') {
            $scope.isGood = false;
            $scope.mess = 'Vui lòng điền đầy đủ password';
            return;
        }
        if ($scope.account.password.length < 6) {
            $scope.isGood = false;
            $scope.mess = 'Mật khẩu tối thiểu 6 ký tự';
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($scope.account.email)) {
            $scope.isGood = false;
            $scope.mess = 'Email không hợp lệ';
            return;
        }


        $http({
            method: 'POST',
            url: 'http://localhost:3000/account',
            data: $scope.account
        }).then(function (response) {
            alert('Đăng ký thành công');
        },
            function (error) {
                alert('Đăng ký thất bại, thử lại')
            })
    }










})