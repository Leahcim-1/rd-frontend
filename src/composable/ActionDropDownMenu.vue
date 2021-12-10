<template>
  <n-dropdown trigger="hover" @select="handleSelect" :options="options">
    <n-button ghost :bordered="false">
      <n-icon color="black">
        <MoreVertOutlined />
      </n-icon>
    </n-button>
  </n-dropdown>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="It takes guts to do this..."
    content="Your sure you want to do this?"
    positive-text="Absolutely"
    @positive-click="() => confirmAction()"
    @negative-click="() => { return }"
    negative-text="No really"
  >
    <template #icon>
      <n-icon color="violet"> 
        <FaceFilled />
      </n-icon>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NDropdown, NButton, MenuOption, NIcon, NModal } from "naive-ui";
import { MoreVertOutlined, FaceFilled } from "@vicons/material";

const EDIT_KEY = "edit";
const DEL_KEY = "del";

const options: MenuOption[] = [
  {
    label: "Edit",
    key: EDIT_KEY,
  },
  {
    label: "Delete",
    key: DEL_KEY,
  },
];

export default defineComponent({
  name: "ActionDropDownMenu",
  components: {
    NDropdown,
    NButton,
    NIcon,
    MoreVertOutlined,
    NModal,
    FaceFilled
  },
  props: {
    rowDelete: {
      type: Function,
      required: true,
    },
    rowEdit: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const selectedKey = ref("")
    const showModal = ref(false)

    return {
      options,
      showModal,
      handleSelect(key: string) {
        selectedKey.value = key
        showModal.value = true
      },
      confirmAction() {
        if (selectedKey.value == EDIT_KEY)
          props.rowEdit()
        else 
          props.rowDelete()
        
        selectedKey.value = ""
        showModal.value = false
      }
    };
  },
});
</script>
