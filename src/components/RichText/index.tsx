import React from 'react'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { internalDocToHref } from './converters/link'
import Image from 'next/image'

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    const serializedNode = node as SerializedUploadNode
    const value = serializedNode.value

    if (
      value &&
      typeof value === 'object' &&
      'mimeType' in value &&
      value.mimeType?.startsWith('image/')
    ) {
      return (
        <></>
        // <Image
        //   src={`${process.env.NEXT_PUBLIC_URL}${value.url}`}
        //   alt={value.alt!}
        //   width={400}
        //   height={500}
        //   className="object-cover rounded-xl"
        // />
      )
    }
  },
})

type Props = {
  data: SerializedEditorState
}

export function RichText({ data }: Props) {
  return (
    <div className="prose space-y-xl">
      <PayloadRichText data={data} converters={converters} />
    </div>
  )
}
