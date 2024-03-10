console.log('Kết nối thành công TrangChu.js');

app.controller('TrangChuCtrl', function ($scope, $http) {
    console.log('Đã khai báo TrangChuCtrl');



    // Khai báo mảng chứa danh mục
    $scope.listCategory = [];

    // Lấy danh mục từ API
    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc'
    }).then(function (response) {
        $scope.listCategory = response.data;
        console.log('Danh sách Danh mục: ', response.data);
    })

    // Lấy danh sách sản phẩm mới nhất theo thời gian tạo
    $scope.listNewProduct = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham',
        params: {
            _sort: 'id',
            _order: 'desc',
            _limit: 6
        }
    }).then(function (response) {
        $scope.listNewProduct = response.data;
        console.log('listNewProduct: ', response.data);
    })

    // Lấy danh sách sản phẩm bán chạy dựa vào số lượt bán
    $scope.listHotProduct = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham',
        params: {
            _sort: 'totalSale',
            _order: 'desc',
            _limit: 8
        }
    }).then(function (response) {
        $scope.listHotProduct = response.data;
        console.log('listHotProduct: ', response.data);


    })


    // Thêm nhanh sản phẩm vào giỏ
    // Thêm vào giỏ hàng

    $scope.addToCart = function (_id, _name, _price, _img) {
        console.log('vào đây')
        $scope.numberOrder = 1;
        console.log('ID: ', _id);
        console.log('Name: ', _name);
        console.log('Price: ', _price);
        console.log('Img: ', _img);
        console.log('numberOrder: ', $scope.numberOrder);



        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        // CÓ thì dùng PUT,
        // Chưa thì dùng POST
        $scope.isExist = false;
        // Biến lưu số lượng nếu đã có trong giỏ hàng
        $scope.amount = 0;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/giohang/' + _id
        }).then(function (response) {
            console.log('Length: ', response.data)
            $scope.isExist = true;
            console.log($scope.isExist);
            $scope.amount = response.data.total;

        }).finally(function () {
            console.log('sau khi http kết thúc', $scope.isExist);

            // Trường hợp: Chưa có trong giỏ hàng
            if (!$scope.isExist) {

                // Tạo 1 đối tượng giỏ hàng để lưu
                $scope.cartItem = {
                    id: _id,
                    name: _name,
                    price: _price,
                    total: 1,
                    img: _img,
                    totalPay: 0
                }
                $scope.cartItem.total = $scope.numberOrder;
                $scope.cartItem.totalPay = $scope.cartItem.total * $scope.cartItem.price
                console.log($scope.cartItem);

                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/giohang',
                    data: $scope.cartItem
                }).then(function (response) {
                    alert('Đã thêm vào giỏ hàng');
                    $rootScope.totalCart += 1;
                })
            } else {
                // Tạo 1 đối tượng giỏ hàng để lưu
                $scope.cartItem = {
                    id: _id,
                    name: _name,
                    price: _price,
                    total: 1,
                    img: _img,
                    totalPay: 0
                }
                $scope.cartItem.total = $scope.numberOrder + $scope.amount;
                $scope.cartItem.totalPay = $scope.cartItem.total * $scope.cartItem.price
                console.log($scope.cartItem);

                $http({
                    method: 'PUT',
                    url: 'http://localhost:3000/giohang/' + _id,
                    data: $scope.cartItem
                }).then(function (response) {
                    alert('Sản phẩm có sẵn trong giỏ hàng, đã thêm số lượng');
                })
            }

        })








    }








})