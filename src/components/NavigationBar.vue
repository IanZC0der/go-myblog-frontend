<template>
    <div class="navbar">
        <div class="logo">My Blog</div>
        <!-- <div class="menu">
            <a href="#">Home</a>
            <a href="#">Solution</a>
            <a href="#">Cloud Service</a>
        </div> -->
        <!-- <button class="button">Text</button> -->
        <div class="btns">

            <a-popover position="left">
                <a-button type="text" v-if="blogStore.is_login" :style="{ color: 'var(--color-neutral-10)' }"
                    @click="handleUsernameClick">{{
                        blogStore.token.username }}</a-button>
                <template #content>
                    <span>click to switch between blogs management/front page</span>
                </template>

            </a-popover>

            <a-button type="outline" @click="toLogin" v-if="!blogStore.is_login">login</a-button>
            <a-button type="outline" @click="handleLogout" v-if="blogStore.is_login"><span
                    style="margin-right: 5px">logout</span>
                <icon-export /></a-button>
        </div>

    </div>
</template>

<script setup>

import { blogStore } from '../stores/localStorage'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { LOGOUT } from '../api/token'

console.log(blogStore)

const rter = useRouter()



const toLogin = () => {
    rter.push({ name: 'login' })

}

const handleUsernameClick = () => {
    if (rter.currentRoute.value.name.startsWith('backend')) {
        rter.push({ name: 'frontend' })
    } else {
        rter.push({ name: 'backend' })
    }
}




const handleLogout = async (data) => {
    // console.log(data)
    // console.log(ev)
    // validation failed
    console.log(data)
    if (data.errors !== undefined) {
        Message.error("validation failed")
        return
    }
    try {
        const res = await LOGOUT(blogStore.value.token)
        console.log(res)

        // we need to route to the blogs page upon successful login
        // 
        blogStore.value.is_login = false
        blogStore.value.token = ''
        Message.success('logout successful')
        rter.push({ name: 'login' })

    } catch (error) {
        // the response will be processed by the interceptor in client.js
        console.log(error)
        // Message.error('login failed')
    }
}
</script>

<style lang="css" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    padding: 1em 3.5em;
    height: 3rem;
    /* border: #ffffff 1em solid; */
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
