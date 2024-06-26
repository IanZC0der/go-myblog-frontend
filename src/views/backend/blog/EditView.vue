<template>
    <div>
        <div class="editViewTop">
            <a-breadcrumb>
                <template #separator>
                    <icon-right />
                </template>
                <a-breadcrumb-item>Manage Blogs</a-breadcrumb-item>
                <a-breadcrumb-item v-if="rter.currentRoute.value.fullPath === '/backend/blog'">Blogs
                    List</a-breadcrumb-item>
                <a-breadcrumb-item v-if="rter.currentRoute.value.fullPath === '/backend/blogedit'">{{ updateOrCreate
                    }}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-space>
                <a-affix :offsetTop="50">
                    <a-button type="primary" size="mini" @click="handleSaveMD">
                        <icon-save />
                        Save
                    </a-button>
                </a-affix>
                <a-affix :offsetTop="50">
                    <a-button status="success" size="mini" type="primary">
                        <icon-upload />
                        Publish
                    </a-button>
                </a-affix>
            </a-space>
        </div>

        <div class="editContent">
            <a-form layout="vertical" :model="blog" ref="formRef">
                <a-form-item label="Title" field="title" :rules="[{ required: true, message: 'title is required' }]">
                    <a-input v-model="blog.title" placeholder="please enter the title..." :max-length="50" allow-clear
                        show-word-limit>
                    </a-input>
                </a-form-item>

                <a-form-item label="Abstract" field="abstract"
                    :rules="[{ required: true, message: 'abstract is required' }]">
                    <a-textarea v-model="blog.abstract" placeholder="please enter the abstract..." allow-clear>
                    </a-textarea>
                </a-form-item>
                <a-form-item label="Tags" field="tags" extra="Put the tags here">
                    <a-input-tag v-model="blog.tValues" placeholder="enter tags here..." :format-tag="handleFormatTag"
                        :unique-value="true" />

                </a-form-item>
                <a-form-item label="Content" field="content">
                    <MdEditor v-model="blog.content" language="en-US" @onSave="handleSaveMD" />
                </a-form-item>


            </a-form>

        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { MdEditor, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { Message } from '@arco-design/web-vue';
import { CREATE_NEW_BLOG, UPDATE_BLOG, GET_ONE_BLOG } from '../../../api/blog'

import { blogStore } from '../../../stores/localStorage'

config(
    {
        editorConfig: {
            languageUserDefined: {
                'en-US': 'English',
            }
        }
    }
)

const rter = useRouter()
const formRef = ref(null)
const updateOrCreate = ref('create')

const blog = ref({
    id: -1,
    title: '',
    abstract: '',
    content: '',
    tValues: [],
    tags: {},
    author: blogStore.value.token.username,
})

const handleFormatTag = (tag) => {
    return tag.value.replace(/\s+/g, '').toLowerCase()
}
const handleSaveMD = async () => {
    const ifValidated = await formRef.value.validate()

    if (ifValidated !== undefined) {
        Message.error("validation failed, please check your input")
        return
    }

    const convertTagsToObject = () => {
        blog.value.tags = blog.value.tValues.reduce((obj, tag) => {
            obj[tag] = tag;
            return obj;
        }, {})
    }
    if (blog.value.id === -1) {
        convertTagsToObject()
    }



    console.log(blog.value)

    if (blog.value.id !== -1) {
        // use update api
        try {
            const res = await UPDATE_BLOG(blog.value)
            console.log(res)
            Message.success('blog updated successfully')
        } catch (error) {
            console.log(error)
            Message.error('blog update failed')
        }
    } else {


        try {
            const res = await CREATE_NEW_BLOG(blog.value)
            console.log(res)
            blog.value.id = res.id
            Message.success('blog saved successfully')
        } catch (error) {
            console.log(error)
            Message.error('blog save failed')
        }
    }


}

// const handlePressEnter = async (ev) => {
//     // console.log(ev)
//     // ev.preventDefault()
//     // console.log(ev)
//     // console.log(val)
//     const val = ev.target.value.replace(/\s+/g, '').toLowerCase()
//     if (!blog.value.tags.includes(val)) {
//         await blog.value.tags.push(val)
//     }
//     console.log(blog.value.tags)
// }

const blogId = rter.currentRoute.value.query.id
onBeforeMount(async () => {
    if (blogId !== undefined) {
        updateOrCreate.value = 'Update'
        try {
            const res = await GET_ONE_BLOG(blogId)
            console.log(res)
            blog.value = res
            blogStore.value.menu.selectedKeys = ['backendBlogEdit']
            rter.push({ name: 'backendBlogEdit' })
        } catch (error) {
            console.log(error)
            Message.error('failed to get the blog')
        }
    }
})





</script>

<style lang="css" scoped>
.editContent {
    padding: 1em 0;
    height: 100%;
}

.editViewTop {
    display: flex;
    justify-content: space-between;
    /* padding: 1em 0; */
}

:deep(.md-editor) {
    height: 300px;
}
</style>