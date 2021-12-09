<template>
  <n-pagination
    id="pagination" 
    v-model:page="page" 
    :page-count="pageCount" 
    :page-slot="7"
    show-size-picker
    :page-size="pageSize"
    :page-sizes="[1, 5, 10]"
    :default-page-size="pageSize"
    
    :on-update:page-size="pageSizeHandler"
    :on-update:page="pageHandler"
  />
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { NPagination } from 'naive-ui' 
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    NPagination,
  },
  setup () {
    const store = useStore()

    const pageSizeHandler = (pageSize) => {
      store.commit('changePageSize', pageSize)
    }

    const pageHandler = (page) => {
      store.commit('changePage', page)
    }
    
    return {
      page: computed(() => store.getters.page),
      pageCount: computed(() => store.getters.pageCount),
      pageSize: computed(() => store.getters.pageSize),
      pageSizeHandler,
      pageHandler
    }
  }
})
</script>