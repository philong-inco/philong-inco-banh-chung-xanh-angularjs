console.log('Kết nối thành công QuanLyDanhMucCreate.js');

app.controller('QuanLyDanhMucCreateCtrl', function ($scope, $http, $location) {
    console.log('Đã khai báo QuanLyDanhMucCreateCtrl');

    $scope.cate = {
        id: '',
        name: '',
        description: '',
        creatTime: ''
    }

    $scope.isHopLe = true;
    $scope.mess = '';

    $scope.insert = function () {
        $scope.isHopLe = true;
        if ($scope.cate.id === '' || $scope.cate.name === '' || $scope.cate.description === '' || $scope.cate.creatTime === '') {
            $scope.isHopLe = false;
            $scope.mess = 'Phải điền đủ thông tin';
            return;
        }
        if ($scope.cate.id.includes(' ')) {
            $scope.isHopLe = false;
            $scope.mess = 'ID không được chứa dấu cách';
            return;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:3000/danhmuc/' + $scope.cate.id
        }).then(function (response) {
            if (response.data) {
                alert('ID danh mục "' + $scope.cate.id + '" đã tồn tại');
                return;
            }
        })

        $http({
            method: 'POST',
            url: 'http://localhost:3000/danhmuc',
            data: $scope.cate
        }).then(function (response) {
            alert('Tạo mới thành công');
            $location.path('/category-list');
        })
    }








})