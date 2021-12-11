<template>
  <div id="lists-table">
    <n-data-table 
      :columns="col" 
      :data="data" 
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NDataTable } from 'naive-ui'

export default defineComponent({
  props: {
    lists: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
  },
  components: {
    NDataTable
  },
  setup(props) {
    return {
      pagination: {
        pageSize: 5,
      }, 
      data: computed(() => props.lists),
      col: computed(() => props.columns),

    }
  },
})
</script>
