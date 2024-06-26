<template>
    <div>
        <a-breadcrumb>
            <template #separator>
                <icon-right />
            </template>
            <a-breadcrumb-item>Manage Blogs</a-breadcrumb-item>
            <a-breadcrumb-item v-if="rter.currentRoute.value.fullPath === '/backend/blog'">Blogs
                List</a-breadcrumb-item>
            <a-breadcrumb-item v-if="rter.currentRoute.value.fullPath === '/backend/blogedit'">Edit</a-breadcrumb-item>
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
            <a-table :data="blogs.items" :pagination="false" size='small' :bordered=false :loading="ifLoading">
                <template #columns>

                    <a-table-column title="ID" data-index="id"></a-table-column>
                    <a-table-column title="Title" data-index="title"></a-table-column>
                    <a-table-column title="Author" data-index="author"></a-table-column>
                    <a-table-column title="Status" data-index="status">
                        <template #cell="{ record }">
                            <a-tag :color="record.status === 1 ? 'green' : 'red'">
                                {{ record.status === 1 ? 'Published' : 'Draft' }}
                            </a-tag>
                        </template>
                    </a-table-column>
                    <a-table-column title="Created Time" data-index="created_at">
                        <template #cell="{ record }">
                            {{ dayjs.unix(record.created_at).format('YYYY-MM-DD HH:mm') }}
                        </template>
                    </a-table-column>
                </template>
            </a-table>
            <a-config-provider :locale="locale">
                <div class="paginationBar">
                    <a-pagination :total="blogs.total" show-total show-jumper show-page-size size='mini'
                        :page-size-options="[2, 5, 10]" @page-size-change="onPageSizeChanged"
                        @change="onPageNumberChanged" />

                </div>


            </a-config-provider>

        </div>
    </div>
</template>

<script setup>

import { onBeforeMount, reactive, ref } from 'vue'
import { GET_ALL_BLOGS } from '../../../api/blog'
import dayjs from 'dayjs'


import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import { useRouter } from 'vue-router';

const rter = useRouter()
console.log(rter.currentRoute.value.name)

//get the blogs before the ui is rendered



const locale = enUS
const ifLoading = ref(false)
const blogs = ref({ items: [], total: 0 })
const paginationParams = reactive({
    page_size: 10,
    page_number: 1
})
const getBlogs = async () => {
    ifLoading.value = true
    try {
        const res = await GET_ALL_BLOGS(paginationParams)
        console.log(res)
        blogs.value = res
        console.log(blogs.value)
    } finally {
        ifLoading.value = false
    }
}

onBeforeMount(async () => {
    await getBlogs()
})

const onPageSizeChanged = (pageSize) => {
    paginationParams.page_size = pageSize
    paginationParams.page_number = 1
    getBlogs()
}


const onPageNumberChanged = (pageNumber) => {
    paginationParams.page_number = pageNumber
    getBlogs()
}


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

.paginationBar {
    display: flex;
    justify-content: center;
    padding: 1em 0;
}
</style>