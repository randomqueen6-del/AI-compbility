"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Home, Info } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import { defaultLocale } from "@/lib/i18n"

export function Navigation() {
  const pathname = usePathname()
  const t = getTranslations(defaultLocale)

  const navItems = [
    { href: "/", label: t.home, icon: Home },
    { href: "/test", label: t.test, icon: Heart },
    { href: "/about", label: t.about, icon: Info },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-rose-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-2 sm:px-3">
        <div className="flex items-center justify-between h-10 sm:h-12">
          <Link href="/" className="flex items-center gap-1 sm:gap-1.5 group">
            <div className="relative">
              <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-rose-500 transition-all duration-300 group-hover:scale-110 group-hover:text-rose-600" />
              <div className="absolute inset-0 h-4 w-4 sm:h-6 sm:w-6 bg-rose-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-sm sm:text-lg bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-none">
              {t.compatibilityTest}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-all duration-300 group text-xs sm:text-sm flex-shrink-0 ${
                  pathname === href
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/20"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/80"
                }`}
              >
                <Icon
                  className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 flex-shrink-0 ${
                    pathname === href ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="whitespace-nowrap">{label}</span>
                {pathname !== href && (
                  <div className="absolute inset-0 rounded-md sm:rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}