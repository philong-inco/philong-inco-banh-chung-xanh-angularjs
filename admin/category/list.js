console.log('Kết nối thành công QuanLyDanhMucList.js');

app.controller('QuanLyDanhMucListCtrl', function ($scope, $http) {
    console.log('Đã khai báo QuanLyDanhMucCtrl');
    $scope.listCategory = [];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc'
    }).then(function (response) {
        $scope.listCategory = response.data;
        console.log
    })

    $scope.delete = function (id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/danhmuc/' + id
        }).then(function (response) {
            alert('Xóa thành công');
            $location.path('/category-list');
        })
    }









})