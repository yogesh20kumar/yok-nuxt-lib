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
                  getYokLeftSidebarObj !== undefined &&
                  getYokLeftSidebarObj.title == item.title
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
import { mapGetters } from "vuex";
export default {
  name: "yok-left-sidebar-tool-items",
  props: {
    keyInfo: {
      type: String,
      default: "0",
    },
    navType: {
      type: String,
      default: "page",
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => {
        return {};
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
    };
  },
  computed: {
    ...mapGetters(["getYokLeftSidebarObj", "getYokSidebarLock"]),
    getActiveItems() {
      return this.items.data.filter((item) => {
        return item.active !== false;
      });
    },
  },
  watch: {
    items() {
      this.activeList = null;
    },
    getYokSidebarLock: {
      immediate: true,
      handler(lock) {
        const lockKey = this.items.data
          .map(function (dt) {
            return dt.action;
          })
          .indexOf("/#lock");
        if (lockKey !== -1) {
          // eslint-disable-next-line vue/no-mutating-props
          this.items.data[lockKey].icon = lock ? "mdi-lock" : "mdi-lock-open";
          // eslint-disable-next-line vue/no-mutating-props
          this.items.data[lockKey].title = lock
            ? "Lås sidemenuen op"
            : "Lås sidemenu";
        }
      },
    },
  },
  methods: {
    setValue(objVal) {
      if (objVal.action !== undefined && objVal.action === "/#lock") {
        this.lockAction();
        return;
      }
      this.$store.commit("setYokLeftSidebarObj", this.sidebarDefaultObj);
      if (objVal.action !== undefined) {
        this.$store.commit("setYokLeftSidebarObj", objVal);
      }
    },
    lockAction() {
      const isLocked = !this.$store.state.yokSidebarLock;
      this.$store.commit("setYokSidebarLock", isLocked);
    },
  },
};
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
  color: #000000 !important;
}
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item:hover
  .v-list-item__title,
.yok-left-sidebar-tool-list
  >>> .list-section
  .list-effect.theme--light.v-list-item:hover
  .v-icon::before {
  color: #000000 !important;
}
.yok-left-sidebar-tool-list .v-subheader {
  height: 14px;
}
</style>
