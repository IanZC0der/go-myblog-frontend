<template>
    <div>
        <a-list class="list-demo-action-layout" :bordered="false" :data="blogs.items">
            <template #item="{ item }">
                <a-list-item class="list-demo-item" action-layout="vertical">
                    <template #actions>
                        <span><icon-user />Author: {{ item.author }}</span>
                        <span><icon-calendar />Created at: {{ dayjs.unix(item.created_at).format('YYYY-MM-DD HH:mm')
                            }}</span>
                        <span><icon-message />Comment</span>
                    </template>
                    <template #extra>

                        <a-button shape="round"
                            @click="rter.push({ name: 'frontendBlogDetail', query: { id: item.id } })">Details</a-button>


                    </template>
                    <a-list-item-meta :title="item.title" :description="item.abstract">
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
    </div>
    <a-config-provider :locale="locale">
        <div class="paginationBar">
            <a-pagination :total="blogs.total" show-total show-jumper show-page-size size='mini'
                :page-size-options="[2, 5, 10]" @page-size-change="onPageSizeChanged" @change="onPageNumberChanged" />

        </div>


    </a-config-provider>


</template>

<script setup>

import { onBeforeMount, ref, reactive } from 'vue'
import { GET_ALL_BLOGS } from '../../../api/blog'
// import dayjs from 'dayjs'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';


const blogs = ref({ items: [], total: 0 })
const rter = useRouter()
const locale = enUS

const paginationParams = reactive({
    page_size: 5,
    page_number: 1,
    keywords: ''
})
const getBlogs = async () => {
    try {
        const res = await GET_ALL_BLOGS(paginationParams)
        console.log(res)
        blogs.value = res
        console.log(blogs.value)
    } catch (error) {
        console.log(error)
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
.list-demo-action-layout .image-area {
    width: 183px;
    height: 119px;
    border-radius: 2px;
    overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
    padding: 0;
    border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
    width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
    margin: 0 4px;
}

.paginationBar {
    display: flex;
    justify-content: center;
    padding: 1em 0;
}
</style>