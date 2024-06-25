import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-6 px-4 md:px-6">
      <div className="container mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            Terms of Service
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
