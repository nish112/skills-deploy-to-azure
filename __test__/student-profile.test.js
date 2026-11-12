const fs = require('fs')

describe('Student profile', () => {
  const html = fs.readFileSync('./index.html', 'utf8')
  const css = fs.readFileSync('./public/index.css', 'utf8')

  it('shows a mock student profile and account details', () => {
    expect(html).toContain('My Student Profile | Northstar Academy')
    expect(html).toContain('Avery Johnson')
    expect(html).toContain('avery.johnson@students.northstar.edu')
    expect(html).toContain('Student category')
    expect(html).toContain('Undergraduate')
    expect(html).toContain('Sample profile')
  })

  it('provides an accessible profile menu that opens on hover or selection', () => {
    expect(html).toContain('<details class="profile-menu">')
    expect(html).toContain('aria-label="Open student account menu"')
    expect(css).toContain('.profile-menu[open] .profile-popover')
    expect(css).toContain('.profile-menu:hover .profile-popover')
    expect(css).toContain('.profile-menu:focus-within .profile-popover')
  })
})
