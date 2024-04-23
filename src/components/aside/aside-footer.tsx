const footerLinks = [
  ['Terms of Service', 'https://ndgo.io/tos'],
  ['Privacy Policy', 'https://ndgo.io/privacy'],
  ['Cookie Policy', 'https://support.ndgo.io/articles/20170514'],
  ['Accessibility', 'https://help.ndgo.io/resources/accessibility'],
  [
    'Ads Info',
    'https://business.ndgo.io/en/help/troubleshooting/how-twitter-ads-work.html'
  ]
] as const;

export function AsideFooter(): JSX.Element {
  return (
    <footer
      className='sticky top-16 flex flex-col gap-3 text-center text-sm 
                 text-light-secondary dark:text-dark-secondary'
    >
      <nav className='flex flex-wrap justify-center gap-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={href}
          >
            {linkName}
          </a>
        ))}
      </nav>
      <p>© 2022 Twitter, Inc.</p>
    </footer>
  );
}
