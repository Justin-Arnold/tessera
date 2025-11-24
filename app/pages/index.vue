<script setup lang="ts">
definePageMeta({
    middleware: ['authenticated'],
})

const { user } = useUserSession()
</script>

<template>
	<div>
		<h1 class="text-2xl font-bold">
			Tessera
		</h1>
		<p>{{ user?.username }}</p>
	</div>
</template>