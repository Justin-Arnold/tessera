<script setup lang="ts">
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref<string | null>(null);
const success = ref(false);
const loading = ref(false);

const { data: status, refresh } = await useFetch('/api/setup/status');

if (status.value?.hasUser) {
  // If user already exists, redirect to home (or login)
  await navigateTo('/');
}

const submit = async () => {
  error.value = null;

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    loading.value = true;
    const { data, error: fetchError } = await useFetch('/api/setup/admin', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (fetchError.value) {
      error.value = fetchError.value.statusMessage || 'Failed to create admin';
      return;
    }

    success.value = true;

    // After creating admin, you might want to:
    // - redirect to login page, OR
    // - auto-login once you implement sessions
    await navigateTo('/');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="setup-page max-w-md mx-auto mt-16">
    <h1 class="text-2xl font-bold mb-4">Welcome to Tessera</h1>
    <p class="mb-4 text-gray-600">
      Let’s create your admin account to get started.
    </p>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="password">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <p v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </p>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? 'Creating...' : 'Create admin account' }}
      </button>
    </form>
  </div>
</template>
