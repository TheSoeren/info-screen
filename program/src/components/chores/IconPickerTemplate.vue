<template>
  <div :class="['icon-picker__option', { 'v-chip theme--light v-size--default': chips }]">
    <div class="icon-picker__image-container">
      <v-img :src="item.image" :alt="item.name" contain></v-img>
    </div>
    <div class="icon-picker__text">{{ item.label }}</div>
</div>
</template>
<script>
export default {
  name: 'IconPickerTemplate',
  props: {
    item: {
      type: Object,
      required: true
    },
    chips: {
      type: Boolean,
      default: false
    }
  }
}
</script>
