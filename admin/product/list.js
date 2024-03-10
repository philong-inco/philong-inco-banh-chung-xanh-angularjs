console.log('Kết nối list.js');
app.controller('QuanLySanPhamListCtrl', function ($scope, $http, $routeParams) {
    console.log('Khai báo QLSPCreateCtrl');

    $scope.listProduct = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham'
    }).then(function (response) {
        $scope.listProduct = response.data;
        console.log($scope.listProduct);
    })

    $scope.delete = function (id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/sanpham/' + id
        }).then(function (response) {
            alert('Xóa thành công');
        })
    }
})