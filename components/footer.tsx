import { Heart, Mail, MapPin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Resources: ["Healthcare Guide", "Educational Materials", "Community Resources"],
    Community: ["Support Groups", "Volunteer", "Events"],
    About: ["Our Mission", "Privacy Policy", "Contact Us"],
  }

  return (
    <footer style={{ backgroundColor: "#b582b4" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">SheSpeaks</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              A vibrant community platform where transgender and LGBTQ+ individuals can stay informed, share
              experiences, and celebrate their authentic selves.
            </p>
            <div className="flex items-center gap-2 text-white/90">
              <Heart className="w-5 h-5 text-rose-200" />
              <span>Made with love for our community</span>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-105 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          </div>

          <div className="text-center text-white/70 text-sm">
            <p>&copy; 2024 SheSpeaks. All rights reserved. | Built with love and respect for our community.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
