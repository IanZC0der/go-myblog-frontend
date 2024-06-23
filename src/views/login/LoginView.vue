<template>
    <div class="loginPage">
        <div class="formTitle">
            <span>My Blog</span>
        </div>
        <div class="loginForm">
            <a-form :model="loginForm" :style="{ width: '600px' }" @submit="handleSubmit">
                <a-form-item field="username" hide-label=true>
                    <a-input v-model="loginForm.username" placeholder="please enter your username...">
                        <template #prefix>
                            <icon-user />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item field="password" hide-label=true>
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
const loginForm = ref({
    username: '',
    password: '',
})

// submit handler
const handleSubmit = async (data, ev) => {
    console.log(data)
    console.log(ev)
    try {
        const res = await LOGIN(loginForm.value)
        console.log(res)
    } catch (error) {
        // console.log(error)
        Message.error(`login failed: ${error}`)
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