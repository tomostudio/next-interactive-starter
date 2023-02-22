import Iframe from 'sanity-plugin-iframe-pane'


export const defaultDocumentNode = (S, {schemaType}) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc) => `https://next-interactive-starter.vercel.app/sanity-post/${doc.slug.current}`,
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
