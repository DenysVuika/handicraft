import Document, { DocumentContext, DocumentInitialProps } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({});

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: <>{initialProps.styles}</>
      };
    } finally {
      /* empty */
    }
  }
}
