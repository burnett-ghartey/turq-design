import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Behance', href: 'https://behance.net' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-turq-teal text-turq-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="relative w-40 h-12 inline-block mb-6">
              <Image
                src="/Logo_default_light.png"
                alt="Turq Design Studios"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-turq-cream/80 text-sm leading-relaxed max-w-md mb-6">
              Creating exceptional digital experiences through innovative design and strategic thinking. 
              We transform ideas into captivating visual stories.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-turq-cream/30 flex items-center justify-center hover:bg-turq-cream/10 hover:border-turq-cream transition-all duration-300"
                  aria-label={link.name}
                >
                  <span className="text-xs font-medium">
                    {link.name.substring(0, 2).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-turq-cream/80 hover:text-turq-yellow transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-turq-cream/80">
              <li>
                <a href="mailto:hello@turqdesign.com" className="hover:text-turq-yellow transition-colors duration-300">
                  hello@turqdesign.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-turq-yellow transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="pt-2">
                123 Design Street<br />
                Creative District, CD 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-turq-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-turq-cream/60">
            © {currentYear} Turq Design Studios. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-turq-cream/60">
            <a href="#" className="hover:text-turq-yellow transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-turq-yellow transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
