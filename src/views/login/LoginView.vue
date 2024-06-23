<template>
    <div class="loginPage">
        <div class="formTitle">
            <span>My Blog</span>
        </div>
        <div class="loginForm">
            <a-form :model="loginForm" :style="{ width: '600px' }" @submit="handleSubmit">
                <a-form-item hide-label="true" field="username"
                    :rules="[{ required: true, message: 'username is required' }]">
                    <a-input v-model="loginForm.username" placeholder="please enter your username...">
                        <template #prefix>
                            <icon-user />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item hide-label="true" field="password"
                    :rules="[{ required: true, message: 'password is required' }, { minLength: 8, message: 'must be greater than 8 characters' }]">
                    <a-input-password v-model="loginForm.password" placeholder="please enter your password...">
                        <template #prefix>
                            <icon-lock />
                        </template>
                    </a-input-password>
                </a-form-item>
                <div class="submitButton">
                    <a-button html-type="submit" style="width:20%;" type="outline">login</a-button>
                </div>

            </a-form>
        </div>

    </div>
</template>

<script setup>
import { LOGIN } from '../../api/token'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router';

const rter = useRouter()
const loginForm = ref({
    username: '',
    password: '',
})

// submit handler
const handleSubmit = async (data) => {
    // console.log(data)
    // console.log(ev)
    // validation failed
    console.log(data)
    if (data.errors !== undefined) {
        Message.error("validation failed")
        return
    }
    try {
        const res = await LOGIN(loginForm.value)
        console.log(res)

        // we need to route to the blogs page upon successful login
        // 
        Message.success('login successful')
        rter.push({ name: 'backendBlog' })

    } catch (error) {
        // the response will be processed by the interceptor in client.js
        console.log(error)
        // Message.error('login failed')
    }
}
</script>

<style lang="css" scoped>
.formTitle {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.loginPage {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loginForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40vh;
    /* margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px; */
}

.loginTitle {
    width: 100%;
    display: flex;
    justify-content: center;
}

.submitButton {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>