<template>
    <div class="navbar">
        <div class="logo">My Blog</div>
        <div class="menu">
            <a href="#">Home</a>
            <a href="#">Solution</a>
            <a href="#">Cloud Service</a>
        </div>
        <!-- <button class="button">Text</button> -->
        <div class="btns">
            <a-button type="text">login</a-button>
            <a-button type="text"><span style="margin-right: 5px">logout</span> <icon-export /></a-button>
        </div>

    </div>
</template>

<script setup>

import { blogStore } from '../stores/localStorage'

console.log(blogStore)
</script>

<style lang="css" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    padding: 10px 40px;
    /* margin: 2px 2px; */
}

.navbar a {
    text-decoration: none;
    color: #343a40;
    padding: 10px 20px;
    margin: 0 10px;
}

.navbar a:hover {
    background-color: #e2e6ea;
    border-radius: 4px;
}

.navbar .logo {
    font-weight: bold;
    color: rgb(var(--arcoblue-7));
}

.navbar .menu {
    display: flex;
    align-items: center;
}

.navbar .button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.navbar .button:hover {
    background-color: #0056b3;
}

.btns {
    padding: 0 0;
    margin: 0 0;
}
</style>
