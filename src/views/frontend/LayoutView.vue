<template>
    <a-layout>
        <div>
            <NavigationBar />
        </div>
        <div class="listViewFront">
            <router-view>
            </router-view>
            <!-- <CommentArea v-if="ifRouteIsDetail" /> -->

        </div>
        <div>
        </div>
    </a-layout>
</template>

<script setup>

import NavigationBar from '../../components/NavigationBar.vue'
// import CommentArea from '../../components/CommentArea.vue'
// import { useRouter } from 'vue-router'

// const rter = useRouter()
// const ifRouteIsDetail = rter.currentRoute.value.fullPath.includes('blogdetail')
</script>

<style lang="css" scoped>
.listViewFront {
    padding: 0 2em;
    /* height: calc(100vh - 60px); */
    height: 100%;
    overflow: auto;
    margin-top: 2em;
}
</style>