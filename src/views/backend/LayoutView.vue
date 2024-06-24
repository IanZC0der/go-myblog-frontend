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
    /* box-shadow: 3px 2px 5px -2px rgba(0, 0, 0, 0.5); */
    transition: box-shadow 0.3s ease;


}

.sideBarStyles:hover {
    box-shadow: 3px 2px 5px -2px var(--color-neutral-6);
}



.content {

    padding: 10px 1rem;
    width: 100%;
    /* border-left: 1px solid var(--color-neutral-3); */
    /* Set left border color and width */
    /* box-shadow: -3px 0 5px -2px rgba(0, 0, 0, 0.5); */
    /* Add shadow to the left */
    /* transition: box-shadow 0.5s ease; */
    /* margin-left: 6px; */
}

.content:hover {
    box-shadow: -3px 2px 5px -2px var(--color-neutral-6);

    /* border-left: 0.5px solid var(--color-neutral-6); */
}
</style>