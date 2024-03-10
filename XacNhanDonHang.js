console.log('Kết nối thành công XacNhanDonHang.js');

app.controller('XacNhanDonHangCtrl', function ($scope, $http, $routeParams, $rootScope, $location) {
    console.log('Đã khai báo XacNhanDonHangCtrl');
    $scope.name1 = $rootScope.accountMain.name;
    console.log('Info', $rootScope.accountMain.name);
    $scope.phoneNumber = '';
    $scope.address = '';
    $scope.productInList = [];
    $scope.productItem = {
        id: '',
        name: '',
        description: '',
        price: '',
        total: '',
        img: '',
        createTime: '',
        idCategory: '',
        totalSale: '',
        totalReview: ''
    }
    $http({
        medthod: 'GET',
        url: 'http://localhost:3000/sanpham/' + $routeParams.id
    }).then(function (response) {
        $scope.productItem = response.data;
        $scope.productInList.push($scope.productItem.id);
        $scope.bill = 0;
        $scope.ship = 0;
        $scope.totalPay = $scope.productItem.price;
        console.log($scope.totalPay);
        if ($scope.totalPay >= 500000) {
            $scope.ship = 0;
        } else if ($scope.totalPay < 500000 && $scope.totalPay >= 500000 !== 0) {
            $scope.ship = 30000;
        }
        $scope.bill = $scope.totalPay + $scope.ship;
    })

    $scope.comfirm = function () {
        if ($scope.name1 === '' || $scope.phoneNumber === '' || $scope.address === '') {
            alert('Vui lòng điền đủ thông tin');
            return;
        }

        
            $scope.billNew = {
                id: '',
                total: $scope.bill,
                ship: $scope.ship,
                totalPay: $scope.totalPay,
                name: $scope.name1,
                phone: $scope.phoneNumber,
                address: $scope.address,
                createAt: Date.now(),
                listProduct: $scope.productInList,
                trangThai: 'Chờ xác nhận'
            }
        console.log($scope.billNew);



        $http({
            method: 'POST',
            url: 'http://localhost:3000/donhang',
            data: $scope.billNew
        }).then(function (response) {
            alert('Xác nhận thành công!')
            $location.path('/');
        })

    }











})