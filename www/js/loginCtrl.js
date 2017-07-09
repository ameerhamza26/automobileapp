app.controller('LoginCtrl', function($scope, $rootScope, $state, User, PormotionsOffers, localStorageService, $ionicLoading, $ionicPopup, Cities) {
    $scope.user = {};
    //$scope.user.username = '0557613133';
    //$scope.user.password = '123456';
    // $scope.user.username='966';
    // $scope.changeUsername=function(){
    //     if($scope.user.username.indexOf('966')!==0){
    //         $scope.user.username="966";
    //     }
    // }
    Cities.getCities();


    $scope.$on("$ionicView.beforeEnter", function(event, data) {
        // handle event
        console.log("local storage data", localStorageService.get("loggedInUser"));
        if (localStorageService.get("loggedInUser") != null) {
            $rootScope.navigate("main")
        }

    });


    //var params = "grant_type=password&username=0557613133&password=123456&client_id=Android02&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1"

    $scope.login = function(data) {
            console.log(data)
            localStorageService.remove("access_token");
            localStorageService.remove("loggedInUser");
            localStorageService.remove("userimage");
            var params = {
                'grant_type': 'password',
                'username': $scope.user.username,
                'password': $scope.user.password,
                'client_id': 'Android02',
                'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
                'scope': 'app1'
            };
            $ionicLoading.show({
                content: '',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            console.log("params", params)
            User.login(params).success(function(res) {
                    //console.log(res);

                    if (localStorageService.isSupported) {
                        localStorageService.set("access_token", res.access_token);
                        console.log("access_token", res.access_token);
                        User.getUser().success(function(res) {
                                //console.log(res)
                                $ionicLoading.hide();
                                loggedInUser = { user: res }
                                console.log("result user is ", res)
                                $rootScope.name = res.FirstName;
                                localStorageService.set("loggedInUser", loggedInUser);

                                if (res.IsVerified == false) {
                                    $rootScope.navigate('smsverify');
                                } else {
                                    $rootScope.navigate('main')
                                }
                            
                        })
                    .error(function(err) {
                            console.log(err);
                            PormotionsOffers.getSaleAgent().success(function(res) {
                                    loggedInUser = { user: res }
                                    $rootScope.name = res.FirstName;
                                    localStorageService.set("loggedInUser", loggedInUser);
                                    console.log(res);
                                    $ionicLoading.hide();
                                    $rootScope.navigate('agentmain')
                                })
                                .error(function(err) {
                                    $ionicLoading.hide();
                                })

                        })
                        //
                }
            })
        .error(function(err) {
            //console.log(err);
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Error',
                template: 'Invalid Username/Password!'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    //console.log('You are sure');
                } else {
                    //console.log('You are not sure');
                }
            });
        })
}
//$scope.get_value=function(lng){
//  console.log(lng);
$scope.obj = {};
if (localStorageService.get("PageLangue") != null) {
    $scope.obj.lng = localStorageService.get("PageLangue") == "ar" ? true : false;
} else {
    localStorageService.set('PageLangue', 'en');
}

$scope.get_value = function(value1) {
    console.log($scope.obj.lng)
    if ($scope.obj.lng) {
        localStorageService.set('PageLangue', 'ar');
    } else {
        localStorageService.set('PageLangue', 'en');
    }

}

//  }

$scope.go = function(language) {
    console.log(language)
    localStorageService.set('PageLangue', language);
}

})
