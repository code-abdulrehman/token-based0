import { useLayoutEffect } from "react";

function PageTitle ({title}) {
  useLayoutEffect(() => {
    if (title) {
      document.title = `${title} | Token Based`;
    }
  }, [title]);
};

export default PageTitle;