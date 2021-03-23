<template>
  <v-toolbar flat dense class="search">
    <v-autocomplete
      v-model="searchModel"
      :items="addresses"
      :loading="isLoading"
      :search-input.sync="search"
      item-text="FriendlyText"
      class="search-autocomplete"
      item-value="ID"
      placeholder=""
      height="30"
      :append-icon="appendIcon"
      :prepend-inner-icon="prependInnerIcon"
      hide-no-data
      hide-selected
      return-object
      @click:append="$emit('append-icon-event')"
    >
    </v-autocomplete>
  </v-toolbar>
</template>
<script>
export default {
  name: 'yok-search-address',
  props: {
    appendIcon: {
      type: String,
      default: () => '',
    },
    prependInnerIcon: {
      type: String,
      default: () => 'mdi-magnify mdi-rotate-90',
    },
    makeClear: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      descriptionLimit: 60,
      searchModel: null,
      search: null,
      entries: [],
      awaitingSearch: false,
      currentSearch: '',
      isLoading: false,
      marker: null,
    }
  },
  computed: {
    addresses() {
      return this.entries.map((entry) => {
        const FriendlyText =
          entry.FriendlyText.length > this.descriptionLimit
            ? entry.FriendlyText.slice(0, this.descriptionLimit) + '...'
            : entry.FriendlyText
        return Object.assign({}, entry, { FriendlyText })
      })
    },
  },
  watch: {
    search(val) {
      if (val == null || val === '') {
        this.resetAutocomplete()
        return
      }
      this.currentSearch = val
      if (this.isLoading) return
      this.isLoading = true
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.processSearch()
          this.awaitingSearch = false
        }, 3000) // 1 sec delay
      }
      this.awaitingSearch = true
    },
    searchModel(val) {
      if (val == null || val === '') {
        this.resetAutocomplete()
      } else {
        if (this.makeClear) {
          this.search = null
        }
        this.$emit('address-details', val)
      }
    },
  },
  methods: {
    processSearch() {
      const val = this.currentSearch
      const obj = {
        method: 'post',
        url: `${process.env.addressSearchAPI.URL}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          query: `${val}`,
          destinationEpsg: `${process.env.addressSearchAPI.epsg}`,
          resultLimit: `${process.env.addressSearchAPI.limit}`,
          country: `${process.env.addressSearchAPI.country}`,
          autocomplete: `${process.env.addressSearchAPI.autocomplete}`,
          fuzzy: `${process.env.addressSearchAPI.fuzzy}`,
        },
      }
      const instance = this.$axios.create()
      instance(obj)
        .then((res) => res.data)
        .then((res) => {
          if (res.StatusCode === 0) {
            const { Hits } = res
            this.entries = Hits
          } else {
            this.searchModel = null
            this.entries = []
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    resetAutocomplete() {
      this.searchModel = null
      this.entries = []
      this.search = null
    },
  },
}
</script>
