
console.log('Kết nối index.js')

var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'TrangChu.html',
            controller: 'TrangChuCtrl'
        })
        .when('/detail/:id', {
            templateUrl: 'ChiTietSanPham.html',
            controller: 'ChiTietSanPhamCtrl'
        })
        .when('/product-comfirm/:id', {
            templateUrl: 'XacNhanDonHang.html',
            controller: 'XacNhanDonHangCtrl'
        })
        .when('/cart-comfirm', {
            templateUrl: 'XacNhanDonHangList.html',
            controller: 'XacNhanDonHangListCtrl'
        })
        .when('/search/:name', {
            templateUrl: 'TimKiem.html',
            controller: 'TimKiemCtrl'
        })
        .when('/cart/', {
            templateUrl: 'ChiTietGioHang.html',
            controller: 'ChiTietGioHangCtrl'
        })
        .when('/resigner/', {
            templateUrl: 'DangKy.html',
            controller: 'DangKyCtrl'
        })
        .when('/login/', {
            templateUrl: 'DangNhap.html',
            controller: 'DangNhapCtrl'
        })


        .when('/product-create/', {
            templateUrl: 'admin/product/create.html',
            controller: 'QuanLySanPhamCreateCtrl'
        })
        .when('/product-edit/:id', {
            templateUrl: 'admin/product/edit.html',
            controller: 'QuanLySanPhamEditCtrl'
        })
        .when('/product-detail/:id', {
            templateUrl: 'admin/product/detail.html',
            controller: 'QuanLySanPhamDetailCtrl'
        })
        .when('/product-list', {
            templateUrl: 'admin/product/list.html',
            controller: 'QuanLySanPhamListCtrl'
        })


        .when('/category-list/', {
            templateUrl: 'admin/category/list.html',
            controller: 'QuanLyDanhMucListCtrl'
        })
        .when('/category-create/', {
            templateUrl: 'admin/category/create.html',
            controller: 'QuanLyDanhMucCreateCtrl'
        })
        .when('/category-detail/:id', {
            templateUrl: 'admin/category/detail.html',
            controller: 'QuanLyDanhMucDetailCtrl'
        })
        .when('/category-update/:id', {
            templateUrl: 'admin/category/edit.html',
            controller: 'QuanLyDanhMucEditCtrl'
        })
        .when('/category-delete/:id', {
            templateUrl: 'admin/category/delete.html',
            controller: 'QuanLyDanhMucDeleteCtrl'
        })


        .when('/bill-list/', {
            templateUrl: 'admin/bill/list.html',
            controller: 'QuanLyDonHangListCtrl'
        })
        .when('/bill-edit/:id', {
            templateUrl: 'admin/bill/edit.html',
            controller: 'QuanLyDonHangEditCtrl'
        })
        .when('/bill-detail/:id', {
            templateUrl: 'admin/bill/detail.html',
            controller: 'QuanLyDonHangDetailCtrl'
        })

})

app.controller('mainCtrl', function ($scope, $http, $rootScope) {
    console.log('Kết nối indexCtrl')
    // Khai báo mảng chứa danh mục
    $scope.listCategory = [];
    // Khai báo biến đếm giỏ hàng
    $rootScope.totalCart = 0;
    $rootScope.isLogin = true;
    $rootScope.accountMain = {
        id: '',
        name: '',
        email: '',
        password: '',
        power: ''
    }

    $http({
        method: 'GET',
        url: 'http://localhost:3000/giohang'
    }).then(function (response) {
        $rootScope.totalCart = response.data.length
    })

    // Lấy danh mục từ API
    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc'
    }).then(function (response) {
        $scope.listCategory = response.data;
        console.log('Danh sách Danh mục: ', response.data);
    })

    $scope.keywordSearch = '';

    // Get thông tin người dùng vào biến $root
    $http({
        method: 'GET',
        url: 'http://localhost:3000/isLogin/1'
    }).then(function (response) {
        $rootScope.accountMain = response.data;
        console.log($rootScope.accountMain);
        $rootScope.isLogin = false;
    })
    $rootScope.newBill = 0;
    // Get bill mới tạo gần nhất
    $http({
        method: 'GET',
        url: 'http://localhost:3000/donhang',
        params: {
            _sort: 'createAt',
            _order: 'desc',
            _limit: 1
        }
    }).then(function (response) {
        $rootScope.newBill = response.data[0].id;
        console.log('ID bill mới tạo là: ', response.data[0].id);
    })

})




