<script setup lang="ts">
definePageMeta({
    middleware: ['authenticated'],
	layout: 'dashboard'
})


const { user } = useUserSession()
</script>

<template>
	<UDashboardPanel>
		<template #header>
			<UDashboardNavbar />
			{{ user?.username  }}
		</template>
	</UDashboardPanel>
</template>