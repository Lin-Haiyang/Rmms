<template>
    <div>
        <app-nav/>
        <app-aside/>
        <app-main/>
    </div>
</template>

<script>
import AppNav from './AppNav'
import AppAside from './AppAside'
import AppMain from './AppMain'
export default {
    components:{
        AppNav,
        AppAside,
        AppMain
    }
}
</script>