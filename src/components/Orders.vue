<template>
    <div>
        <span class="text-h4">Orders for {{get_branch_name()}} branch</span>
        <q-separator inset/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { dashboard } from 'src/mixins/dashboard.mixins';

export default Vue.extend({
    name:'Orders',
    mixins:[dashboard]
})
</script>