<template>
  <v-select class="icon-picker" v-model="icon" :options="options">
    <template #option="option">
      <div class="icon-picker__option">
        <div class="icon-picker__image-container">
          <img :src="option.image" :alt="option.name" class="icon-picker__image">
        </div>
        <div class="icon-picker__text">{{ option.label }}</div>
      </div>
    </template>

    <template #selected-option="option">
      <div class="icon-picker__option">
        <div class="icon-picker__image-container">
          <img :src="option.image" :alt="option.name" class="icon-picker__image">
        </div>
        <div class="icon-picker__text">{{ option.label }}</div>
      </div>
    </template>
  </v-select>
</template>
<script>
export default {
  name: "IconPicker",
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      icon: null
    }
  },
  watch: {
    icon () {
      this.$emit('icon-changed', this.icon)
    }
  }
}
</script>