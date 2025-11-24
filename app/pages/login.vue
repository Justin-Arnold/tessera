<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
const { loggedIn, fetch: refreshSession } = useUserSession()

definePageMeta({
    alias: ['/signin'],
});

const toast = useToast()

if (loggedIn.value) {
    await navigateTo('/');
}

const fields: AuthFormField[] = [{
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
}]

const schema = z.object({
    username: z.string('Username is required'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {

    const { error: fetchError } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: {
            username: payload.data.username,
            password: payload.data.password
        },
    });

    if (fetchError.value) {
        toast.add({ 
            title: 'Login Failed', 
            description: fetchError.value.statusMessage || 'An error occurred during login',
            color: 'error'
        });
        return;
    }
    await refreshSession()
    await navigateTo('/')
}
</script>

<template>
    <UPageCard class="w-full max-w-md mx-auto">
        <img
            src="~/assets/image/teserra-snake.png"
            alt="Discover Nuxt"
        >
        <UAuthForm
            :fields="fields"
            :schema="schema"
            title="Welcome back!"
            @submit="onSubmit"
        />
    </UPageCard>
</template>
