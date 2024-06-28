<template>
    <div class="blog-post">
        <div class="title">
            <h2>{{ blog.title }}</h2>
        </div>
        <div class="timestamps">
            <p>By: {{ blog.author }}</p>
            <p>Created at: {{ dayjs.unix(blog.created_at).format('YYYY-MM-DD HH:mm') }}</p>
            <p>Last Update: {{ dayjs.unix(blog.updated_at).format('YYYY-MM-DD HH:mm') }}</p>
        </div>
        <div>
            <a-space>
                <a-tag v-for="tag in blog.tags" :key="tag" color="blue">{{ blog.tags[tag] }}</a-tag>
            </a-space>
        </div>
        <div class="abstract">
            <p>"{{ blog.abstract }}"</p>
        </div>
        <!-- <div class="content"> -->
        <MdPreview :editorId="id" v-model="blog.content" language='en-US' class="content" />

        <!-- </div> -->

        <!-- </div> -->
        <!-- <template> -->
        <CommentArea />
    </div>
    <!-- </template> -->
</template>

<script setup>

import { useRouter } from 'vue-router'
import { GET_ONE_BLOG } from '../../../api/blog'
import { onBeforeMount, ref } from 'vue'
import CommentArea from '@/components/CommentArea.vue'

import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs'
import { MdPreview } from 'md-editor-v3'


const rter = useRouter()

const id = 'preview-only'

const blog = ref({
    title: '',
    abstract: '',
    updated_at: 0,
    created_at: 0,
    content: '',
    tags: {},
})

const blogId = rter.currentRoute.value.query.id

onBeforeMount(async () => {
    try {
        const res = await GET_ONE_BLOG(blogId)
        console.log(res)
        blog.value = res

    } catch (error) {
        console.log(error)
        Message.error('failed to get the blog')
    }
})



</script>

<style lang="css" scoped>
.blog-post {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 1em 5em;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 12px #aaa;
    height: 100%;

}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.timestamps {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
}

.timestamps p {
    margin: 0;
}

.abstract {
    font-size: 16px;
    margin-bottom: 20px;
    font-style: italic;
}

.content {
    font-size: 16px;
    width: 100%;
    overflow: auto;
    height: 400px;
}
</style>