<template>
    <div>
        <div @click="() => {
            show = !show
        }
        ">show</div>
        <Counter v-if="show"></Counter>
        <Counter></Counter>
        <Counter></Counter>
        <Counter v-if="show"></Counter>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue'
import Counter from "./Counter.vue"
export default defineComponent({
    components: {
        Counter
    },
    setup() {
        const show = ref(true);
        return {
            show
        }
    }
})
</script>