<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-white shadow-2">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

        
        <q-input
          class="q-mr-lg"

          label="branch name"
        >
       
        </q-input>
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

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        
        <q-list>
          <q-item-label header>Branches</q-item-label>
          <q-item
            clickable
            v-ripple
            v-for="(menuItem, index) in store_branches"
            :key="index"
            
            @click="changeScope(menuItem.id)"
          >
            <q-item-section>
              {{ menuItem.name }}
            </q-item-section>
            <q-separator v-if="menuItem.separator" />
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

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
      drawer: false,
      miniState: false,
      store_branches: [],
      current_store: 1,
      current_branch:1,
      selected: '',
      nodes: []
    };
  },
  beforeMount() {
    this.get_store_branches();
  },
  methods: {
    changeScope(id:any) {
      const current_route = router_get_last_part(this.$route.path);
  
      this.$router.push({path:current_route,query: { branch_id: id, store_id:`${this.current_store}` }});
    },
    change_navigation() {
       const current_route = router_get_last_part(this.$route.path);
       const id = this.current_branch;
       this.$router.push({path:this.current,query: { branch_id: `${id}`,store_id:`${this.current_store}`  }});
    },
    async get_store_branches() {
      const data = {
        shop_id: 1
      };

      this.store_branches = await get_store_branches(data);

      this.nodes = build_tree_nodes(this.store_branches);
    },
    drawerClick(e: Event) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation();
      }
    }
  }
});
</script>
