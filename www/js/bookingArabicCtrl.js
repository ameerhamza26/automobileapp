app.controller('BookingArabicCtrl', ['$scope', 'Appointment', '$ionicLoading', function($scope, Appointment, $ionicLoading) {
        console.log('helo')
        $scope.appointments = [];
        var pageNumber = 0;
        var pageSize = 4;
        $scope.isappoinment = true;
        $scope.noMoreAppointment = true;
        $scope.showEmptyData = false;
        $scope.getMoreAppointment = function(start) {
            console.log("hello")
            var _start = start || false
            $ionicLoading.show();
            
            Appointment.get(pageNumber, pageSize).success(function(res) {
                    $ionicLoading.hide();
                    if (res.length > 0) {
                        $scope.isappoinment = false;
                        console.log(res)
                        if (_start) {
                            $scope.appointments = [];
                        }
                        if (res.length < pageSize) {
                            $scope.noMoreAppointment = false;
                        }
                        for (var i = 0; i < res.length; i++) {
                            var date = new Date(res[i].AppointmentDate);
                            $scope.appointments.push({ startTime: res[i].StartTimeStr, location: res[i].BranchName, day: dayname(date.getDay()), date: date.getDate(), month: monthname(date.getMonth()) })
                        }
                        pageNumber = pageNumber + 1;
                        if (_start) {
                            $scope.$broadcast('scroll.refreshComplete');
                            //$scope.$apply()
                        } else {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    } else {
                        $scope.showEmptyData = true;
                    }
                })
                .error(function(err) {
                    console.log(err)
                    $ionicLoading.hide();
                })
        }

        $scope.doRefresh = function() {
            console.log("in do refresh")
            pageNumber = 0;
            $scope.getMoreAppointment(true);
            $scope.noMoreAppointment = true
        }
 
        $scope.doRefresh();
    }])