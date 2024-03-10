console.log('Kết nối thành công TimKiem.js');

app.controller('TimKiemCtrl', function ($scope, $http, $routeParams) {
    console.log('Đã khai báo TimKiemCtrl');

console.log('paaaa: ', $routeParams.idCategory)
    var categoryId = $routeParams.idCategory;
    $scope.pathAPI = '';

    $scope.listSearch = [];
    // Nếu vào từ nút category Home thì get path
    if (categoryId) {

        $http({
            method: 'GET',
            url: 'http://localhost:3000/sanpham?idCategory=' + categoryId,
        }).then(function (response) {
            $scope.pathAPI = 'http://localhost:3000/sanpham?idCategory=' + categoryId;
            $scope.listSearch = response.data;
            console.log('KQ: ', $scope.listSearch);
        })

        $scope.keywordForSearchChild = '';
        $scope.clickSearchChild = function (key) {
            $scope.keyword = key;
            var keyChildConvert = key.trim().replace(/\s+/g, '%20');
            $http({
                method: 'GET',
                url: 'http://localhost:3000/sanpham?q=' + keyChildConvert,

            }).then(function (response) {
                $scope.pathAPI = 'http://localhost:3000/sanpham?q=' + keyChildConvert;
                console.log('Key child: ', keyChildConvert)
                $scope.listSearch = response.data;
                console.log('KQ: ', response.data);
            })
        }

        // Load danh mục
        $scope.listCategory = [];
        $http({
            medthod: 'GET',
            url: 'http://localhost:3000/danhmuc'
        }).then(function (response) {
            $scope.listCategory = response.data;
        })

        // Function search danh mục
        $scope.filterByCategory = function (id, name) {
            $scope.keyword = name;
            $http({
                method: 'GET',
                url: 'http://localhost:3000/sanpham/?idCategory=' + id
            }).then(function (response) {
                $scope.pathAPI = 'http://localhost:3000/sanpham/?idCategory=' + id;
                $scope.listSearch = response.data;
            })
        }

        // Filte giá
        $scope.clickRadioPrice = function (price) {
            $scope.paramsPrice = '&price_lte=' + price;
            console.log('Path: ', $scope.pathAPI + $scope.paramsPrice);
            $http({
                method: 'GET',
                url: $scope.pathAPI + $scope.paramsPrice
            }).then(function (response) {
                $scope.listSearch = response.data;
            })
        }
    } else {
        console.log('Params: ', $routeParams.name);
        $scope.keyword = $routeParams.name;
        $scope.pathAPI = '';
        // convert khoảng trắng sang %20
        var keyConvert = $routeParams.name.trim().replace(/\s+/g, '%20');
        console.log('Params convert: ', keyConvert);

        $scope.listSearch = [];



        $http({
            method: 'GET',
            url: 'http://localhost:3000/sanpham?q=' + keyConvert,
        }).then(function (response) {
            $scope.pathAPI = 'http://localhost:3000/sanpham?q=' + keyConvert;
            $scope.listSearch = response.data;
            console.log('KQ: ', $scope.listSearch);
        })

        $scope.keywordForSearchChild = '';
        $scope.clickSearchChild = function (key) {
            $scope.keyword = key;
            var keyChildConvert = key.trim().replace(/\s+/g, '%20');
            $http({
                method: 'GET',
                url: 'http://localhost:3000/sanpham?q=' + keyChildConvert,

            }).then(function (response) {
                $scope.pathAPI = 'http://localhost:3000/sanpham?q=' + keyChildConvert;
                console.log('Key child: ', keyChildConvert)
                $scope.listSearch = response.data;
                console.log('KQ: ', response.data);
            })
        }

        // Load danh mục
        $scope.listCategory = [];
        $http({
            medthod: 'GET',
            url: 'http://localhost:3000/danhmuc'
        }).then(function (response) {
            $scope.listCategory = response.data;
        })

        // Function search danh mục
        $scope.filterByCategory = function (id, name) {
            $scope.keyword = name;
            $http({
                method: 'GET',
                url: 'http://localhost:3000/sanpham/?idCategory=' + id
            }).then(function (response) {
                $scope.pathAPI = 'http://localhost:3000/sanpham/?idCategory=' + id;
                $scope.listSearch = response.data;
            })
        }

        // Filte giá
        $scope.clickRadioPrice = function (price) {
            $scope.paramsPrice = '&price_lte=' + price;
            console.log('Path: ', $scope.pathAPI + $scope.paramsPrice);
            $http({
                method: 'GET',
                url: $scope.pathAPI + $scope.paramsPrice
            }).then(function (response) {
                $scope.listSearch = response.data;
            })
        }
    }

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