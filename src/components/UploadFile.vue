<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <div class="text-h4">
        Upload prize list for {{ get_branch_name() }} branch
      </div>
      <q-separator inset />
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <div class="upload_file__input">
            <q-card>
              <q-card-section>
                <span class="text-h6 text-center">Upload prize list</span>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <q-file
                  outlined
                  v-model="file"
                  @input="change_file"
                  label="Prize list here"
                />
                <q-input
                  v-model="date_valid_to"
                  type="date"
                  label="Date valid to"
                />
                <q-btn
                  color="secondary"
                  class="full-width q-mt-sm q-pa-sm"
                  label="submit"
                  @click="upload_file"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  upload_branch_prize_list,
  get_store_branches
} from 'src/core/request_handler';
import { dashboard } from 'src/mixins/dashboard.mixins';

export default Vue.extend({
  name: 'UploadFile',
  props: ['branch_id'],
  mixins: [dashboard],

  methods: {
    change_file(file: File) {
      this.file = file;
    },
    async upload_file() {
      const data = {
        shop_id: this.$data.current_store,
        branch_id: this.$data.current_branch,
        file: this.file,
        date_valid_to: this.date_valid_to,
        active: true
      };

      const response = await upload_branch_prize_list(data);
    }
  },
  data() {
    return {
      upload_url: null as null | string,
      date_valid_to: null as null | Date,
      file: null as null | any
    };
  }
});
</script>

<style scoped>
.upload_file__input {
  margin-top: 100px;
}
</style>
