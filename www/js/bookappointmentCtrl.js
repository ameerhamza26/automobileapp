app.controller('BookAppointmentCtrl', function($scope, $state, $http, $ionicModal, CityBranchId, Appointment, ionicTimePicker, $stateParams, AppointmentDetail, $rootScope, localStorageService, $ionicLoading) {
    console.log(CityBranchId.get_cityid());
    console.log(CityBranchId.get_branchid());
    var current_date = new Date();


    $scope.disabledDates = getDates(new Date(2016, 3, 18), current_date.subDays(1))
        //.concat(getFridays(new Date(), new Date('2017-04-29T19:00:00.000Z')));
    $scope.disabledDates.push(new Date(2017, 3, 14))
    $scope.disabledDates.push(new Date(2017, 3, 21))
    $scope.disabledDates.push(new Date(2017, 3, 28))
    $scope.disabledDates.push(new Date(2017, 4, 5))
    $scope.disabledDates.push(new Date(2017, 4, 12))
    $scope.disabledDates.push(new Date(2017, 4, 19))
    $scope.disabledDates.push(new Date(2017, 4, 26))
    $scope.disabledDates.push(new Date(2017, 5, 2))
    $scope.disabledDates.push(new Date(2017, 5, 9))
    $scope.disabledDates.push(new Date(2017, 5, 16))
    $scope.disabledDates.push(new Date(2017, 5, 23))
    $scope.disabledDates.push(new Date(2017, 5, 30))
    $scope.disabledDates.push(new Date(2017, 6, 7))
    $scope.disabledDates.push(new Date(2017, 6, 14))
    $scope.disabledDates.push(new Date(2017, 6, 21))
    $scope.disabledDates.push(new Date(2017, 6, 28))
    $scope.disabledDates.push(new Date(2017, 7, 4))
    $scope.disabledDates.push(new Date(2017, 7, 11))
    $scope.disabledDates.push(new Date(2017, 7, 18))
    $scope.disabledDates.push(new Date(2017, 7, 25))
    $scope.disabledDates.push(new Date(2017, 8, 1))
    $scope.disabledDates.push(new Date(2017, 8, 8))
    $scope.disabledDates.push(new Date(2017, 8, 15))
    $scope.disabledDates.push(new Date(2017, 8, 22))
    $scope.disabledDates.push(new Date(2017, 8, 29))
    $scope.disabledDates.push(new Date(2017, 9, 6))
    $scope.disabledDates.push(new Date(2017, 9, 13))
    $scope.disabledDates.push(new Date(2017, 9, 20))
    $scope.disabledDates.push(new Date(2017, 9, 27))
    $scope.disabledDates.push(new Date(2017, 10, 3))
    $scope.disabledDates.push(new Date(2017, 10, 10))
    $scope.disabledDates.push(new Date(2017, 10, 17))
    $scope.disabledDates.push(new Date(2017, 10, 24))
    $scope.disabledDates.push(new Date(2017, 11, 1))
    $scope.disabledDates.push(new Date(2017, 11, 8))
    $scope.disabledDates.push(new Date(2017, 11, 15))
    $scope.disabledDates.push(new Date(2017, 11, 22))
    $scope.disabledDates.push(new Date(2017, 11, 29))

    $scope.dateMin = '2016-12-31';


    if (((new Date()).getMonth() + 2) > 11) {
        if (((new Date()).getMonth() + 2) == 12) {

            $scope.dateMax = ((new Date()).getFullYear() + 1) + '-' + '0' + '-1';
        }

        if (((new Date()).getMonth() + 2) == 13) {
            $scope.dateMax = ((new Date()).getFullYear() + 1) + '-' + '1' + '-1';
        }
    } else {
        $scope.dateMax = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 2) + '-1';
    }

    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate))
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    function getFridays(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            if (currentDate.getDay() == 5) {
                console.log("found friday");
                dateArray.push(new Date(currentDate))
            }
            //dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }



    console.log("date max ---------", $scope.dateMax);
    $scope.dateobj = {};
    $scope.dateobj.date = current_date;
    $scope.hours = 00;
    $scope.minutes = 00;
    $scope.ampm = "AM";
    //console.log(date);
    var getdate = current_date.getDate()
    var month = current_date.getMonth();
    var year = current_date.getFullYear();
    var branchid = $stateParams.branchid;
    $ionicLoading.show();

    Appointment.disableHolidays().success(function(res) {
        console.log("disable holidays", res)
    })
    .error(function(err) {
        console.log("Errr",err)
    })
    Appointment.getAvailableDays(branchid, year, month + 1).success(function(res) {
            console.log(res);
            Appointment.getAvailableSlots(branchid, year, month + 1, getdate).success(function(result) {
                    console.log(result)
                    $rootScope.$broadcast('AVAILABLEDAYS', { data: result });
                    $ionicLoading.hide();
                })
                .error(function(error) {
                    console.log(error)
                    $ionicLoading.hide();
                })
        })
        .error(function(err) {
            console.log(err)
            $ionicLoading.hide();
        })

    var ipObj1 = {
        callback: function(val) { //Mandatory
            console.log(val)
            if (typeof(val) === 'undefined') {
                console.log('Time not selected');
            } else {
                var selectedTime = new Date(val * 1000);
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                var hh = selectedTime.getUTCHours();
                var h = hh;
                dd = "AM";
                if (h >= 12) {
                    h = hh - 12;
                    dd = "PM";
                }
                if (h == 0) {
                    h = 12;
                }
                $scope.hours = h < 10 ? ("0" + h) : h;
                var mm = selectedTime.getUTCMinutes();
                $scope.minutes = mm < 10 ? ("0" + mm) : mm;
                $scope.ampm = dd;
            }
        },
        inputTime: 50400, //Optional
        format: 12, //Optional
        step: 1, //Optional
        setLabel: 'Set' //Optional
    };
    $scope.openTimePicker = function() {
        $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/timemodal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $rootScope.$on('AVAILABLEDAYS', function(event, args) {
        console.log("args ", args)
        $scope.timeslots = [];
        if (args.data != "OffDay") {
            for (var i = 0; i < args.data.length; i++) {
                $scope.timeslots.push(args.data[i]);
                $scope.timeslots[i].isChecked = false;
            }
            $scope.timeslots[0].isChecked = true;
            $scope.hours = $scope.timeslots[0].StartTimeStr.substr(0, 2);
            $scope.minutes = $scope.timeslots[0].StartTimeStr.substr(3, 2);
            $scope.ampm = $scope.timeslots[0].StartTimeStr.substr(6, 2);
            $scope.appointdate = $scope.timeslots[0].AppointmentDate.substr(0, 10);
            $scope.starttime = $scope.timeslots[0].StartTime.substr(0, 10) + " " + $scope.timeslots[i - 1].StartTimeStr;
            $scope.endtime = $scope.timeslots[0].EndTime.substr(0, 10) + " " + $scope.timeslots[i - 1].EndTimeStr;
        }


    })

    $scope.closemodal = function() {
        $scope.modal.hide();
        for (var i = 0; i < $scope.timeslots.length; i++) {
            if ($scope.timeslots[i].isChecked) {
                $scope.hours = $scope.timeslots[i].StartTimeStr.substr(0, 2);
                $scope.minutes = $scope.timeslots[i].StartTimeStr.substr(3, 2);
                $scope.ampm = $scope.timeslots[i].StartTimeStr.substr(6, 2);
                $scope.appointdate = $scope.timeslots[i].AppointmentDate.substr(0, 10);
                $scope.starttime = $scope.timeslots[i].StartTime.substr(0, 10) + " " + $scope.timeslots[i].StartTimeStr;
                $scope.endtime = $scope.timeslots[i].EndTime.substr(0, 10) + " " + $scope.timeslots[i].EndTimeStr;
            }
        }
    }

    $scope.selectTime = function(index) {
        for (var i = 0; i < $scope.timeslots.length; i++) {
            if (i == index) {
                $scope.timeslots[i].isChecked = true;
            } else {
                $scope.timeslots[i].isChecked = false;
            }

        }

    }
    $scope.book = function() {
        console.log("scope.date", $scope.dateobj.date)
        console.log("AppointmentSlot", {
            BranchId: $stateParams.branchid,
            AppointmentDate: $scope.appointdate,
            StartTime: $scope.starttime,
            EndTime: $scope.endtime
        })
        localStorageService.set("AppointmentSlot", {
            BranchId: $stateParams.branchid,
            AppointmentDate: $scope.appointdate,
            StartTime: $scope.starttime,
            EndTime: $scope.endtime
        })

        $rootScope.$broadcast('APPOINTMENTSLOTBOOKED', {
            data: {
                BranchId: $stateParams.branchid,
                AppointmentDate: $scope.appointdate,
                StartTime: $scope.starttime,
                EndTime: $scope.endtime
            }
        })
        $rootScope.navigate('app.appointservice')

        // var date = new Date($scope.dateobj.date);
        // AppointmentDetail.set({
        //     startTime: $scope.hours + ":" + $scope.minutes + " " + $scope.ampm,
        //     location: CityBranchId.get_branchid().BranchName,
        //     day: dayname(date.getDay()),
        //     date: date.getDate(),
        //     month: monthname(date.getMonth())
        // })
    }



})