<template>
  <div class="sign_up__main">
    <div class="q-pa-md">
      <div class="row">
        <div class="col "></div>
        <div class="col sign_up__card">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-center">login</div>
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="q-pa-lg">
                <q-input
                  filled
                  class="q-mt-sm"
                  type="email"
                  label="email address"
                />

                <q-input
                  filled
                  class="q-mt-sm"
                  type="password"
                  label="confirm passowrd"
                />
                <q-btn
                  color="primary"
                  class="full-width q-mt-sm"
                  label="submit"
                  @click="login"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col "></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SignIn',
  methods:{
      login(){
          this.$router.push('upload-file')
      }
  }
});
</script>

<style scoped>
.sign_up__main {
  background-color: #92cc9312;
  height: 100vh;
}

.sign_up__card {
  margin-top: 10%;
}
</style>
