import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-between mx-auto md:px-4 pt-4 pb-4 border-t border-border">
      <p className="text-xs text-muted-foreground">
        &copy; 2025 Habitarian. All Rights Reserved.
      </p>

      <p className="text-xs text-muted-foreground">
        built by{" "}
        <Link
          href={"https://sameersaharan.com"}
          target="_blank"
          className="text-foreground/80 hover:underline"
        >
          Sameer Saharan
        </Link>
      </p>
    </div>
  );
}
