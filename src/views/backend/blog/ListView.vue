<template>
    <div>
        <a-breadcrumb>
            <template #separator>
                <icon-right />
            </template>
            <a-breadcrumb-item>Manage Blogs</a-breadcrumb-item>
            <a-breadcrumb-item>Blogs List</a-breadcrumb-item>
            <a-breadcrumb-item>Edit</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="subHeader">
            <div>
                <a-button type="primary" size='mini'>
                    <template #icon>
                        <icon-plus />
                    </template>
                    New
                </a-button>
            </div>
            <div>
                <a-input-search :style="{ width: '320px' }" size='mini' placeholder="Seach Blogs..." search-button />
            </div>
        </div>
        <div class="blogsList">
            <a-table :data="blogs">
                <template #columns>

                    <a-table-column title="name" data-index="name"></a-table-column>
                    <a-table-column title="value" data-index="value"></a-table-column>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const blogs = ref([{
    name: '1',
    value: '2'
}, {
    name: '3',
    value: '4'
}])
</script>

<style lang="css" scoped>
.subHeader {
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
}

.blogsList {
    padding: 1em 0;
}
</style>