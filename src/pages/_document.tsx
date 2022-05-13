import Document, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>PomoTask</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
