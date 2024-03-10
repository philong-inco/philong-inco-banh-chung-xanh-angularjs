console.log('Kết nối thành công QuanLyDanhMucEdit.js');

app.controller('QuanLyDanhMucEditCtrl', function($scope, $http, $routeParams, $location){
    console.log('Đã khai báo QuanLyDanhMucEditCtrl');

    $scope.cate = {
        id: '',
        name: '',
        description: '',
        creatTime: ''
    }

    $http({
        method: 'GET',
        url: 'http://localhost:3000/danhmuc/' + $routeParams.id
    }).then(function(response){
        $scope.cate = response.data
    })

    $scope.isHopLe = true;
    $scope.mess = '';

    $scope.update = function () {
        if ($scope.cate.id === '' || $scope.cate.name === '' || $scope.cate.description === '' || $scope.cate.creatTime === '') {
            $scope.isHopLe = false;
            $scope.mess = 'Phải điền đủ thông tin';
            return;
        }

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/danhmuc/' + $routeParams.id,
            data: $scope.cate
        }).then(function(response){
            alert('Sửa thành công');
            $location.path('/category-list');
        })
    }

    $scope.delete = function(id){
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/danhmuc/' + $scope.cate.id
        }).then(function(response){
            alert('Xóa thành công');
            $location.path('/category-list');
        })
    }








    
})