app.controller('AppointmentCtrl', function($scope, Cities, PormotionsOffers, Appointment, CityBranchId, $state, localStorageService, $rootScope, $ionicLoading, $ionicModal) {

    var cities = localStorageService.get('cities')
    console.log("cities", cities)
    $scope.cities = {
            selectedOption: { CityId: 1, CityName: "Riyadh" },
            availableOptions: cities
        }
        // getting cities through api//
    $scope.getCities = [];
    $scope.cityId = "";
    $scope.getCityId = function() {
        console.log($scope.cityId)
    }
    PormotionsOffers.gettCities().success(function(res) {
            for (var i = 0; i < res.length; i++) {
                $scope.getCities.push({
                    CityId: res[i].CityId,
                    CityName: res[i].CityName,

                })
            }

        })
        .error(function(err) {
            console.log(err);
        })

    $scope.selectCity = function(index) {
        for (var i = 0; i < $scope.getCities.length; i++) {
            if (i == index) {
                $scope.getCities[i].isChecked = true;
            } else {
                $scope.getCities[i].isChecked = false;
            }

        }

    }
    $scope.branches = {};
    $ionicLoading.show();
    Appointment.getBranches($scope.cities.selectedOption.CityId).success(function(res) {
            console.log(res);
            $scope.branches = {
                selectedOption: { Id: res[0].Id, BranchName: res[0].BranchName },
                availableOptions: res
            };
            Appointment.getServices(res[0].Id).success(function(response) {
                    console.log("scope services", response)
                    $ionicLoading.hide();
                    if (response.length > 0) {
                        $scope.services = {
                            selectedOption: { Id: res[0].Id, Service: res[0].Service },
                            availableOptions: res
                        }
                    }
                    else {
                        $scope.services = {
                            selectedOption: null,
                            availableOptions: []
                        }
                    }


                })
                .error(function(err) {
                    $ionicLoading.hide();

                })
        })
        .error(function(err) {
            console.log(err);
            $ionicLoading.hide();
        })
    $scope.openCitiesPicker = function() {
        $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/citiesModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closemodal = function() {
        $scope.modal.hide();
    }

    $scope.hasBranchChange = function() {
        Appointment.getServices($scope.branches.selectedOption.Id).success(function(response) {
                    console.log("scope services", response)
                    $ionicLoading.hide();
                    if (response.length > 0) {
                        $scope.services = {
                            selectedOption: { Id: res[0].Id, Service: res[0].Service },
                            availableOptions: res
                        }
                    }
                    else {
                        $scope.services = {
                            selectedOption: null,
                            availableOptions: []
                        }
                    }


                })
                .error(function(err) {
                    $ionicLoading.hide();

                })
    }

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
