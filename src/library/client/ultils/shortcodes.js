import { __ } from '@wordpress/i18n';
export const dragBlockQueryShortcodes = {
    '[dragblock.form.message.error]' : {
        label: __('Form Submission Error Message', 'dragblock'),
        note: __('Error message after submitting form', 'dragblock'),
        placeholder: __('DragBlock Form Error: There is an uknown server error.', 'dragblock')
    },
    '[dragblock.post.title]': {
        label: __('Post Title', 'dragblock'),
        note: __('The parsed post\'s Title', 'dragblock'),
        placeholder: __('The DragBlock Post Title', 'dragblock')
    },
    '[dragblock.post.url]': {
        label: __('Post URL', 'dragblock'),
        note: __('The parsed post\'s url', 'dragblock'),
    },
    '[dragblock.post.image.src]': {
        label: __('Post Image Thumbnail SRC', 'dragblock'),
        note: __('the parsed post\'s image src', 'dragblock'),
    },
    '[dragblock.post.author.url]': {
        label: __('Post Author URL', 'dragblock'),
        note: __('the parsed post\'s author page url', 'dragblock'),
    },
    '[dragblock.post.author.name]': {
        label: __('Post Author Name', 'dragblock'),
        note: __('The parsed post\'s author name', 'dragblock'),
        placeholder: __('Author Name', 'dragblock')
    },
    '[dragblock.post.author.avatar.src]': {
        label: __('Post Author Avatar SRC', 'dragblock'),
        note: __('The parsed post\'s author\'s avatar SRC', 'dragblock'),
    },
    '[dragblock.post.date]': {
        label: __('Post Date Name', 'dragblock'),
        note: __('The parsed post\'s date', 'dragblock'),
        placeholder: __('July 01, 2086', 'dragblock')
    },
    '[dragblock.post.comment.number]': {
        label: __('Post Comment Number', 'dragblock'),
        note: __('The parsed post\'s comment number', 'dragblock'),
        placeholder: '0'
    },
    '[dragblock.post.snippet]' : {
        label: __('Post Snippet', 'dragblock'),
        note: __('The parsed post\'s snippet', 'dragblock'),
        placeholder: __('Get the first paragraph of the post content. If the post excerpt, a custom summary of the post that author manually inputted when composing the post content, exists, use that instead', 'dragblock')
    },
    '[dragblock.post.cat.name]': {
        label: __('Post Category Name', 'dragblock'),
        placeholder: __('Category Name', 'dragblock'),
    },
    '[dragblock.post.cat.url]': {
        label: __('Post Category URL', 'dragblock'),        
    },
    '[dragblock.post.tag.name]': {
        label: __('Post Tag Name', 'dragblock'),
        placeholder: __('Tag Name', 'dragblock'),
    },
    '[dragblock.post.tag.url]': {
        label: __('Post Tag URL', 'dragblock'),        
    },
	'[dragblock.share.url.twitter]': {
		label: __('Twitter Share URL', 'dragblock'),
	},
	'[dragblock.share.url.facebook]': {
		label: __('Facebook Share URL', 'dragblock'),
	},
	'[dragblock.share.url.whatsapp]': {
		label: __('Whatsapp Share URL', 'dragblock'),
	},
	'[dragblock.share.url.telegram]': {
		label: __('Telegram Share URL', 'dragblock'),
	},
	'[dragblock.share.url.tumblr]': {
		label: __('Tumblr Share URL', 'dragblock'),
	},
	'[dragblock.share.url.reddit]': {
		label: __('Reddit Share URL', 'dragblock'),
	},
	'[dragblock.share.url.linkedin]': {
		label: __('LinkedIn Share URL', 'dragblock'),
	},
	'[dragblock.share.url.gmail]': {
		label: __('Gmail Share URL', 'dragblock'),
	},
	'[dragblock.share.url.navigator]': {
		label: __('Navigator Share URL', 'dragblock'),
	},
}