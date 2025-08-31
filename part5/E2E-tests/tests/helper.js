const loginWith = async (page, username, password)  => {
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog'}).click()
  const textbox = await page.getByRole('textbox').all()

  await textbox[0].fill(title)
  await textbox[1].fill(author)
  await textbox[2].fill(url)
  await page.getByRole('button', { name: 'add'}).click()
}

export { loginWith, createBlog }