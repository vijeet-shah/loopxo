// lib/markdownToHtml.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';

export interface Heading {
  id: string;
  level: number;
  text: string;
}

// Custom plugin to extract headings and add IDs
function extractHeadings() {
  const headings: Heading[] = [];
  
  return function transformer(tree: any) {
    visit(tree, 'heading', (node) => {
      const text = toString(node);
      // Generate slug-like ID
      const id = slug(text);
      
      // Store ID on the node
      if (!node.data) node.data = {};
      node.data.id = id;
      node.data.hProperties = {
        ...node.data.hProperties,
        id: id
      };
      
      headings.push({
        id,
        level: node.depth,
        text
      });
    });
    
    return headings;
  };
}

export default function markdownToHtml(markdown: string) {
  let headings: Heading[] = [];
  
  // Process the content
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree) => {
      headings = extractHeadings()(tree);
      return tree;
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true });
  
  // Process synchronously instead of using promises
  const file = processor.processSync(markdown);
  
  return {
    content: String(file),
    headings: headings
  };
}