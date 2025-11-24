<script setup lang="ts">

definePageMeta({
    alias: ['/signout'],
});

const {
    loggedIn,
    clear
} = useUserSession();

if (loggedIn.value) {
    await clear();
}
await navigateTo('/login');
</script>