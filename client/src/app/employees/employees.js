angular.module('app.employees', [
  'app.employees.controllers',
  'ui.router',
  'authorization.services'
])

.config(function ($stateProvider, authorizationProvider) {

  $stateProvider
    .state('app.employees', {
      url: '/employees',
      controller: 'EmployeeCtrl',
      controllerAs: 'employeeCtrl',
      templateUrl: 'assets/templates/app/employees/index.html',
      data: {
        section: 'Employees'
      }
    })

    .state('app.employees.detail', {
      url: '/detail/:_id',
      controller: 'EmployeeDetailCtrl',
      controllerAs: 'employeeFormCtrl',
      templateUrl: 'assets/templates/app/employees/form.html',
      data: {
        section: 'Update Employee',
        saveText: 'Update'
      },
      resolve : {
        employee : [
          'data', 
          '$stateParams',
          function (data, $stateParams) {
            return data.get('employees', $stateParams);
          }]
      }
    })

    .state('app.employees.create', {
      url: '/create',
      controller: 'EmployeeCreateCtrl',
      controllerAs: 'employeeFormCtrl',
      templateUrl: 'assets/templates/app/employees/form.html',
      data: {
        section: 'Create Employee',
        saveText: 'Create'
      }
    });
})

.run(function (api) {
  api.add({
    resource: 'employees',
    url: '/users'
  });
});
