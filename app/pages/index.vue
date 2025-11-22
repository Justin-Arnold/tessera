<script setup lang="ts">
const { data: status } = await useFetch('/api/setup/status');

if (!status.value) {
  // if status not loaded yet, you could show a loading state
} else if (!status.value.hasUser) {
  await navigateTo('/setup');
}

// Once user exists, this page becomes your dashboard / daily view.
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Tessera</h1>
    <p>Dashboard coming soon.</p>
  </div>
</template>