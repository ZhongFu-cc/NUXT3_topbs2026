<template>
  <el-input v-model="model" :placeholder="field.placeholder ?? ''" />
</template>

<script setup lang="ts">
import type { FormField } from '@/components/formField/type'

const props = defineProps<{
  modelValue: string
  field: FormField
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>