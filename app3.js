(function(){
	'use strict';
	
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems',foundItems);


	function foundItems(){
		var ddo={
			scope:{
				items: '<',
      			onRemove: '&'
			},
			//controller: NarrowItDownController,
			//controllerAs:'kontroler',
			//bindToController:true,
			templateUrl: 'foundItems.html'
		};
		return ddo;
	}


	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var kontroler=this;
		var searchTerm="";
		kontroler.pokusao=function(){
			console.log("Stisnuo si gumb! Napisao si "+kontroler.searchTerm);
			kontroler.items=MenuSearchService.getMatchedMenuItems(kontroler.searchTerm);
			console.log("Dohvaćena jela:");

			/*Ovdje treba naći kako dohvatiti value iz $$state, tamo su dohvaćena jela.*/
			console.log(kontroler.items.$$state);
			}
		};

	MenuSearchService.$inject=['$http'];
	function MenuSearchService($http){
		var service=this;
		service.nadjeno=[];

		service.getMatchedMenuItems=function(searchTerm){
			
			return $http({
				method: "GET",
				url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
			}).then(function(result){
				var jela=result.data;
				for (var i=0; i<jela.menu_items.length; i++){
					if(jela.menu_items[i].name.toLowerCase().indexOf(searchTerm)!==-1){
						service.nadjeno.push(jela.menu_items[i]);
					}
				}
				console.log("Nađena jela:");
				console.log(service.nadjeno);
				return service.nadjeno;
			});
		}		
	}
})();
