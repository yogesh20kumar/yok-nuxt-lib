<template>
  <v-btn-toggle v-model="text" tile group>
    <v-tooltip
      v-for="(item, i) in items"
      :key="i"
      content-class="custom-tooltip"
      nudge-top="5"
      z-index="99"
      bottom
    >
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                class="btn-effect btn-icon rounded-circle mx-1"
                height="50"
                width="50"
                min-width="50"
                icon
                v-bind="attrs"
                v-on="on"
                @click.stop="callBack(item)"
              >
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </template>
            <v-list
              v-if="item.subMenu !== undefined && item.subMenu.length >= 1"
              class="measure-dropdown"
            >
              <v-list-item
                v-for="(menu, index) in item.subMenu"
                :key="index"
                @click.stop="callBack(menu)"
              >
                <v-list-item-title>
                  <v-icon>mdi-check</v-icon>
                  {{ menu.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <span>{{ item.title }}</span>
    </v-tooltip>
  </v-btn-toggle>
</template>
<script>
export default {
  name: 'yok-tool-btn',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    callBack(item) {
      if (item.subMenu !== undefined && item.subMenu.length >= 1) return
      this.$emit('tool-action', item)
    },
  },
}
</script>
