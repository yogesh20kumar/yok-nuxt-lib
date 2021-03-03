# yok-nuxt-lib

Nuxtjs Reuseable Component Library

## Build Setup

```bash
# install library
$ npm install -s git+https://github.com/yogesh20kumar/yok-nuxt-lib.git#master
```

## Components

How to use each component available in this project.

### yok-left-sidebar

Component showing custom left sidebar.

---

**NOTE**

1. action key should be '/#lock' for lock sidebar functionality
2. Props array structure like this one:
   [
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

---

#### Props

| Name                     | Type  | Default | Description                                                                                     |
| ------------------------ | ----- | ------- | ----------------------------------------------------------------------------------------------- |
| sidebar-nav-items        | Array | []      | Nav items list which will be shown on top of sidebar.                                           |
| sidebar-common-nav-items | Array | []      | Fixed nav items like lock, settings, help etc. It will be shown into the bottom part of sidebar |
