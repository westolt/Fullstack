const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testi Teemu',
        username: 'testi',
        password: '123'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Mies',
        username: 'masa',
        password: '123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testi', '123')
      await expect(page.getByText('Testi Teemu logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testi', 'asd')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {

    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'testi', '123')
      await expect(page.getByText('Testi Teemu logged in')).toBeVisible()
      await createBlog(page, 'This is a test', 'Test guy', 'http://www.thisisatest.com')
      await expect(page.getByText(`This is a test Test guy`)).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await loginWith(page, 'testi', '123')
      await page.getByText('Testi Teemu logged in').waitFor()
      await createBlog(page, 'This is another test', 'Test guy', 'http://www.thisisatest.com')
      await page.getByText('This is another test Test guy').waitFor()
      const view_button = await page.getByRole('button', { name: 'view'}).all()
      await view_button[0].click()

      const likesText = await page.getByText(/likes \d+/).innerText()
      const likesAtStart = parseInt(likesText.match(/\d+/)[0], 10)

      await page.getByRole('button', { name: 'like'}).click()
      await expect(page.getByText(`likes ${likesAtStart + 1}`)).toBeVisible()
    })

    test('a blog can be removed', async ({ page }) => {
      await loginWith(page, 'testi', '123')
      await createBlog(page, 'This is a test', 'Test guy', 'http://www.thisisatest.com')

      await page.getByRole('button', { name: 'view'}).first().click()

      page.on('dialog', async (dialogWindow) => {
        expect(dialogWindow.type()).toContain('confirm')
        expect(dialogWindow.message()).toContain('Remove blog This is a test by Test guy')
        await dialogWindow.accept()
      })

      await page.getByRole('button', { name: 'remove'}).first().click()
      await expect(page.getByText('no blogs')).toBeVisible()
    })

    test('A user can only see the remove button on their own blog', async ({ page }) => {
      await loginWith(page, 'testi', '123')
      await createBlog(page, 'This is a test', 'Test guy', 'http://www.thisisatest.com')

      await page.getByRole('button', { name: 'view'}).first().click()

      page.on('dialog', async (dialogWindow) => {
        expect(dialogWindow.type()).toContain('confirm')
        expect(dialogWindow.message()).toContain('Remove blog This is a test by Test guy')
        await dialogWindow.dismiss()
      })

      await page.getByRole('button', { name: 'remove'}).first().click()
      await expect(page.getByText('This is a test Test guy')).toBeVisible()

      await page.getByRole('button', { name: 'logout'}).click()
      await page.getByText('Log in to application').waitFor()
      await loginWith(page, 'masa', '123')
      await expect(page.getByText('This is a test Test guy')).toBeVisible()

      await page.getByRole('button', { name: 'view'}).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
  })
})