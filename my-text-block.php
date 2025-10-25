<?php
/**
 * Plugin Name: My Text Block
 * Description: A simple custom Gutenberg block to display text.
 * Version: 1.0
 * Author: Sumit Javia
 */

function my_text_block_register_manual() {
    wp_register_script(
        'my-text-block-editor',
        plugins_url('index.js', __FILE__),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor' ],
        filemtime(plugin_dir_path(__FILE__) . 'index.js')
    );

    register_block_type('myplugin/my-text-block', [
        'editor_script' => 'my-text-block-editor',
        'attributes' => array(
            'content' => array(
                'type' => 'string',
                'source' => 'html',
                'selector' => 'div.crtb-content',
                'default' => 'Write your content here...'
            ),
        ),
    ]);
}
add_action('init', 'my_text_block_register_manual');

