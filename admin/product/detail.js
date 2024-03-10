console.log('Kết nối detail.js');
app.controller('QuanLySanPhamDetailCtrl', function ($scope, $http, $routeParams) {
    console.log('Khai báo QLSPDetailCtrl');

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

    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham/' + $routeParams.id
    }).then(function (response) {
        $scope.product = response.data;
    })

    $scope.listCategory = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc'
    }).then(function (response) {
        $scope.listCategory = response.data;
    })
})