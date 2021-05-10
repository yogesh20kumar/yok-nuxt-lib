<template>
  <v-menu rounded="0" outlined offset-y class="yok-data-filter" :close-on-content-click="closeOnContentClick">
    <template #activator="{ attrs, on }">
      <v-btn text elevation="0" min-width="30" height="30" class="pa-1 mr-2 btn-effect" :ripple="false" v-bind="attrs" v-on="on">
        <v-icon class="fs-28 text--secondary">{{ filterIcon }}</v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto" width="430" max-width="430" rounded="0" elevation="0" tile>
      <v-card-title class="px-5">
        <span class="fs-20 filter-title g-color">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn tile dark float-right color="#0073A9" class="pr-10 font-weight-book white--text text--white" @click="$emit('add-filter')">
          <v-icon size="20" left> mdi-plus </v-icon>
          Opret filter
        </v-btn>
      </v-card-title>
      <v-card-text class="px-5">
        <v-text-field
          v-model="search"
          label="Søg i filtre"
          prepend-inner-icon="mdi-magnify mdi-rotate-90"
          single-line
          hide-details
          dense
          solo
          flat
          height="40"
          background-color="#E6E6E6"
          class="custom-placeholder search-icon mb-5"
          tile
        ></v-text-field>
        <div class="filter-records">
          <v-treeview :items="items" :search="search" :filter="filter" open-all expand-icon="" dense class="pa-0 filter-treeview">
            <template #append="{ item, leaf }">
              <v-icon v-if="leaf" size="20" class="ml-3" :class="item.isDefault ? 'move-left' : ''" @click="makeAction('copy', item)">mdi-file-multiple</v-icon>
              <v-icon v-if="leaf && !item.isDefault" class="ml-3" @click="makeAction('share', item)">mdi-share-variant</v-icon>
              <v-icon v-if="leaf && !item.isDefault" class="ml-3" @click="makeAction('edit', item)">mdi-pencil</v-icon>
              <v-icon v-if="leaf && !item.isDefault" class="ml-3" @click="makeAction('delete', item)">mdi-delete</v-icon>
            </template>
          </v-treeview>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => 'Filter',
    },
    filterIcon: {
      type: String,
      default: () => 'mdi-filter-outline',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    closeOnContentClick: false,
    caseSensitive: false,
    search: null,
  }),
  computed: {
    filter() {
      return this.caseSensitive ? (item, search, textKey) => item[textKey].includes(search) : undefined
    },
  },
  methods: {
    makeAction(actionType, itemObject) {
      this.$emit('filter-action', { action: actionType, item: itemObject })
    },
  },
}
</script>
