<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

interface Props {
    label: string
    type: InputTypeHTMLAttribute
    disabled?: boolean;
    isTextArea?: boolean;
    rows?: number
}
defineProps<Props>();

const value = defineModel<number | string | null>();

</script>
<template>
    <div class="flex flex-col w-full">
        <label class="truncae whitespace-nowrap">{{ label }}</label>
        <input v-model="value" v-if="!isTextArea" :disabled="disabled" :type="type"
            class="outline-none w-full border border-gray-200 rounded-sm mt-2 py-2 px-2" />
        <textarea v-else :rows="rows" v-model="value"
            class="outline-none w-full border border-gray-200 rounded-sm mt-2 py-2 px-2" />
    </div>
</template>