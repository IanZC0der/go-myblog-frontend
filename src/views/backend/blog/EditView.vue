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
    </div>
    <div>{{ rter.currentRoute.value }}</div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const rter = useRouter()



</script>

<style lang="css" scoped></style>