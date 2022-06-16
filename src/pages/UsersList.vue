<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChange">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return { changedSave: false };
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChange() {
      this.changedSave = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UserList Cmp beforRouterEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserLists Cmp BeforeLeave');
    console.log(to, from);
    if (this.changedSave) {
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantsToLeave);
    }
  },
  unmounted() {
    console.log('Unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
