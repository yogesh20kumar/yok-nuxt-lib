<template>
  <client-only>
    <div
      class="yok-left-sidebar-tool-list"
      :class="navType == 'page' ? 'overflow-hidden' : ''"
    >
      <div class="list-section">
        <v-list
          dense
          class="pa-0"
          :class="navType == 'page' ? 'mt-12' : 'mt-0'"
        >
          <v-subheader
            v-show="expanded"
            class="mb-2 pl-9 text-body-2 font-weight-medium text-uppercase list-title"
            :class="Number(keyInfo) !== 0 ? 'mt-3' : ''"
            >{{ items.title }}</v-subheader
          >
          <v-list-item-group v-model="activeList">
            <template v-for="(item, i) in getActiveItems">
              <v-list-item
                :key="`list-${i}`"
                :value="item"
                :to="item.action"
                :ripple="false"
                :class="
                  navType != 'page' &&
                  sidebar !== undefined &&
                  sidebar.title == item.title
                    ? 'custom-active-list'
                    : 'custom-list'
                "
                class="list-effect pl-9 pr-4 mb-2"
                @click="setValue(item)"
              >
                <v-tooltip
                  v-if="!expanded"
                  top
                  nudge-top="-17"
                  nudge-left="-40"
                  z-index="99"
                  content-class="custom-tooltip"
                  color="#666"
                >
                  <template #activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-list-item-icon v-if="item.icon">
                        <v-icon size="36" v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-icon v-else>
                        <v-img width="18" src="/vuetify-logo.svg" />
                      </v-list-item-icon>
                    </div>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
                <div v-if="expanded">
                  <v-list-item-icon v-if="item.icon">
                    <v-icon size="36" v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-icon v-else>
                    <v-img width="18" src="/vuetify-logo.svg" />
                  </v-list-item-icon>
                </div>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon
                    size="18"
                    color="#9F9F9F"
                    class="mt-2"
                    v-text="item.actionIcon"
                  ></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <v-divider
          v-show="!expanded && navType != 'page'"
          class="mb-2"
        ></v-divider>
      </div>
    </div>
  </client-only>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'yok-left-sidebar-tool-items',
  props: {
    keyInfo: {
      type: String,
      default: '0',
    },
    navType: {
      type: String,
      default: 'page',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      activeList: null,
      sidebarDefaultObj: {
        icon: null,
        title: null,
        action: null,
        actionIcon: null,
        active: null,
      },
    }
  },
  computed: {
    getActiveItems() {
      return this.items.data.filter((item) => {
        return item.active !== false
      })
    },
    pluginOptions() {
      // _yokOptions will be added as a prop on component registration.
      // it will be the plugin's options object
      return this._yokOptions || {}
    },
    // helper to get the name of our injected plugin using the namespace option
    injectedPluginName() {
      const { pluginOptions } = this
      return pluginOptions.namespace ? '$' + pluginOptions.namespace : undefined
    },
    // helper to return the current value of the counter using our injected plugin function
    lock() {
      const { injectedPluginName } = this
      return injectedPluginName ? this[injectedPluginName].lock() : undefined
    },
    sidebar() {
      const { injectedPluginName } = this
      return injectedPluginName ? this[injectedPluginName].sidebar() : undefined
    },
  },
  watch: {
    items() {
      this.activeList = null
    },
    lock: {
      immediate: true,
      handler(lock) {
        const lockKey = this.items.data
          .map(function (dt) {
            return dt.action
          })
          .indexOf('/#lock')
        if (lockKey !== -1) {
          this.items.data[lockKey].icon = lock ? 'mdi-lock' : 'mdi-lock-open'
          this.items.data[lockKey].title = lock
            ? 'Unlock sidebar'
            : 'Lock sidebar'
        }
      },
    },
  },
  methods: {
    setValue(objVal) {
      if (objVal.action !== undefined && objVal.action === '/#lock') {
        this.lockAction()
        return
      }
      const { injectedPluginName } = this
      this[injectedPluginName].setSidebar(this.sidebarDefaultObj)
      if (objVal.action !== undefined) {
        this[injectedPluginName].setSidebar(objVal)
      }
    },
    lockAction() {
      const { injectedPluginName } = this
      const isLocked = injectedPluginName
        ? this[injectedPluginName].lock()
        : false
      this[injectedPluginName].setLock(!isLocked)
    },
  },
}
</script>
<style scoped>
.yok-left-sidebar-tool-list >>> .v-list--dense .v-list-item .v-list-item__icon {
  height: auto;
  margin-top: 10px;
  margin-bottom: 8px;
}
.yok-left-sidebar-tool-list
  >>> .list-effect
  .v-image.v-responsive.theme--light {
  max-width: inherit;
}
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item.custom-active-list
  .v-image__image {
  opacity: 0.87;
}
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item.custom-active-list
  .v-icon::before {
  color: #000000;
}
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item:hover
  .v-list-item__title,
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item:hover
  .v-icon::before {
  color: #000000;
}
.yok-left-sidebar-tool-list .v-subheader {
  height: 14px;
}
</style>
