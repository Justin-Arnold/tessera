// tests/nuxt/setup-middleware.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import setupMiddleware from '~/middleware/setup.global'

const { useFetchMock, navigateToMock } = vi.hoisted(() => ({
    useFetchMock: vi.fn(),
    navigateToMock: vi.fn()
}))

mockNuxtImport('useFetch', () => useFetchMock)
mockNuxtImport('navigateTo', () => navigateToMock)

describe('setup middleware', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('redirects to /setup when no user exists and route is not /setup', async () => {
        useFetchMock.mockResolvedValue({
            data: { value: { hasUser: false } }
        })

        const to = { path: '/dashboard' }
        const from = { path: '/' }

        await setupMiddleware(to, from)

        expect(navigateToMock).toHaveBeenCalledWith('/setup')
    })

    it('redirects away from /setup when user exists', async () => {
        useFetchMock.mockResolvedValue({
            data: { value: { hasUser: true } }
        })

        const to = { path: '/setup' }
        const from = { path: '/' }

        await setupMiddleware(to, from)

        expect(navigateToMock).toHaveBeenCalledWith('/')
    })

    it('allows navigation when user exists and route is not /setup', async () => {
        useFetchMock.mockResolvedValue({
            data: { value: { hasUser: true } }
        })

        const to = { path: '/app' }
        const from = { path: '/' }

        await setupMiddleware(to, from)

        expect(navigateToMock).not.toHaveBeenCalled()
    })

    it('allows navigation when no user exists but already on /setup', async () => {
        useFetchMock.mockResolvedValue({
            data: { value: { hasUser: false } }
        })

        const to = { path: '/setup' }
        const from = { path: '/' }

        await setupMiddleware(to, from)

        expect(navigateToMock).not.toHaveBeenCalled()
    })

    it('handles undefined status data gracefully (no user)', async () => {
        useFetchMock.mockResolvedValue({
            data: { value: undefined }
        })

        const to = { path: '/anywhere' }
        const from = { path: '/' }

        await setupMiddleware(to, from)

        expect(navigateToMock).toHaveBeenCalledWith('/setup')
    })
})