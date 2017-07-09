app.controller('AppointmentArabicCtrl', function($scope, Cities, Appointment, CityBranchId, $state, localStorageService, $rootScope, $ionicLoading) {
        console.log(Cities.cities)
        var cities = localStorageService.get('cities')
        $scope.cities = {
            selectedOption: { CityId: 1, CityName: "Riyadh" },
            availableOptions: cities
        }
        $scope.branches = {};
        $ionicLoading.show();
        Appointment.getBranches($scope.cities.selectedOption.CityId).success(function(res) {
                console.log(res);
                $ionicLoading.hide();
                $scope.branches = {
                    selectedOption: { Id: res[0].Id, BranchName: res[0].BranchName },
                    availableOptions: res
                };
            })
            .error(function(err) {
                console.log(err);
                $ionicLoading.hide();
            })


        $scope.hasChanged = function() {
            console.log($scope.cities.selectedOption)
            $ionicLoading.show();
            Appointment.getBranches($scope.cities.selectedOption.CityId).success(function(res) {
                    console.log(res);
                    $ionicLoading.hide();
                    $scope.branches = {
                        selectedOption: { Id: res[0].Id, BranchName: res[0].BranchName },
                        availableOptions: res
                    };
                })
                .error(function(err) {
                    console.log(err);
                    $ionicLoading.hide();
                })
        }

        $scope.next = function() {
            CityBranchId.set_cityid($scope.cities.selectedOption.CityId);
            CityBranchId.set_branchid($scope.branches.selectedOption);
            $rootScope.navigate('app.bookappointment', { branchid: $scope.branches.selectedOption.Id })
                // $state.go()
                // $scope.cities = Cities.cities;
        }


    })