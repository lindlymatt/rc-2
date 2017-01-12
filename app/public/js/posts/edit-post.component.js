(function () {
  'use strict'

  angular.module('app')
    .component('editPost', {
      templateUrl: 'js/posts/edit-post.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state'];

  function controller($http, $stateParams, $state) {
    const vm = this
    const postId = $stateParams.postId;

    vm.$onInit = onInit
    vm.submitEditedPost = submitEditedPost

    function onInit() {
      $http.get(`/api/posts/${postId}`).then(results => {
        vm.post = results.data;
      });
    }

    function submitEditedPost() {
      // Creates the new post in the database.
      $http.patch(`/api/posts/${postId}`, vm.post).then(results => {
        $state.go('home');
        delete vm.post
      });
    }
  }

}());
