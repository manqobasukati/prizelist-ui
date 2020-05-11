import Vue from 'vue';
import { get_store_branches, get_branch_prizelist } from '../core/request_handler'

export const dashboard = Vue.extend({
  beforeRouteUpdate(to, from, next) {
    this.$data.current_branch = Number(to.query.branch_id);
    this.$data.current_store = Number(to.query.store_id);
    
    next();
  },
  created() {
    this.current_branch = Number(this.$route.query.branch_id);
    this.current_store = Number(this.$route.query.store_id);
    this.get_store_branches();
  },

  methods: {
    get_branch_name() {
        if(this.store_branches){
            return this.store_branches.find((branch: any) => {
              return branch.id === this.current_branch;
            }).name;
        }
      },
    async get_store_branches() {
        const data = {
          shop_id: this.current_store
        };
        this.store_branches = await get_store_branches(data);
        console.log(this.store_branches);
      },

    },
  data() {
    return {
      store_branches:null as null | any,
      current_branch: 1,
      current_store: 1,
      prize_lists:null as null | any,
      current_prize_list: null as null | any
    };
  }
});
