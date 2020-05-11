<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-white shadow-2">
        <q-select
          dark
          dense
          outlined
          standout
          :options="branches"
          v-model="branch"
          label="Select branch"
          input-class="text-right"
          class="q-ml-md"
         />
       
        <q-space />
        <q-btn-toggle
          @click="change_navigation"
          v-model="current"
          flat
          stretch
          toggle-color="yellow"
          :options="options"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { NavigationList } from '../config';
import { get_store_branches } from 'src/core/request_handler';
import { build_tree_nodes, router_get_last_part } from 'src/core/helpers';

export default Vue.extend({
  name: 'DashoardLayout',
  data() {
    return {
      current: 'upload-file',
      options: NavigationList,
      branches:[],
      branch:'',
      drawer: false,
      miniState: false,
      current_store: 1,
      current_branch: 1,
      selected: '',
    
    };
  },
  created() {
    this.get_branches();
  },
  methods: {
    changeScope(id: any) {
      const current_route = router_get_last_part(this.$route.path);

      this.$router.push({
        path: current_route,
        query: { branch_id: id, store_id: `${this.current_store}` }
      });
    },
    change_navigation() {
      const current_route = router_get_last_part(this.$route.path);
      const id = this.current_branch;
      this.$router.push({
        path: this.current,
        query: { branch_id: `${id}`, store_id: `${this.current_store}` }
      });
    },
    async get_branches() {
      const data = {
        shop_id: 1,
        another_one:1
      };
    
      this.branches = await get_store_branches(data);
      
    
    }}
});
</script>
