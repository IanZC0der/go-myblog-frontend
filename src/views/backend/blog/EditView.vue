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
                <a-breadcrumb-item
                    v-if="rter.currentRoute.value.fullPath === '/backend/blogedit'">Edit</a-breadcrumb-item>
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
            <a-form layout="vertical" :model="blog">
                <a-form-item label="Title" field="title" :rules="[{ required: true, message: 'title is required' }]">
                    <a-input v-model="blog.title" placeholder="please enter the title..." :max-length="50" allow-clear
                        show-word-limit>
                    </a-input>
                </a-form-item>

                <a-form-item label="Abstract" field="abstract"
                    :rules="[{ required: true, message: 'abstract is required' }]">
                    <a-textarea v-model="blog.abstract" placeholder="please enter the abstract..." allow-clear="true">
                    </a-textarea>
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
import { ref } from 'vue'
import { MdEditor, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

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

const blog = ref({
    title: '',
    abstract: '',
    content: '',
})

const handleSaveMD = () => {

}



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
    height: 400px;
}
</style>