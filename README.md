This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


/perets-photography-next
|-- /public              # Static files like images, fonts, and favicon
|-- /src
    |-- /components      # Reusable components
    |   |-- /common      # Common components like Navbar, Footer, CTA, etc.
    |   |-- /ui          # UI-specific components like buttons, modals, etc.
    |-- /pages           # Your application's page structure
    |   |-- /api         # API routes (if any) for serverless functions or external services like Stripe or Mailchimp
    |   |-- /auth        # Authentication-related pages (if any) like login, signup, forgot password, etc.
    |   |-- home.page.tsx       # Home page
    |   |-- about.page.tsx      # About page with information about the photographer or studio
    |   |-- contact.page.tsx    # Contact page with a contact form and contact details 
    |   |-- faq.page.tsx        # FAQ page with frequently asked questions and answers 
    |   |-- testimonials.page.tsx # Testimonials page (if any) with customer reviews or quotes 
    |   |-- terms.page.tsx      # Terms and Conditions page
    |   |-- privacy.page.tsx    # Privacy Policy page 
    |   |-- search.page.tsx     # Search page
    |   |-- newsletter.page.tsx # Newsletter subscription  
    |   |-- profile             # User Profile dashboard (requires auth) 
    |   |   |-- index.page.tsx  # Main profile page
    |   |   |-- settings.page.tsx # User settings page
    |   |-- _error.page.tsx     # Custom error page
    |   |-- maintenance.page.tsx # Maintenance page
    |   |-- portfolio           # Portfolio pages 
    |   |   |-- index.page.tsx  # Main portfolio page
    |   |   |-- [category].page.tsx # Dynamic route for categories like nature, cities, etc.
    |   |-- blog                # Blog-related pages
    |   |   |-- index.page.tsx  # Main blog listing page
    |   |   |-- [slug].page.tsx # Dynamic route for blog posts
    |   |-- store               # Store-related pages
    |   |   |-- index.page.tsx  # Main store page
    |   |   |-- [product].page.tsx # Dynamic product details page
    |   |-- book-a-shoot.page.tsx # Booking page for photo shoots
    |-- /styles          # CSS Modules for components and pages
    |-- /lib             # Library for fetching data, utility functions
    |-- /hooks           # Custom React hooks
    |-- /context         # Context API for state management across components
|-- /config             # Configuration files (e.g., for environment variables)
|-- /scripts            # Custom scripts for deployment or other automation tasks
|-- next.config.js      # Next.js configuration file
|-- package.json        # Package metadata and dependencies
|-- README.md           # Project overview and instructions

