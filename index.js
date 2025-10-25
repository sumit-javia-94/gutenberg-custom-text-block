const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { ToolbarGroup, ToolbarButton } = wp.components;

registerBlockType('myplugin/my-text-block', {
    title: 'My Text Block',
    icon: 'smiley',
    category: 'widgets',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'div', // still general selector
            default: 'Hello! This is a text block. You can edit me.'
        },
        tagName: {
            type: 'string',
            default: 'p' // default paragraph
        },
        textAlign: {
            type: 'string',
            default: 'left' // default alignment
        }
    },
    edit: function(props) {
        const { attributes: { content, tagName, textAlign }, setAttributes, className } = props;

        const changeTag = (newTag) => setAttributes({ tagName: newTag });
        const changeAlignment = (newAlign) => setAttributes({ textAlign: newAlign });

        return wp.element.createElement(
            wp.element.Fragment,
            null,
            // Toolbar for heading selection
            wp.element.createElement(
                BlockControls,
                null,
                wp.element.createElement(
                    ToolbarGroup,
                    { label: 'Text Type' },
                    ['p','h1','h2','h3','h4','h5','h6'].map(tag =>
                        wp.element.createElement(
                            ToolbarButton,
                            {
                                key: tag,
                                isPressed: tagName === tag,
                                onClick: () => changeTag(tag)
                            },
                            tag.toUpperCase()
                        )
                    )
                ),
                // Alignment Toolbar
                wp.element.createElement(AlignmentToolbar, {
                    value: textAlign,
                    onChange: changeAlignment
                })
            ),
            // RichText editor
            wp.element.createElement(
                RichText,
                {
                    tagName: tagName,
                    className: className,
                    style: { textAlign: textAlign }, // apply alignment
                    value: content,
                    onChange: function(newContent) {
                        setAttributes({ content: newContent });
                    },
                    placeholder: 'Write something...'
                }
            )
        );
    },
    save: function(props) {
        const { attributes: { content, tagName, textAlign } } = props;

        return wp.element.createElement(
            RichText.Content,
            {
                tagName: tagName,
                value: content,
                style: { textAlign: textAlign } // save alignment
            }
        );
    }
});
