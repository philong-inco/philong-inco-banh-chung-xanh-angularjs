console.log('Kết nối list.js');
app.controller('QuanLyDonHangListCtrl', function ($scope, $http, $routeParams) {
    console.log('Khai báo QuanLyDonHangListCtrl');

    $scope.totalBill = 0;
    $scope.listBill = [];
    $scope.keyword = '';
    $http({
        method: 'GET',
        url: 'http://localhost:3000/donhang'
    }).then(function (response) {
        $scope.listBill = response.data;
        $scope.totalBill = response.data.length;
        console.log($scope.listBill)
    })

    


})