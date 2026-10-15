import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#50875b" },
      { title: "Happy Children's Home | Orphan Care & Education in Kumi, Uganda" },
      {
        name: "description",
        content:
          "Happy Children's Home is a registered Community-Based Organisation in Kumi, Uganda rescuing orphans and providing education, food, healthcare, and safe shelter.",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "bingbot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      ...(import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
        ? [{ name: "google-site-verification", content: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION }]
        : []),
      { property: "og:site_name", content: "Happy Children's Home" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Happy Children's Home | Orphan Care & Education in Kumi, Uganda",
      },
      {
        property: "og:description",
        content:
          "Supporting vulnerable children in Kumi, Uganda through education, nutrition, medical care, safe shelter, and love.",
      },
      {
        property: "og:image",
        content: "https://happychildrenshome.com/assets/1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.webp",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Happy Children's Home Community in Kumi, Uganda" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Happy Children's Home | Orphan Care & Education in Kumi, Uganda",
      },
      {
        name: "twitter:description",
        content:
          "Supporting vulnerable children in Kumi, Uganda through education, nutrition, medical care, safe shelter, and love.",
      },
      {
        name: "twitter:image",
        content: "https://happychildrenshome.com/assets/1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.webp",
      },
      { name: "twitter:image:alt", content: "Happy Children's Home Community in Kumi, Uganda" },
    ],
    links: [
      { rel: "canonical", href: "https://happychildrenshome.com/" },
      { rel: "alternate", hrefLang: "en", href: "https://happychildrenshome.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://happychildrenshome.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const siteGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://happychildrenshome.com/#website",
      url: "https://happychildrenshome.com/",
      name: "Happy Children's Home",
      description:
        "Community-Based Organisation in Kumi, Uganda dedicated to rescuing vulnerable orphans and providing education, food, healthcare, and safe shelter.",
      publisher: {
        "@id": "https://happychildrenshome.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "NGO",
      "@id": "https://happychildrenshome.com/#organization",
      name: "Happy Children's Home",
      alternateName: "Happy Children's Home Kumi",
      url: "https://happychildrenshome.com",
      logo: {
        "@type": "ImageObject",
        url: "https://happychildrenshome.com/assets/1ea502_2d64a9f7aaf249f3aefd64de277cf45a~mv2.webp",
        caption: "Happy Children's Home Logo",
      },
      image: "https://happychildrenshome.com/assets/1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.webp",
      description:
        "Community-Based Organisation in Kumi, Uganda dedicated to rescuing vulnerable orphans and providing education, food, healthcare, and safe shelter.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Okouba Village, Omatenga Road, North Division",
        addressLocality: "Kumi Municipal Council",
        addressRegion: "Kumi District",
        addressCountry: "UG",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+256 705 775 486",
        contactType: "General Inquiries",
        email: "happychildrenshome9@gmail.com",
        availableLanguage: ["English", "Ateso"],
      },
      foundingDate: "2023",
      founders: [
        {
          "@type": "Person",
          name: "Lanyero Irene Okot",
          jobTitle: "Founder & Care Director",
        },
        {
          "@type": "Person",
          name: "Opio Joseph Ekodeu",
          jobTitle: "Co-Founder & Operations Director",
        },
      ],
    },
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
