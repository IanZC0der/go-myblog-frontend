<template>
    <a-layout>
        <NavigationBar />
        <div class="sideAndContent">
            <div class="sideBarStyles">
                <a-menu :style="{ width: '250px', height: '100%' }" :default-open-keys="['0']"
                    :default-selected-keys="['0_2']" show-collapse-button breakpoint="xl"
                    @menuItemClick="handleMenuClick" @subMenuClick="handleSubMenuClick">
                    <a-sub-menu key="0">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>Manage Blogs</template>
                        <a-menu-item key="backendBlog">All Blogs</a-menu-item>
                        <a-menu-item key="backendBlogEdit">Edit Blogs</a-menu-item>

                    </a-sub-menu>


                </a-menu>
            </div>
            <div class="content"><router-view></router-view></div>

        </div>
    </a-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavigationBar from '../../components/NavigationBar.vue'
// import { Message } from '@arco-design/web-vue';
const rter = useRouter()
const handleMenuClick = (key) => {
    console.log(key)
    rter.push({ name: key })
}

const handleSubMenuClick = (key) => {
    console.log(key)
    rter.push({ name: key })
}


</script>

<style lang="css" scoped>
.sideAndContent {
    display: flex;
    height: calc(100vh - 3rem);
    padding: 0 2em;

}

.sideBarStyles {
    height: 100%;
    background-color: white;
    /* padding: 0 2em; */


}
</style>