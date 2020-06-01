<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-white shadow-2">
        <q-select
          dark
          dense
          outlined
          standout
          :options="toLocalBranches()"
          v-model="branch"
          label="Select branch"
          input-class="text-right"
          class="q-ml-md"
          @input="changeBranch()"
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
import { dashboard } from 'src/mixins/dashboard.mixins'

export default Vue.extend({
  name: 'DashoardLayout',
  mixins:[dashboard],
  data() {
    return {
      name:'manqoba',
      current: 'upload-file',
      options: NavigationList,
      branch:null as null | any,
      drawer: false,
      selected: '',
    
    };
  },
  methods: {
    toLocalBranches(){

        if(this.$data.store_branches){

          const branches = this.$data.store_branches.map((branch:any)=>{
          
              const b = {
                id:branch.id,
                label:branch.name,
                value:branch
              }
              return b;
              
          });

          return branches;
        }

       
    },
    changeBranch(){
      const current_route = router_get_last_part(this.$route.path);
      console.log(this.branch)
      this.$router.push({
        path: current_route,
        query: { branch_id: this.branch.id, store_id: `${this.$data.current_store}` }
      });
    },
    changeScope(id: any) {
      const current_route = router_get_last_part(this.$route.path);

      this.$router.push({
        path: current_route,
        query: { branch_id: id, store_id: `${this.$data.current_store}` }
      });
    },
    change_navigation() {
      const current_route = router_get_last_part(this.$route.path);
      const id = this.$data.current_branch;
      this.$router.push({
        path: this.current,
        query: { branch_id: `${id}`, store_id: `${this.$data.current_store}` }
      });
    },
  }
});
</script>
