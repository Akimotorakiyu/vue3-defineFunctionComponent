<template>
    <div @click="state++">{{ state }}</div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue'
export default defineComponent({

    setup() {
        const state = ref(0);
        return {
            state
        }
    }
})
</script>