<template>
    <div>
        <h1>{{ title }}</h1>
        <n-divider></n-divider>
    </div>
</template>
<script>
import { NDivider } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'HomeHeader',
    components: {
        NDivider
    },
    setup() {
        const title = ref('Robot Daily')
        return {
            title
        }
    }
})
</script>
<style lang="">
    
</style>