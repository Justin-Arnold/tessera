<script setup lang="ts">
import * as z from 'zod'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
	username: z.string('Username is required'),
	password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
	confirmPassword: z.string('Please confirm your password').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	username: undefined,
	password: undefined,
	confirmPassword: undefined,
})

function validate(state: Partial<Schema>): FormError[] {
	const errors = []
	if (state.password !== state.confirmPassword) {
		errors.push({
			name: 'confirmPassword',
			message: 'Passwords do not match'
		})
	}
	return errors
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		const { data, error: fetchError } = await useFetch('/api/setup/admin', {
			method: 'POST',
			body: {
				username: event.data.username,
				password: event.data.password,
			},
		});

		if (fetchError.value) {
			toast.add({ title: 'Error', description: fetchError.value.statusMessage || 'An error occurred', color: 'error' });
			return;
		}

		toast.add({ title: 'Success', description: 'Admin account created successfully! Redirecting to login...', color: 'success' });
		setTimeout(() => {
			navigateTo('/');
		}, 3000);

	} catch (err) {
		toast.add({ title: 'Error', description: (err as Error).message || 'An error occurred', color: 'error' });
	}
}

async function onError(event: FormErrorEvent) {
	if (event?.errors?.[0]?.id) {
		const element = document.getElementById(event.errors[0].id)
		element?.focus()
		element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
}
</script>

<template>
	<div class="setup-page max-w-md mx-auto mt-16">
		<h1 class="text-2xl font-bold mb-4">
			Welcome to Tessera
		</h1>
		<p class="mb-4 text-gray-600">
			Let’s create your admin account to get started.
		</p>

		<UForm :validate="validate" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
			<UFormField label="Username" name="username">
				<UInput v-model="state.username" />
			</UFormField>

			<UFormField label="Password" name="password">
				<UInput v-model="state.password" type="password" />
			</UFormField>

			<UFormField label="Confirm Password" name="confirmPassword">
				<UInput v-model="state.confirmPassword" type="password" />
			</UFormField>

			<UButton type="submit">
				Submit
			</UButton>
		</UForm>
	</div>
</template>
