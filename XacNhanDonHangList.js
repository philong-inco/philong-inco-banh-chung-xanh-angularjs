console.log('Kết nối thành công XacNhanDonHangList.js');

app.controller('XacNhanDonHangListCtrl', function ($scope, $http, $routeParams, $rootScope, $location) {
    console.log('Đã khai báo XacNhanDonHangCtrl');
    $scope.name1 = $rootScope.accountMain.name;
    console.log('Info', $rootScope.accountMain.name);
    $scope.phoneNumber = '';
    $scope.address = '';
    $scope.productInList = [];
    $scope.idProductInList = [];
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

    // Get list sản phẩm trong giỏ
    $scope.path = ''
    $http({
        method: 'GET',
        url: 'http://localhost:3000/isListProductNow/1'
    }).then(function (response) {
        $scope.path = response.data.path;
        console.log('P:', $scope.path);
    }).finally(function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/giohang' + $scope.path
        }).then(function (response) {
            console.log('http://localhost:3000/giohang' + $scope.path);
            $scope.productInList = response.data;
            console.log($scope.productInList);
            $scope.bill = 0;
            $scope.ship = 0;
            $scope.totalPay = 0;
            for (var i = 0; i < $scope.productInList.length; i++) {
                $scope.totalPay += $scope.productInList[i].totalPay;
                $scope.idProductInList.push($scope.productInList[i].id)
                console.log($scope.totalPay);
                console.log($scope.idProductInList);
            }


            console.log($scope.totalPay);
            if ($scope.totalPay >= 500000) {
                $scope.ship = 0;
            } else if ($scope.totalPay < 500000 && $scope.totalPay >= 500000 !== 0) {
                $scope.ship = 30000;
            }
            $scope.bill = $scope.totalPay + $scope.ship;
        })
    })


    // $http({
    //     method: 'GET',
    //     url: 'http://localhost:3000/giohang' + $scope.path
    // }).then(function (response) {
    //     console.log('http://localhost:3000/giohang' + $scope.path);
    //     $scope.productInList = response.data;
    //     console.log($scope.productInList);

    // })

    // $http({
    //     medthod: 'GET',
    //     url: $scope.path
    // }).then(function (response) {
    //     console.log(response.data);
    //     $scope.productItem = response.data;
    //     $scope.productInList.push($scope.productItem.id);
    //     $scope.bill = 0;
    //     $scope.ship = 0;
    //     $scope.totalPay = $scope.productItem.price;
    //     console.log($scope.totalPay);
    //     if ($scope.totalPay >= 500000) {
    //         $scope.ship = 0;
    //     } else if ($scope.totalPay < 500000 && $scope.totalPay >= 500000 !== 0) {
    //         $scope.ship = 30000;
    //     }
    //     $scope.bill = $scope.totalPay + $scope.ship;
    // })

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
            listProduct: $scope.idProductInList,
            trangThai: 'Chờ xác nhận'

        }
        console.log($scope.billNew);



        $http({
            method: 'POST',
            url: 'http://localhost:3000/donhang',
            data: $scope.billNew
        }).then(function (response) {
            $location.path('/');
            alert('Xác nhận thành công!')

        }).finally(function () {
            // $http({

            // })
        })

    }











})