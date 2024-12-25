# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Example

- Example Project: [Project1-artikel](https://project1.keidev.my.id)
- Admin Panel: [Admin](https://project1.keidev.my.id/admin/artikel/list)

## Getting Started

### Database Setup

Run the following command to create the `artikel` table in your database:

```sql
CREATE TABLE `artikel` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  `penulis` VARCHAR(255) NOT NULL,
  `isi` TEXT NOT NULL,
  `tanggal` DATETIME NOT NULL,
  `gambar` VARCHAR(255) DEFAULT NULL,
  `last_update` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### Running the Development Server

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Editing the Page

You can start editing the page by modifying the `app/page.tsx` file. The page will auto-update as you edit the file.

### Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out the [Next.js GitHub repository](https://github.com/vercel/next.js) for more information. Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), created by the makers of Next.js.

For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
```

### Changes made:
1. **Added headings** for better organization.
2. **Reformatted SQL code** to be properly enclosed in code blocks.
3. **Grouped related sections** (Database, Development server, Editing the page, Font optimization, etc.) to make it more readable.
4. **Improved clarity** in instructions and added some spacing between sections for better readability.

This should make your `README.md` clearer and easier to follow!