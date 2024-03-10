console.log('Kết nối thành công ChiTietGioHang.js');

app.controller('ChiTietGioHangCtrl', function ($scope, $http, $rootScope) {
    console.log('Đã khai báo ChiTietGioHangCtrl');

    $scope.totalCart = 0;
    $scope.listProductInCart = [];
    $http({
        medthod: 'GET',
        url: 'http://localhost:3000/giohang'
    }).then(function (response) {
        $scope.listProductInCart = response.data;
        $scope.totalCart = $rootScope.totalCart;
        console.log('Cart: ', $scope.listProductInCart);
        console.log('length: ', response.data.length);

    })


    $scope.ship = 0;
    $scope.bill = 0;
    $scope.totalListPay = 0;
    $scope.caclListPay = function (arr) {
        console.log('chạy vào đây');
        $scope.totalListPay = 0;
        $scope.bill = 0;
        $scope.ship = 0;
        for (var i = 0; i < $scope.listProductInCart.length; i++) {
            for (var k = 0; k < arr.length; k++) {
                if ($scope.listProductInCart[i].id === arr[k]) {
                    $scope.totalListPay += $scope.listProductInCart[i].totalPay;
                }
            }
        }
        // Cập nhật phí ship và tổng bill
        if ($scope.totalListPay >= 500000) {
            console.log('case > 500');
            $scope.ship = 0;
            $scope.bill = $scope.totalListPay + $scope.ship;
        } else if ($scope.totalListPay < 500000 && $scope.totalListPay !== 0) {
            console.log('case < 500');
            $scope.ship = 30000;
            $scope.bill = $scope.totalListPay + $scope.ship;
        }

    }

    $scope.changeTotalItem = function (o) {
        if (o.total <= 0) {
            o.total = 1;
        }
        console.log('Object: ', o);
        o.totalPay = o.total * o.price;
        $scope.caclListPay($scope.listChecked);
    }

    $scope.listChecked = [];
    $scope.clickCheckbox = function (id) {
        if ($scope.listChecked.indexOf(id) === -1) {
            $scope.listChecked.push(id);
        } else if ($scope.listChecked.indexOf(id) !== -1) {
            $scope.listChecked.splice($scope.listChecked.indexOf(id), 1)
        }
        console.log($scope.listChecked);
        $scope.caclListPay($scope.listChecked);
        $scope.arrProductToString = '?';
        $scope.createPath();
        console.log($scope.arrProductToString);
    }


    $scope.updateAllCartToJson = function () {
        for (var i = 0; i < $scope.listProductInCart.length; i++) {
            let cartItemNew = $scope.listProductInCart[i];
            let id = cartItemNew.id;
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/giohang/' + id,
                data: cartItemNew
            }).then(function (response) {

            })
        }
    }

    $scope.deleteItem = function (id) {
        // Cập nhật lại giỏ hàng toàn bộ để lưu số lượng mới
        $scope.updateAllCartToJson();

        // Bây giờ là xóa id đó đi
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/giohang/' + id
        }).then(function (response) {
            alert('Xóa thành công');
        })
    }
    $scope.arrProductToString = '?';
    $scope.createPath = function () {

        for (var i = 0; i < $scope.listChecked.length; i++) {
            $scope.arrProductToString += 'id=' + $scope.listChecked[i] + '&';
        }
        $scope.arrProductToString = $scope.arrProductToString.substring(0, $scope.arrProductToString.length - 1);

    }

    $scope.comfirmCart = function () {
        if ($scope.listChecked.length === 0) {
            alert('Chọn sản phẩm để đặt hàng');
            return;
        } else {
            $scope.newData = {
                id: 1,
                path: $scope.arrProductToString
            }
            $scope.updateAllCartToJson();
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/isListProductNow/1',
                data: $scope.newData
            }).then(function (response) {
                $location.path('/XacNhanDonHangList');
            })
        }

    }















})