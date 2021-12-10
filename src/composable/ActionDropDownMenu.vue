<template>
  <n-dropdown trigger="hover" @select="handleSelect" :options="options">
    <n-button> Action </n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { NDropdown, NButton, MenuOption } from 'naive-ui'


const EDIT_KEY = 'edit'
const DEL_KEY = "del"

const options: MenuOption[] = [
  {
   label: "Edit",
   key: EDIT_KEY, 
  },
  {
   label: "Delete",
   key: DEL_KEY, 
  },
]

export default defineComponent({
  name: "ActionDropDownMenu",
  props: {
    rowDelete: {
      type: Function,
      required: true,
    }, 
    rowEdit: {
      type: Function,
      required: true,
    }
  },
  components: {
    NDropdown,
    NButton
  },
  setup(props) {    
    return {
      options,
      handleSelect(key: string) {
        if (key == EDIT_KEY) 
          props.rowEdit()
        else 
          props.rowDelete()
      }
    }
  }
})
</script>
