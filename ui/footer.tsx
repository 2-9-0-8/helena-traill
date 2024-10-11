import Link from 'next/link'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { Icon, type Icon as IconType } from '#/ui/icon'

import { getLayout } from '#/lib/queries'

const [css, styles, href] = cxx`
  .footer {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--space-8x);
    justify-content: center;
    padding-block: var(--space-5x);
  }

  .work {

    > ul {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: var(--space);
      justify-content: center;
      list-style-type: none;
    }
  }

  .link {
    display: block;
    font-size: var(--text-sm);
    text-align: center;
    text-decoration: none;
    text-wrap: pretty;
  }

  .socials {

    > h2 {
      font-size: var(--text-sm);
      font-weight: 700;
      margin-block-end: var(--space-2x);
      text-align: center;
      text-transform: uppercase;
    }

    > ul {
      align-items: center;
      display: flex;
      gap: var(--space-4x);
      list-style-type: none;
    }
  }

  .copyright {
    font-size: var(--text-xs);
  }
`

type SocialLink = { label: string; href: string; icon: IconType; size: number }

const socials: SocialLink[] = [
	{
		label: 'Linkedin',
		href: 'https://linkedin.com/in/helenatraill',
		icon: 'linkedin',
		size: 20,
	},
	{
		label: 'Substack',
		href: 'https://theideasmachine.substack.com/',
		icon: 'substack',
		size: 20,
	},
	{
		label: 'Instagram',
		href: 'https://instagram.com/helenatraill',
		icon: 'instagram',
		size: 20,
	},
	{
		label: 'TikTok',
		href: 'https://www.tiktok.com/@helenatraill',
		icon: 'tiktok',
		size: 28,
	},
	{
		label: 'YouTube',
		href: 'https://www.youtube.com/channel/UCPPHycgXH6y49M858Y89RFA',
		icon: 'youtube',
		size: 24,
	},
]

export async function Footer({ className, ...rest }: React.ComponentPropsWithRef<'footer'>) {
	const { footerMenuItems } = await getLayout()
	const year = new Date().getFullYear()

	return (
		<footer className={clsx(styles.footer, className)} {...rest}>
			<section className={styles.work}>
				<h2 className="sr-only">Work, trusteeships and education</h2>

				<ul>
					{footerMenuItems?.nodes.map(
						({ uri, label, id }) =>
							uri &&
							label && (
								<li key={id}>
									{uri === '#' ? (
										<span className={styles.link}>{label}</span>
									) : (
										<Link href={uri} className={styles.link}>
											{label}
										</Link>
									)}
								</li>
							),
					)}
				</ul>
			</section>

			<section className={styles.socials}>
				<h2>Get in touch</h2>

				<ul>
					{socials.map(({ label, href, icon, size }) => (
						<li key={label}>
							<a href={href} target="_blank" rel="noreferrer">
								<span className="sr-only">{label}</span>

								<Icon name={icon} title={label} size={size} />
							</a>
						</li>
					))}
				</ul>
			</section>

			<p className={styles.copyright}>Helena Traill &copy; {year}</p>

			<style href={href} precedence="medium">
				{css}
			</style>
		</footer>
	)
}
