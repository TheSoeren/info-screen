<template>
  <div class="info-screen">
    <div class="app-list">
      <router-link class="app-list__app app-list__app--chores" to="/">
      </router-link>
      <router-link class="app-list__app app-list__app--chores" to="/chores">
        <img class="app-list__icon" :src="require('/src/img/chores/task_list.svg')" alt="chores">
      </router-link>
    </div>
    <div class="app-detail">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
