<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <div class="text-h4">{{ get_branch_name() }} prize list</div>
      <q-separator inset />
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Category</th>
            <th class="text-left">Label</th>
            <th class="text-left">Prize</th>
          </tr>
        </thead>
        <tbody v-if="current_prize_list">
          <tr
            v-for="(prize_list_item, key) in current_prize_list.prize_list_item"
            :key="key"
          >
            <td>{{ prize_list_item.category }}</td>
            <td>{{ prize_list_item.label }}</td>
            <td>{{ prize_list_item.prize }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <div>
            nothing
          </div>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mixins from 'vue-typed-mixins';


import { dashboard } from 'src/mixins/dashboard.mixins';
import {
  get_branch_prizelist,
  get_store_branches
} from 'src/core/request_handler';

export default Vue.extend({
  name: 'PrizeList',
  mixins:[dashboard],
  created() {
    this.get_prize_lists();
  },
  beforeRouteUpdate(to,from,next){
    this.get_prize_lists()
    next()
  },
  methods: {
    async get_prize_lists() {
      this.current_prize_list = null;
      const data = {
        shop_id: this.$data.current_store,
        branch_id: this.$data.current_branch
      };

      this.prize_lists = await get_branch_prizelist(data);

      if (this.prize_lists) {
        for (let i = 0; i <= this.prize_lists.length - 1; i++) {
          if (this.prize_lists[i].active) {
            this.current_prize_list = this.prize_lists[i];
          }
        }
      }
    }
  },
  data() {
    return {
      current_prize_list: null as null | any,
      prize_lists: null as null | any,
    };
  }
});
</script>
