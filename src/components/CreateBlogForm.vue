<template>
  <div class="create-blog-form">
    <n-card title="Post New Blog">
      <template #header-extra> </template>
      <n-form
        :model="blogForm"
        :rules="rules"
        label-placement="top"
        :label-width="160"
        :style="{
          maxWidth: '720px',
        }"
        ref="formRef"
      >
        <n-form-item
          v-for="item in formMapper"
          :key="item.key"
          :label="item.label"
        >
          <n-input
            v-model:value="blogForm[item.key]"
            :placeholder="item.placeholder"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button secondary strong @click="submitHandler">
          <template #icon>
            <FileUploadFilled />
          </template>
          Post
        </n-button>
      </template>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  NForm,
  NFormItem,
  FormRules,
  NInput,
  NCard,
  NButton,
  useMessage,
} from "naive-ui";
import { FileUploadFilled } from "@vicons/material";
import { Blog } from "../type/blog";
import { postBlog } from "../api/index";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NInput,
    NCard,
    NButton,
    FileUploadFilled,
  },
  setup() {
    const formRef = ref(null);

    const formMapper = [
      {
        key: "title",
        label: "Title",
        placeholder: "Crazy Day",
      },
      {
        key: "subtitle",
        label: "Subtitle",
        placeholder: "Crazy Day",
      },
      {
        key: "body",
        label: "Body",
        placeholder: "Crazy Day",
      },
      {
        key: "tag",
        label: "Tag",
        placeholder: "Crazy Day",
      },
    ];

    const blogForm = ref<Partial<Blog>>({
      title: "",
      subtitle: "",
      body: "",
      tags: "",
    });

    const rules = ref<FormRules>({
      title: {
        required: true,
        message: "What kinds of Blog have not Title?",
        trigger: "blur",
      },
      subtitle: {
        required: true,
        message: "What kinds of Blog have not Subtitle?",
        trigger: "blur",
      },
      body: {
        required: true,
        message: "What kinds of Blog have not Body?",
        trigger: "blur",
      },
      tags: {
        required: false,
      },
    });

    const submitHandler = async () => {
      let valid = true;

      // eslint-disable-next-line
      // @ts-ignore
      formRef.value.validate((err) => {
        if (err) valid = false;
      });

      if (!valid) {
        console.log("Invalid");
        return;
      }
    };

    return {
      formRef,
      blogForm,
      rules,
      formMapper,
      submitHandler
    };
  },
});
</script>

<style lang="scss">
.create-blog-form .n-card {
  display: flex;
}
</style>
