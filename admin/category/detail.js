console.log('Kết nối thành công QuanLyDanhMucDetail.js');

app.controller('QuanLyDanhMucDetailCtrl', function ($scope, $http, $routeParams, $location) {
    console.log('Đã khai báo QuanLyDanhMucDetailCtrl');
    $scope.categoryItem = {
        id: '',
        name: '',
        description: '',
        creatTime:''
    }
    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc/' + $routeParams.id
    }).then(function (response) {
        $scope.categoryItem = response.data;
        console.log($scope.categoryItem)
    })

    $scope.delete = function(id){
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/danhmuc/' + $routeParams.id
        }).then(function(response){
            alert('Xóa thành công');
            $location.path('/category-list');
        })
    }








})