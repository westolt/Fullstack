import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('renders title, url, likes and user after pressing view-button', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'http://test',
    likes: 3,
    user: { name:'Testi Teemu' }
  }

  render(
    <Blog blog={blog} user={'Testi Teemu'}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('Component testing is done with react-testing-library')).toBeDefined()
  expect(screen.getByText('http://test')).toBeDefined()
  expect(screen.getByText('likes 3')).toBeDefined()
  expect(screen.getByText('Testi Teemu')).toBeDefined()
})