<template>
    <a-layout>
        <div>
            <NavigationBar />
        </div>
        <div class="listViewFront">
            <router-view></router-view>
        </div>
    </a-layout>
</template>

<script setup>

import NavigationBar from '../../components/NavigationBar.vue'
</script>

<style lang="css" scoped>
.listViewFront {
    padding: 0 2em;
    height: 90vh;
}
</style>