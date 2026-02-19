import { DocumentRenderer, DocumentRendererProps } from "@keystatic/core/renderer";
import { Text } from "@/components/Typography/Text";
import { Link } from "@/components/Link/Link";
import { cn } from "@/lib/utils";

interface RichTextProps {
  document: DocumentRendererProps["document"];
  className?: string;
  paragraphClassName?: string;
}

export function RichText({ document, className, paragraphClassName }: RichTextProps) {
  return (
    <div className={cn("text-shadow-grey-600 dark:text-shadow-grey-400", className)}>
      <DocumentRenderer
        document={document}
        renderers={{
          block: {
            paragraph: ({ children, textAlign }: { children: React.ReactNode; textAlign: "center" | "end" | undefined }) => {
              const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "end" ? "text-right" : "";
              return (
                <Text className={cn("text-inherit", textAlignClass, paragraphClassName)}>{children}</Text>
              );
            },
            heading: ({ level, children, textAlign }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: React.ReactNode; textAlign: "center" | "end" | undefined }) => {
              const sizeClass =
                level === 1 ? "text-3xl md:text-4xl" :
                level === 2 ? "text-2xl md:text-3xl" :
                level === 3 ? "text-xl" :
                level === 4 ? "text-lg" :
                level === 5 ? "text-base" : "text-sm";
              const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "end" ? "text-right" : "";
              const headingClassName = cn("mt-6 font-semibold tracking-tight text-shadow-grey-900 dark:text-shadow-grey-50", sizeClass, textAlignClass);
              if (level === 1) return <h1 className={headingClassName}>{children}</h1>;
              if (level === 2) return <h2 className={headingClassName}>{children}</h2>;
              if (level === 3) return <h3 className={headingClassName}>{children}</h3>;
              if (level === 4) return <h4 className={headingClassName}>{children}</h4>;
              if (level === 5) return <h5 className={headingClassName}>{children}</h5>;
              return <h6 className={headingClassName}>{children}</h6>;
            },
            blockquote: ({ children }: { children: React.ReactNode }) => (
              <blockquote className="border-l-2 border-shadow-grey-200 pl-4 text-shadow-grey-700 dark:border-shadow-grey-800 dark:text-shadow-grey-200">
                {children}
              </blockquote>
            ),
            list: ({ children, type }: { children: React.ReactNode[]; type: "ordered" | "unordered" }) => {
              const List = type === "ordered" ? "ol" : "ul";
              return (
                <List
                  className={cn(
                    "text-inherit",
                    type === "ordered" ? "list-decimal" : "list-disc",
                    "pl-5",
                    "space-y-2",
                    paragraphClassName,
                  )}
                >
                  {children.map((child, i) => (
                    <li key={i} className="text-inherit">
                      {child}
                    </li>
                  ))}
                </List>
              );
            },
            divider: () => (
              <hr className="my-6 border-shadow-grey-200 dark:border-shadow-grey-800" />
            ),
            code: ({ children }: { children: string }) => (
              <pre className="overflow-x-auto rounded-xl bg-shadow-grey-100 p-4 text-sm text-shadow-grey-900 dark:bg-shadow-grey-900 dark:text-shadow-grey-50">
                <code className="font-mono">{children}</code>
              </pre>
            ),
            image: ({ src, alt, title }: { src: string; alt: string; title?: string }) => (
              <figure className="my-6">
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className="rounded-xl border border-shadow-grey-200 dark:border-shadow-grey-800"
                />
                {title ? (
                  <figcaption className="mt-2 text-sm text-shadow-grey-500 dark:text-shadow-grey-400">
                    {title}
                  </figcaption>
                ) : null}
              </figure>
            ),
            table: ({ head, body }: { head?: { children: React.ReactNode; colSpan?: number; rowSpan?: number }[]; body: { children: React.ReactNode; colSpan?: number; rowSpan?: number }[][] }) => (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  {head ? (
                    <thead>
                      <tr>
                        {head.map((cell, index) => (
                          <th
                            key={index}
                            colSpan={cell.colSpan}
                            rowSpan={cell.rowSpan}
                            className="border-b border-shadow-grey-200 px-3 py-2 font-semibold text-shadow-grey-900 dark:border-shadow-grey-800 dark:text-shadow-grey-50"
                          >
                            {cell.children}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {body.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            colSpan={cell.colSpan}
                            rowSpan={cell.rowSpan}
                            className="border-b border-shadow-grey-200 px-3 py-2 text-shadow-grey-600 dark:border-shadow-grey-800 dark:text-shadow-grey-300"
                          >
                            {cell.children}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          inline: {
            link: ({ children, href }: { children: React.ReactNode; href: string }) => (
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </Link>
            ),
            bold: ({ children }: { children: React.ReactNode }) => (
              <strong className="font-semibold text-shadow-grey-900 dark:text-shadow-grey-50">{children}</strong>
            ),
            italic: ({ children }: { children: React.ReactNode }) => (
              <em className="italic">{children}</em>
            ),
            underline: ({ children }: { children: React.ReactNode }) => (
              <span className="underline underline-offset-4">{children}</span>
            ),
            strikethrough: ({ children }: { children: React.ReactNode }) => (
              <span className="line-through">{children}</span>
            ),
            code: ({ children }: { children: React.ReactNode }) => (
              <code className="rounded bg-shadow-grey-100 px-1.5 py-0.5 text-sm font-mono text-shadow-grey-900 dark:bg-shadow-grey-800 dark:text-shadow-grey-50">
                {children}
              </code>
            ),
            superscript: ({ children }: { children: React.ReactNode }) => (
              <sup className="text-xs leading-none">{children}</sup>
            ),
            subscript: ({ children }: { children: React.ReactNode }) => (
              <sub className="text-xs leading-none">{children}</sub>
            ),
            keyboard: ({ children }: { children: React.ReactNode }) => (
              <kbd className="rounded border border-shadow-grey-200 bg-shadow-grey-50 px-1.5 py-0.5 text-xs font-medium text-shadow-grey-900 dark:border-shadow-grey-800 dark:bg-shadow-grey-900 dark:text-shadow-grey-50">
                {children}
              </kbd>
            ),
          },
        }}
      />
    </div>
  );
}
