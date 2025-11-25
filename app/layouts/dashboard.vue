<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [[{
    label: 'Inbox',
    icon: 'i-lucide-inbox',
    badge: '4'
}, {
    label: 'Projects',
    icon: 'i-lucide-house',
    active: true
},  {
    label: 'Contacts',
    icon: 'i-lucide-users'
}, {
    label: 'Settings',
    icon: 'i-lucide-settings',
    defaultOpen: true,
    children: [{
        label: 'General'
    }, {
        label: 'Members'
    }, {
        label: 'Notifications'
    }]
}], [{
    label: 'Feedback',
    icon: 'i-lucide-message-circle',
    to: 'https://github.com/nuxt-ui-templates/dashboard',
    target: '_blank'
}, {
    label: 'Help & Support',
    icon: 'i-lucide-info',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
}]]

</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar>
            <template #header="{ collapsed }">
                <h2 class="font-bold text-primary text-2xl">Teserra</h2>
            </template>
            <template #default="{collapsed}">
                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="items[0]"
                    orientation="vertical"
                />

                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="items[1]"
                    orientation="vertical"
                    class="mt-auto"
                />
            </template>
        </UDashboardSidebar>
        <slot />
    </UDashboardGroup>
</template>