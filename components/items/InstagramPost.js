import React from 'react'
import { InstagramEmbed } from 'react-social-media-embed';

export default function InstagramPost({ item, editMode = false, triggerReload }) {
    const { id, uri, parentId } = item

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: "0rem 0.5rem 0rem 0.5rem", borderRadius: '1rem' }}>
            <InstagramEmbed url={uri} width="100%" />
        </div>
    )
}
