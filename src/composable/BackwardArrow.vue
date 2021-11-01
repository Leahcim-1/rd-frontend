<template>
<div @click="goToBackward">
  <Icon :size='size'>
    <ArrowBackIosNewTwotone/>
  </Icon>
</div>

</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@vicons/utils'
import { ArrowBackIosNewTwotone } from '@vicons/material'

export default defineComponent({
  components: {
    Icon,
    ArrowBackIosNewTwotone,
  },
  props: {
    size: {
      type: Number,
      default: 18
    }
  },
  setup(props) {
    const router = useRouter()
    const size = ref(18)
    const goToBackward = () =>{ 
      router.back()
    }

    onMounted(() => size.value = props.size)

    return {
      goToBackward,
    }
  }
})
</script>
<style lang="">
  
</style>