console.log('Kết nối thành công ChiTietSanPham.js');

app.controller('ChiTietSanPhamCtrl', function ($scope, $http, $routeParams, $rootScope) {
    console.log('Đã khai báo ChiTietSanPhamCtrl');
    console.log('Giá trị params: ', $routeParams);

    // Get thông tin người dùng đang đăng nhập $rootScope.accountMain
    $http

    console.log('Number: ', $scope.number);
    // Khai báo 1 object product
    $scope.product = {
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

    $scope.priceConvert = '';

    // Lấy dữ liệu sản phẩm
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham/' + $routeParams.id
    }).then(function (response) {
        $scope.product = response.data;
        $scope.priceConvert = response.data.price + ' VNĐ';
        console.log('Giá convert: ' + $scope.priceConvert);
        console.log('Product detail: ' + response.data);
    })


    // Thêm vào giỏ hàng
    $scope.numberOrder = 1;
    $scope.addToCart = function (_id, _name, _price, _img) {
        console.log('ID: ', _id);
        console.log('Name: ', _name);
        console.log('Price: ', _price);
        console.log('Img: ', _img);
        console.log('numberOrder: ', $scope.numberOrder);

        if ($scope.numberOrder < 1) {
            alert('Không hợp lệ, phải thêm tối thiểu 1 sản phẩm vào giỏ hàng.');
            return;
        }
        if ($scope.numberOrder > $scope.product.total) {
            alert('Không đủ sản phẩm, chỉ còn ' + $scope.product.total + ' sản phẩm.');
            return;
        }

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
                    $rootScope.totalCart += 1;
                    alert('Đã thêm vào giỏ hàng');
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
            $rootScope.isLogin = false;

        })





    }








})