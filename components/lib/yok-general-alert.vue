<template>
  <v-alert :type="type" border="left" colored-border tile dense>
    <v-row align="center">
      <v-col class="grow">
        <div v-html="message" />
      </v-col>
      <v-col v-if="actionFunction !== null" class="shrink">
        <v-btn :color="type" @click="performAction" outlined>
          {{ actionText }}
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'yok-general-alert',
  props: {
    show: { type: Boolean, default: false },
    type: { type: String, default: '' },
    message: { type: String, default: '' },
    actionFunction: { type: [Object, Function, Promise], default: null },
    actionText: { type: String, default: '' },
  },
  computed: {
    console: () => console,
  },
  methods: {
    performAction() {
      if (this.actionFunction !== null) {
        this.actionFunction()
      }
    },
  },
}
</script>

<style></style>
