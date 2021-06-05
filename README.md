# v-wait

Small Vue plugin for actions waiting

## Install
```shell
npm i @vasiliyrusin/v-wait
```

## Usage
### main.ts
```JavaScript
import store from "@/store";
import Loader from "@vasiliyrusin/v-wait";

Vue.use(Loader, { store });
```
```JavaScript
computed: {
  isLoading () {
    return this.$wait(`ACTION_NAME`) || 
      this.$wait(`path/to/namespaced/module/ACTION_NAME`);
  }
}
```
