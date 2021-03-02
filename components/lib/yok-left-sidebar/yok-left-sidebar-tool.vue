<template>
  <div
    class="yok-left-sidebar-tool"
    @mouseover="expandedHover = true"
    @mouseleave="expandedHover = false"
  >
    <v-card class="rounded-0">
      <v-navigation-drawer
        v-model="drawer.mainDrawer"
        :mini-variant="drawer.miniVariant"
        :mini-variant-width="drawer.miniVariantWidth"
        :clipped="drawer.clipped"
        :expand-on-hover="drawer.expandOnHover"
        :width="drawer.toolBarWidth"
        :style="{ left: leftSpace + 'px' }"
        :class="isExpanded ? 'expanded-nav' : ''"
        fixed
        floating
        permanent
        class="mx-auto overflow-visible"
        @transitionend="drawerHandler"
      >
        <div class="closer-icon mt-12">
          <v-btn-toggle tile>
            <v-btn
              class="pa-0 closer-btn"
              :color="!expandedHover ? '#666666' : '#222222'"
              @click.stop="fullExpand"
            >
              <v-icon size="30" color="white"
                >mdi-{{ `chevron-${isExpanded ? "left" : "right"}` }}</v-icon
              >
            </v-btn>
          </v-btn-toggle>
        </div>
        <v-card class="mx-auto mt-12" flat tile>
          <v-subheader
            v-show="!isExpanded"
            class="mb-2 justify-center text-body-2 font-weight-medium text-uppercase list-title"
            >menu</v-subheader
          >
          <yok-left-sidebar-tool-items
            v-for="(navItem, i) in navItems"
            :key="`listbar-${i}`"
            :key-info="`${i}`"
            :items="navItem"
            :expanded.sync="isExpanded"
            nav-type="list"
          />
        </v-card>
        <template #append>
          <yok-left-sidebar-tool-items
            v-for="(commonNavItem, i) in commonNavItems"
            :key="`listbar-basic-${i}`"
            :items="commonNavItem"
            :expanded.sync="isExpanded"
            nav-type="page"
          />
        </template>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
const EXPENDED_NAV_WIDTH = 300;
const MINI_NAV_WIDTH = 105;
export default {
  name: "yok-left-sidebar-tool",
  props: {
    leftSpace: {
      type: Number,
      default: 50,
    },
    navItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
    commonNavItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    drawer: {
      miniVariant: false,
      mainDrawer: true,
      clipped: true,
      fixed: false,
      permanent: true,
      expandOnHover: true,
      toolBarWidth: MINI_NAV_WIDTH,
      miniVariantWidth: 0,
    },
    mini: true,
    configTab: "",
    isExpanded: false,
    expandedHover: false,
  }),
  computed: {
    ...mapGetters(["getYokSidebarLock"]),
  },
  watch: {
    getYokSidebarLock: {
      immediate: true,
      handler(lock) {
        if (this.isExpanded) return;
        this.drawer.expandOnHover = !lock;
        if (!lock) {
          this.drawer.expandOnHover = true;
          this.drawer.toolBarWidth = MINI_NAV_WIDTH;
          this.drawer.miniVariantWidth = 0;
        }
      },
    },
  },
  methods: {
    fullExpand() {
      if (this.getYokSidebarLock) {
        if (this.drawer.toolBarWidth === MINI_NAV_WIDTH) {
          this.drawer.toolBarWidth = EXPENDED_NAV_WIDTH;
          this.isExpanded = true;
        } else {
          this.drawer.toolBarWidth = MINI_NAV_WIDTH;
          this.drawer.miniVariantWidth = 0;
          this.isExpanded = false;
        }
      } else if (this.drawer.expandOnHover) {
        this.drawer.expandOnHover = false;
        this.drawer.toolBarWidth = EXPENDED_NAV_WIDTH;
        this.isExpanded = true;
      } else {
        this.drawer.expandOnHover = true;
        this.drawer.toolBarWidth = MINI_NAV_WIDTH;
        this.drawer.miniVariantWidth = 0;
        this.mini = false;
        this.isExpanded = false;
      }
    },
    drawerHandler() {
      this.$emit("change-tool-mini-variant", this.mini);
      this.mini = !this.mini;
    },
  },
};
</script>
<style scoped>
.yok-left-sidebar-tool .v-navigation-drawer {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.yok-left-sidebar-tool >>> .v-btn-toggle > .v-btn.v-btn {
  opacity: 1 !important;
}
.yok-left-sidebar-tool >>> .v-navigation-drawer__content {
  padding-top: 70px;
}
.yok-left-sidebar-tool
  >>> .v-btn-toggle:not(.v-btn-toggle--dense)
  .v-btn.v-btn.v-size--default {
  height: 50px !important;
  min-width: 50px !important;
  border: none;
}
.yok-left-sidebar-tool
  >>> .v-btn-toggle:not(.v-btn-toggle--dense)
  .closer-btn.v-btn.v-btn.v-size--default {
  height: 68px !important;
  min-width: 34px !important;
}
.yok-left-sidebar-tool .v-subheader {
  color: #222222 !important;
  height: 14px;
}
.yok-left-sidebar-tool .closer-icon {
  position: absolute;
  right: -35px;
  z-index: 1;
}
</style>
