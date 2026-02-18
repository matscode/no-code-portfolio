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
            paragraph: ({ children }: { children: React.ReactNode }) => (
              <Text className={cn("text-inherit", paragraphClassName)}>{children}</Text>
            ),
            list: ({ children, type }: { children: React.ReactNode[]; type: 'ordered' | 'unordered' }) => {
              const List = type === 'ordered' ? 'ol' : 'ul';
              return (
                <List className={cn("text-inherit", paragraphClassName)}>
                  {children.map((child, i) => (
                    <li key={i} className="">
                      {child}
                    </li>
                  ))}
                </List>
              );
            },
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
          },
        }}
      />
    </div>
  );
}
