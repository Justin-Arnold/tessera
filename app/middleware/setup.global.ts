export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data: status } = await useFetch('/api/setup/status');

    const routeIsSetup = to.path.startsWith('/setup');
    const userExists = status.value?.hasUser;

    if (routeIsSetup && userExists) {
        return navigateTo('/');
    } else if (!routeIsSetup && !userExists) {
        return navigateTo('/setup');
    }

    return
})  