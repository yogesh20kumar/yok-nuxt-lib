# yok-nuxt-lib

Nuxtjs Reuseable Component Library

## Build Setup

```bash
# install library
$ npm install -s git+https://github.com/yogesh20kumar/yok-nuxt-lib.git#master
```

Set yok-nuxt-lib into the nuxt.config.js

```javascript
modules: ['yok-nuxt-lib'],
```

## Components

How to use each component available in this project.

### yok-left-sidebar

Component showing custom left sidebar.

---

**NOTE**

1. Props array structure should be like this one.

```javascript
;[
  {
    title: '',
    data: [
      {
        icon: '',
        title: '',
        action: '/#lock',
        windowModel: false,
        actionIcon: '',
        active: true,
      },
    ],
  },
]
```

2. `action` key should be '/#lock' for lock sidebar functionality

3. Activate the Store (To activate the store with the classic mode, we create the store/index.js file)

4. Getting sidebar information via store

```javascript
$store.state.yok.sidebar
$store.state.yok.lock
```

---

#### Props

| Name                     | Type  | Default | Description                                                                                     |
| ------------------------ | ----- | ------- | ----------------------------------------------------------------------------------------------- |
| sidebar-nav-items        | Array | []      | Nav items list which will be shown on top of sidebar.                                           |
| sidebar-common-nav-items | Array | []      | Fixed nav items like lock, settings, help etc. It will be shown into the bottom part of sidebar |

### yok-tool-btn

Component showing tool button.

---

**NOTE**

1. Props array structure should be like this one.

```javascript
;[
  {
    icon: '',
    title: '',
    action: '',
    subMenu: [
      {
        icon: '',
        title: '',
        action: '',
      },
    ],
  },
]
```

---

#### Props

| Name  | Type  | Default | Description            |
| ----- | ----- | ------- | ---------------------- |
| items | Array | []      | Tool item listing data |

#### Events

| Name        | Arguments    | Description                        |
| ----------- | ------------ | ---------------------------------- |
| tool-action | Current item | Emitted when tool item is clicked. |

### yok-search-address

Component showing search field with address API.

---

**NOTE**

1. Need to define address search api details in env object form nuxt.config.js

```javascript
addressSearchAPI: {
      URL: ''
      epsg: 4326,
      limit: 10,
      country: '',
      autocomplete: true,
      fuzzy: false,
    }
```

---

#### Props

| Name               | Type    | Default       | Description                   |
| ------------------ | ------- | ------------- | ----------------------------- |
| append-icon        | String  | ''            | Append icon                   |
| prepend-inner-icon | String  | 'mdi-magnify' | Prepend inner icon            |
| make-clear         | Boolean | true          | Make clear field after search |

#### Events

| Name              | Arguments      | Description                                        |
| ----------------- | -------------- | -------------------------------------------------- |
| append-icon-event | Current item   | Emitted when append icon is clicked.               |
| address-details   | Address object | Emitted when a item is selected from address list. |
