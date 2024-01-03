import React from 'react'
import {
  BiArchive,
  BiAtom,
  BiBook,
  BiBookOpen,
  BiBriefcaseAlt,
  BiBroadcast,
  BiCard,
  BiCaretDownSquare,
  BiCool,
  BiDesktop,
  BiDirections,
  BiFolderOpen,
  BiNotepad,
  BiSidebar,
  BiSliderAlt,
} from 'react-icons/bi'

const deskStructure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'postList',
            'footer',
            'generalSettings',
          ].includes(listItem.getId()),
      ),
      S.documentTypeListItem('postList').icon(() => <BiBookOpen />),
      S.listItem()
        .title('Settings')
        .icon(() => <BiSliderAlt />)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .icon(() => <BiCard />)
                .child(
                  S.document()
                    .schemaType('generalSettings')
                    .documentId('generalSettings'),
                ),
              S.listItem()
                .title('Footer')
                .icon(() => <BiCaretDownSquare />)
                .child(S.document().schemaType('footer').documentId('footer')),
            ]),
        ),
    ])

export default deskStructure
