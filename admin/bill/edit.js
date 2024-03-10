console.log('Kết nối edit.js');
app.controller('QuanLyDonHangEditCtrl', function ($scope, $http, $routeParams, $location) {
    console.log('Khai báo QuanLyDonHangEditCtrl');
    $scope.billDetail = {
        id: '',
        total: '',
        ship: '',
        totalPay: '',
        name: '',
        phone: '',
        address: '',
        createAt: '',
        listProduct: [],
        trangThai: 0
    }

    

    $scope.dateConvert = '';

    $scope.listProduct = [];
    $scope.listProductDetail = [];
    $scope.countProduct = 0;
    $scope.pathParams = '?';

    $http({
        method: 'GET',
        url: 'http://localhost:3000/donhang/' + $routeParams.id
    }).then(function (response) {
        $scope.billDetail = response.data;
        $scope.listProduct = $scope.billDetail.listProduct;
        $scope.countProduct = $scope.listProduct.length;
        console.log($scope.billDetail);
        console.log($scope.listProduct);
        console.log($scope.countProduct);

        for (var i = 0; i < $scope.listProduct.length; i++) {
            $scope.pathParams = $scope.pathParams + "id=" + $scope.listProduct[i] + "&";
        }
        $scope.pathParams = $scope.pathParams.substring(0, $scope.pathParams.length - 1);
        console.log('P:', $scope.pathParams);
        $scope.pathParams = 'http://localhost:3000/sanpham' + $scope.pathParams;
        console.log($scope.pathParams)

        //convert ngày giờ
        const timestamp = $scope.billDetail.createAt;
        const date = new Date(timestamp);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        $scope.dateConvert = formattedDate;


        $scope.trangThai = '';
        console.log('billDetail.trangThai:', $scope.billDetail.trangThai)
        if ($scope.billDetail.trangThai === 1) {
            $scope.trangThai = "Chờ xác nhận";
        } else if ($scope.billDetail.trangThai === 2) {
            $scope.trangThai = "Đã xác nhận";
        } else if ($scope.billDetail.trangThai === 3) {
            $scope.trangThai = "Đang giao";
        } else if ($scope.billDetail.trangThai === 4) {
            $scope.trangThai = "Hoàn thành";
        }
    }).finally(function () {
        $http({
            method: 'GET',
            url: $scope.pathParams
        }).then(function (response) {
            $scope.listProductDetail = response.data;
            console.log('LPD:', $scope.listProductDetail);
        })
    })

    $scope.update = function () {
        if(!isNaN($scope.billDetail.name)){
            alert('Tên không được chứa số');
            return;
        }
        if(isNaN($scope.billDetail.phone)){
            alert('Số điện thoại không hợp lệ');
            return;
        }
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/donhang/' + $scope.billDetail.id,
            data: $scope.billDetail
        }).then(function (response) {
            alert('Sửa đơn hàng thành công')
            $location.path('/bill-detail/' + $scope.billDetail.id);
        })
    }

    $scope.changeSelect = function () {
        $scope.trangThai = '';
        console.log('billDetail.trangThai:', $scope.billDetail.trangThai)
        if ($scope.billDetail.trangThai == 1) {
            console.log('đâu')
            $scope.trangThai = "Chờ xác nhận";
        } else if ($scope.billDetail.trangThai == 2) {
            $scope.trangThai = "Đã xác nhận";
        } else if ($scope.billDetail.trangThai == 3) {
            $scope.trangThai = "Đang giao";
        } else if ($scope.billDetail.trangThai == 4) {
            $scope.trangThai = "Hoàn thành";
        }
    }


})