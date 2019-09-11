/*  Projeto CEP
    Angular JS
    Autor: Matheus Souza
*/

var app = angular.module('cepApp',[])

app.controller('cepController', function($scope, $http){
    $scope.aguarde = false
    $scope.erro = false
    $scope.buscaCep = function(cep){
        $scope.erro = false
        $scope.aguarde = true
        $http({method: 'get', url:'/cep?cep='+cep}).
        then(function (response){
            console.log(response)
            $scope.dados = response.data
            $scope.aguarde = false
            $scope.erro = false
            if (response.data.erro == true){
                console.log('O cep não existe!')
                $scope.erro = true
            }
        },function(error){
            console.log('Erro ao obter o CEP '+error)
        }) //fecha then
    } //fecha buscaCep
    $scope.buscaClima = function(localidade){
        $http({method: 'get', url:'/clima?localidade='+localidade}).
        then(function (response){
            console.log(response)
                $scope.dadosClima = response.data
                if (response.data.erro == true){
                    console.log('Cidade inválida!')
                }
            },function(error){
                console.log('Erro ao obter a Cidade '+error)
            })
         //fecha then
    } //fecha buscaClima
}) //fecha controller