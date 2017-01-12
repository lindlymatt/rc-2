(function () {
  'use strict'

  angular.module('app')
    .component('postList', {
      templateUrl: 'js/posts/post-list.template.html',
      controller: controller
    })

  controller.$inject = ['$http'];

  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.showHideForm = showHideForm
    vm.createPost = createPost
    vm.createPostComment = createPostComment
    vm.votePostUp = votePostUp
    vm.votePostDown = votePostDown

    function onInit() {
      // Gets the Posts from the Database.
      $http.get('api/posts').then(results => {
        vm.posts = results.data;
      });
    }

    function showHideForm() {
      vm.postCreation = !vm.postCreation
    }

    function createPost() {
      vm.post.vote_count = 0
      vm.post.created_at = new Date
      vm.post.comments = []
      // Creates the new post in the database.
      $http.post('api/posts', vm.post).then(results => {
        results.data.comments = [];
        vm.posts.push(results.data);
        delete vm.post
      });
      vm.showHideForm()
    }

    function createPostComment(post) {
      $http.post(`api/posts/${post.id}/comments`, post.comment).then(results => {
        console.log(post.comment);
        post.comments.push(results.data)
        delete post.comment
      });
    }

    function votePostUp(post) {
      $http.post(`api/posts/${post.id}/votes`).then(results => {
        post.vote_count = results.data.vote_count
      })
    }

    function votePostDown(post) {
      if (post.vote_count === 0)
        return
      $http.delete(`api/posts/${post.id}/votes`).then(results => {
        post.vote_count = results.data.vote_count
      })
    }
  }

}());
