console.log('Kết nối edit.js');
app.controller('QuanLySanPhamEditCtrl', function ($scope, $http, $routeParams, $location) {
    console.log('Khai báo QLSPEditCtrl');

 
    $scope.product = {
        id: '',
        name: '',
        description: '',
        price: '',
        total: '',
        img: '',
        createTime: Date.now(),
        idCategory: '',
        totalSale: 0,
        totalReview: 0
    }
    // GET dữ liệu 
    $http({
        method: 'GET',
        url: 'http://localhost:3000/sanpham/' + $routeParams.id
    }).then(function (response) {
        $scope.product = response.data;
    })

    console.log($scope.product.totalSale)

    document.getElementById('fileInput').addEventListener('change', function () {
        var fileInput = document.getElementById('fileInput');
        var fileName = fileInput.value.split('\\').pop(); // Lấy tên file từ đường dẫn đầy đủ

        $scope.$apply(function () {
            $scope.product.img = 'img/' + fileName;
            console.log($scope.product);
        });
    });

    $scope.mess = '';
    $scope.isVaild = true;
    $scope.insert = function () {
        if ($scope.product.name === '') {
            $scope.mess = 'Điền đầy đủ tên sản phẩm';
            $scope.isVaild = false;
            return;
        }
        if ($scope.product.description === '') {
            $scope.mess = 'Điền đầy đủ mô tả sản phẩm';
            $scope.isVaild = false;
            return;
        }
        if ($scope.product.idCategory === '') {
            $scope.mess = 'Vui lòng chọn danh mục';
            $scope.isVaild = false;
            return;
        }
        if ($scope.product.total === '') {
            $scope.mess = 'Điền đầy đủ số lượng sản phẩm';
            $scope.isVaild = false;
            return;
        }
        if ($scope.product.price === '') {
            $scope.mess = 'Điền đầy đủ giá sản phẩm';
            $scope.isVaild = false;
            return;
        }
        if ($scope.product.img === '') {
            $scope.mess = 'Vui lòng chọn ảnh sản phẩm';
            $scope.isVaild = false;
            return;
        }
        if (isNaN($scope.product.total) || $scope.product.total < 0) {
            $scope.mess = 'Số lượng không hợp lệ';
            $scope.isVaild = false;
            return;
        }
        if (isNaN($scope.product.price) || $scope.product.total < 0) {
            $scope.mess = 'Giá không hợp lệ';
            $scope.isVaild = false;
            return;
        }
        // if ($scope.product.createTime === '') {
        //     $scope.mess = 'Vui lòng điền ngày tạo';
        //     $scope.isVaild = false;
        //     return;
        // }

        //convert ngày giờ
        // const timestamp = $scope.product.createTime;
        // const date = new Date(timestamp);

        // const day = date.getDate().toString().padStart(2, '0');
        // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        // const year = date.getFullYear();

        // const formattedDate = `${day}-${month}-${year}`;
        // console.log(formattedDate);
        // $scope.product.createTime = formattedDate;

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/sanpham/' + $routeParams.id,
            data: $scope.product
        }).then(function (response) {
            alert('Sửa sản phẩm thành công');
            $location.path('/product-list');
        })
    }

    // // Hàm để hiển thị thông tin về ảnh sau khi chọn
    // $scope.displayImage = function () {
    //     const input = document.getElementById("fileInput");
    //     const file = input.files[0];
    //     console.log('đây')
    //     if (file) {
    //         // Display the file name
    //         const fileName = file.name;
    //         console.log('Selected File:', fileName);

    //         // Update image source with the file name
    //         $scope.updateImageSrc(fileName);

    //         // Read and display the selected image
    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             $scope.$apply(function () {
    //                 $scope.sanpham.anh = e.target.result;
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }

    // Hàm cập nhật đường dẫn ảnh trong $scope.sanpham.anh
    // $scope.updateImageSrc = function (fileName) {
    //     $scope.sanpham.anh = '/img/' + fileName;
    //     console.log('Updated Image Source:', $scope.sanpham.anh);
    // }
})