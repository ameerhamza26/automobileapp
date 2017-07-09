app.controller('AppointServiceCtrl', function($scope, User, $ionicLoading, localStorageService, Appointment, $ionicPopup, $rootScope) {
    $ionicLoading.show();
    $scope.final_obj = {};
    $scope.final_obj.AppointmentSlot = localStorageService.get('AppointmentSlot');
    $rootScope.$on('APPOINTMENTSLOTBOOKED', function(event, args) {
        $scope.final_obj.AppointmentSlot = args.data;
    });

    $scope.services = {
        selectedOption: { Id: 1, Text: 'Car Wrap' },
        availableOptions: [{ Id: 1, Text: 'Car Wrap' }, { Id: 2, Text: 'Nano Ceramic Paint Protection' },
            { Id: 3, Text: 'Nano Ceramic Tenting' }, { Id: 4, Text: 'Nano Sonic Detailing' },
            { Id: 5, Text: 'Body Protection Film' }, { Id: 6, Text: 'Car Wash' }
        ]
    };
    console.log("final obj", $scope.final_obj)
    User.customerVehicles().success(function(res) {
            console.log("vahicels", res)
            if (res.length > 0) {
                $scope.vehicles = {
                    selectedOption: { Id: res[0].Id, ChassisNumber: res[0].ChassisNumber },
                    availableOptions: res
                }
            }

            $ionicLoading.hide();
        })
        .error(function(err) {
            $ionicLoading.hide();

        })
    $scope.isShowing = false;
    $scope.showForm = function() {
        $scope.isShowing = !$scope.isShowing;
    }

    $scope.registerVehicle = function() {
        $ionicLoading.show();
        User.addVehicle($scope.final_obj).success(function(res) {
                //  $ionicLoading.hide();
                User.getUnmapped().success(function(res) {
                        $ionicLoading.hide();
                        if (res.length > 0) {
                            $scope.offers = {
                                selectedOption: { Id: res[0].Id, Description_EN: res[0].Description_EN },
                                availableOptions: res
                            }
                        }


                        User.customerVehicles().success(function(res) {
                                console.log("vahicels", res)
                                $scope.vehicles = {
                                    selectedOption: { Id: res[0].Id, ChassisNumber: res[0].ChassisNumber },
                                    availableOptions: res
                                }
                                $ionicLoading.hide();
                                $scope.final_obj = {};
                                $scope.showAlertVehicle(true);
                            })
                            .error(function(err) {
                                $ionicLoading.hide();
                                $scope.showAlertVehicle(false);
                            })
                    })
                    .error(function(err) {
                        console.log("Err")
                        $ionicLoading.hide();
                        $scope.showAlertVehicle(false);
                    })
            })
            .error(function(err) {
                $scope.showAlertVehicle(false);
            });
    }
    $scope.book = function() {
        $scope.final_obj.TypeOfService = $scope.services.selectedOption.Text;
        $scope.final_obj.CustomerVehicleId = $scope.vehicles.selectedOption.Id;
        $ionicLoading.show();
        Appointment.schedule($scope.final_obj).success(function(res) {
                $ionicLoading.hide();
                $scope.showAlert(true);
            })
            .error(function(err) {
                $ionicLoading.hide();
                $scope.showAlert(false);
            })
    }

    // An alert dialog
    $scope.showAlert = function(check) {
        var alertPopup = $ionicPopup.alert({
            title: check == true ? 'Success!' : 'Error!',
            template: check == true ? 'Your appointment is in process and will receive a confirmation message shortly!' : 'Appointment slot is not available.'
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
            if (check) {
                $rootScope.navigate('main')
            }
        });
    };
})
