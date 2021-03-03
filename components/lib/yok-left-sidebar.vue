<template>
  <div class="yok-left-sidebar">
    <yok-left-sidebar-tool
      :nav-items="getNavItems"
      :left-space="configNavWidth"
      :common-nav-items="sidebarCommonNavItems"
      :config-drawer="configDrawer"
      @change-tool-mini-variant="getToolMiniVariantStatus($event)"
    />
  </div>
</template>
<script>
const CONFIG_NAV_WIDTH = 0
export default {
  name: 'yok-left-sidebar',
  props: {
    sidebarNavItems: {
      type: Array,
      default: () => [],
    },
    sidebarCommonNavItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drawerType: 'basic', // (basic or tabs)
      configNavWidth: CONFIG_NAV_WIDTH,
      configDrawer: true,
      fixed: false,
      configTab: 0,
      configMiniVariant: false,
      configToolList: [],
    }
  },
  computed: {
    getNavItems() {
      return this.sidebarNavItems.length > 0 &&
        this.sidebarNavItems[this.configTab].data
        ? this.sidebarNavItems[this.configTab].data
        : []
    },
  },
  watch: {
    configMiniVariant(isMini) {
      this.configNavWidth = isMini ? 0 : CONFIG_NAV_WIDTH
      this.$emit('changeMiniVariant', isMini)
    },
  },
  methods: {
    getToolMiniVariantStatus(isMini) {
      this.configMiniVariant = isMini
    },
  },
}
</script>
