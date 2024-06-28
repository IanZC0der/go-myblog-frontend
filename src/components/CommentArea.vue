<template>
    <div class="commentArea">

        <a-space direction="vertical" size="large" fill>
            <a-textarea placeholder="Leave your comment here" :max-length="100" allow-clear show-word-limit
                :v-model="aComment.content" @input="handleInput" />
            <a-space>
                <a-button type="primary" size="mini" :disabled="aComment.content.length == 0"
                    @click="handleSubmitComment">Comment</a-button>

            </a-space>
            <a-config-provider :locale="enUS">
                <a-list :itemLayout="'vertical'" :data="allComments.items" :bordered=false :loading="ifLoading">
                    <template #header>

                        {{ allComments.total }} comments
                    </template>

                    <template #item="{ item }">
                        <a-list-item>
                            <a-list-item-meta :title="item.created_by" :description="item.content" />

                            <template #extra>
                                <span :style="{ fontSize: '10px', color: 'var(--color-neutral-5)' }">{{
                                    dayjs.unix(item.created_at).format('YYYY-MM-DD HH:mm')
                                }}</span>
                            </template>
                        </a-list-item>


                    </template>
                </a-list>
            </a-config-provider>

        </a-space>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { blogStore } from '../stores/localStorage'
import { ref } from 'vue'
import { ADD_COMMENT, GET_COMMENTS } from '@/api/comment'
import { Message } from '@arco-design/web-vue'
import { onBeforeMount } from 'vue'
import dayjs from 'dayjs'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'

const rter = useRouter()
const blogId = rter.currentRoute.value.query.id
const allComments = ref({ items: [], total: 0 })
const ifLoading = ref(false)

const aComment = ref({
    content: '',
    blog_id: parseInt(blogId),
    created_by: blogStore.value.token.username,
})

const handleInput = (val) => {
    aComment.value.content = val
    // console.log(val)
}

const handleSubmitComment = async () => {
    // console.log(aComment.value)
    try {
        const res = await ADD_COMMENT(aComment.value)
        console.log(res)
        Message.success('commented successfully')
        await getBlogs()
    } catch (error) {
        Message.error('try again later')
    }

}

const getBlogs = async () => {
    ifLoading.value = true
    try {
        const res = await GET_COMMENTS(blogId)
        console.log(res)
        allComments.value = res
        ifLoading.value = false
        console.log(allComments.value)
    } catch (error) {
        console.log(error)
    } finally {
        ifLoading.value = false
    }
}

onBeforeMount(async () => {
    await getBlogs()
})





</script>

<style lang="css" scoped>
.commentArea {
    padding: 0;
    /* background-color: #f0f0f0; */
    /* margin: 20px; */
    /* margin-bottom: 4em; */
    margin-top: 2em;
    width: 100%;
}
</style>