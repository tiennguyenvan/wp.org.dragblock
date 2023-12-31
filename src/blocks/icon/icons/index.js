import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Path, SVG } from "@wordpress/primitives";
import {
	addCard,
	addSubmenu,
	alignCenter,
	alignJustify,
	alignLeft,
	alignNone,
	alignRight,
	archive,
	arrowDown,
	arrowLeft,
	arrowRight,
	arrowUp,
	atSymbol,
	aspectRatio,
	audio,
	backup,
	blockDefault,
	blockTable,
	box,
	brush,
	bug,
	button,
	buttons,
	calendar,
	cancelCircleFilled,
	capturePhoto,
	captureVideo,
	category,
	chartBar,
	check,
	chevronDown,
	chevronLeft,
	chevronRight,
	chevronRightSmall,
	chevronUp,
	classic,
	close,
	closeSmall,
	cloudUpload,
	cloud,
	code,
	cog,
	color,
	column,
	columns,
	comment,
	commentAuthorAvatar,
	commentAuthorName,
	commentContent,
	commentReplyLink,
	cover,
	create,
	crop,
	currencyDollar,
	currencyEuro,
	currencyPound,
	customPostType,
	desktop,
	dragHandle,
	download,
	edit,
	external,
	file,
	flipHorizontal,
	flipVertical,
	formatBold,
	formatCapitalize,
	formatIndent,
	formatIndentRTL,
	formatItalic,
	formatListBullets,
	formatListBulletsRTL,
	formatListNumbered,
	formatListNumberedRTL,
	formatLtr,
	formatLowercase,
	formatOutdent,
	formatOutdentRTL,
	formatRtl,
	formatStrikethrough,
	formatUnderline,
	formatUppercase,
	fullscreen,
	gallery,
	globe,
	grid,
	group,
	handle,
	heading,
	help,
	helpFilled,
	inbox,
	institution,
	home,
	html,
	image,
	info,
	insertAfter,
	insertBefore,
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
	key,
	keyboardClose,
	keyboardReturn,
	layout,
	lifesaver,
	link,
	linkOff,
	list,
	listView,
	lock,
	login,
	loop,
	mapMarker,
	media,
	mediaAndText,
	megaphone,
	menu,
	mobile,
	more,
	moreHorizontal,
	moreHorizontalMobile,
	moreVertical,
	moveTo,
	navigation,
	overlayText,
	pageBreak,
	customLink,
	page,
	pages,
	paragraph,
	payment,
	percent,
	positionCenter,
	positionLeft,
	positionRight,
	pencil,
	people,
	pin,
	plugins,
	plusCircleFilled,
	plusCircle,
	plus,
	post,
	postAuthor,
	postCategories,
	postContent,
	postComments,
	postCommentsCount,
	postCommentsForm,
	postDate,
	postExcerpt,
	postFeaturedImage,
	postList,
	postTerms,
	previous,
	next,
	preformatted,
	pullLeft,
	pullRight,
	pullquote,
	queryPagination,
	queryPaginationNext,
	queryPaginationNumbers,
	queryPaginationPrevious,
	quote,
	receipt,
	redo,
	removeBug,
	removeSubmenu,
	replace,
	reset,
	resizeCornerNE,
	reusableBlock,
	rotateLeft,
	rotateRight,
	row,
	rss,
	search,
	separator,
	settings,
	share,
	shield,
	shortcode,
	siteLogo,
	stack,
	starEmpty,
	starFilled,
	starHalf,
	store,
	stretchFullWidth,
	styles,
	shipping,
	stretchWide,
	subscript,
	superscript,
	swatch,
	symbol,
	symbolFilled,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
	table,
	tag,
	termDescription,
	footer,
	header,
	sidebar,
	textColor,
	tablet,
	tip,
	title,
	tool,
	trash,
	trendingDown,
	trendingUp,
	typography,
	undo,
	ungroup,
	unlock,
	update,
	upload,
	verse,
	video,
	warning,
	widget,
} from '@wordpress/icons';
import {
	amazon,
	bandcamp,
	behance,
	chain,
	codepen,
	deviantart,
	dribbble,
	dropbox,
	etsy,
	facebook,
	feed,
	fivehundredpx,
	flickr,
	foursquare,
	goodreads,
	google,
	github,
	instagram,
	lastfm,
	linkedin,
	mail,
	mastodon,
	meetup,
	medium,
	patreon,
	pinterest,
	pocket,
	DragBlockLastBytes,
	reddit,
	skype,
	snapchat,
	soundcloud,
	spotify,
	telegram,
	tiktok,
	tumblr,
	twitch,
	twitter,
	vimeo,
	vk,
	wordpress,
	yelp,
	youtube,
} from './wordpress/social';
import { DragBlockLastSubmit, sparkles } from './wordpress/temp';
const DragBlockLastToggle = (
    <SVG viewBox="0 0 21.51 21.25" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0,2.963v15.584h21.51V2.963H0z M15.722,3.511l-4.969,4.966L5.206,3.511H15.722z M2.912,5.993 l5.992,5.19l-5.992,4.589C2.912,15.772,2.912,5.993,2.912,5.993z M18.597,18.033H2.912v-1.41l6.403-4.926l1.438,1.438l1.507-1.438 l6.337,4.926V18.033z M18.597,15.772l-5.822-4.725l5.822-5.755V15.772z"></Path>
    </SVG>
)
const DragBlockLastHas = (
    <SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <Path d="M38.9,8.1A20.9,20.9,0,0,0,3.2,22.8,19.8,19.8,0,0,0,6,33.2L3,44l11.1-2.9a20.3,20.3,0,0,0,10,2.5A20.8,20.8,0,0,0,38.9,8.1Zm-14.8,32a17.1,17.1,0,0,1-9.5-2.8L8,39.1l1.8-6.4a17.9,17.9,0,0,1-3.1-9.9A17.4,17.4,0,1,1,24.1,40.1Z"></Path>
        <Path d="M33.6,27.2A29.2,29.2,0,0,0,30,25.5c-.4-.2-.8-.3-1.1.2s-1.4,1.7-1.7,2.1a.8.8,0,0,1-1.1.1,15.2,15.2,0,0,1-4.2-2.6A15,15,0,0,1,19,21.7a.7.7,0,0,1,.2-1l.8-1a3.5,3.5,0,0,0,.5-.8.9.9,0,0,0,0-.9c-.2-.3-1.2-2.8-1.6-3.9s-.9-.9-1.2-.9h-1a1.7,1.7,0,0,0-1.4.7,5.5,5.5,0,0,0-1.8,4.3,10.4,10.4,0,0,0,2.1,5.4c.3.3,3.7,5.6,8.9,7.8a16.4,16.4,0,0,0,3,1.1,6.4,6.4,0,0,0,3.3.2c1-.1,3.1-1.2,3.5-2.4s.5-2.3.3-2.5A2.1,2.1,0,0,0,33.6,27.2Z"></Path>
    </SVG>
)
const DragBlockLastHelp = (
    <SVG viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <Path d="M23.446 18l0.889-5.791h-5.557v-3.758c0-1.584 0.776-3.129 3.265-3.129h2.526v-4.93c0 0-2.292-0.391-4.484-0.391-4.576 0-7.567 2.774-7.567 7.795v4.414h-5.087v5.791h5.087v14h6.26v-14z"></Path>
    </SVG>
)
export const DragBlockLastTheme = (
    <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"></Path>
    </SVG>
)
const DragBlockLastRequest = [
	{
		isDefault: true,
		name: 'wordpress',
		title: 'WordPress',
		icon: wordpress,
		categories: [ 'logos' ],
	},
	{
		name: 'fivehundredpx',
		title: '500px',
		icon: fivehundredpx,
		categories: [ 'logos' ],
	},
	{
		name: 'amazon',
		title: 'Amazon',
		icon: amazon,
		categories: [ 'logos' ],
	},
	{
		name: 'bandcamp',
		title: 'Bandcamp',
		icon: bandcamp,
		categories: [ 'logos' ],
	},
	{
		name: 'behance',
		title: 'Behance',
		icon: behance,
		categories: [ 'logos' ],
	},
	{
		name: 'chain',
		title: 'Link',
		icon: chain,
	},
	{
		name: 'codepen',
		title: 'CodePen',
		icon: codepen,
		categories: [ 'logos' ],
	},
	{
		name: 'deviantart',
		title: 'DeviantArt',
		icon: deviantart,
		categories: [ 'logos' ],
	},
	{
		name: 'dribbble',
		title: 'Dribbble',
		icon: dribbble,
		categories: [ 'logos' ],
	},
	{
		name: 'dropbox',
		title: 'Dropbox',
		icon: dropbox,
		categories: [ 'logos' ],
	},
	{
		name: 'etsy',
		title: 'Etsy',
		icon: etsy,
		categories: [ 'logos' ],
	},
	{
		name: 'facebook',
		title: 'Facebook',
		icon: facebook,
		categories: [ 'logos' ],
	},
	{
		name: 'facebook-f',
		title: 'Facebook F',
		icon: DragBlockLastHelp,
		categories: [ 'logos' ],
	},
	{
		name: 'feed',
		title: 'RSS Feed',
		icon: feed,
		categories: [ 'logos' ],
	},
	{
		name: 'flickr',
		title: 'Flickr',
		icon: flickr,
		categories: [ 'logos' ],
	},
	{
		name: 'foursquare',
		title: 'Foursquare',
		icon: foursquare,
		categories: [ 'logos' ],
	},
	{
		name: 'goodreads',
		title: 'Goodreads',
		icon: goodreads,
		categories: [ 'logos' ],
	},
	{
		name: 'google',
		title: 'Google',
		icon: google,
		categories: [ 'logos' ],
	},
	{
		name: 'github',
		title: 'GitHub',
		icon: github,
		categories: [ 'logos' ],
	},
	{
		name: 'gmail',
		title: 'Gmail',
		icon: DragBlockLastToggle,
		categories: [ 'logos' ],
	},
	{
		name: 'instagram',
		title: 'Instagram',
		icon: instagram,
		categories: [ 'logos' ],
	},
	{
		name: 'lastfm',
		title: 'Last.fm',
		icon: lastfm,
		categories: [ 'logos' ],
	},
	{
		name: 'linkedin',
		title: 'LinkedIn',
		icon: linkedin,
		categories: [ 'logos' ],
	},
	{
		name: 'mail',
		title: 'Mail',
		keywords: [ 'email', 'e-mail' ],
		icon: mail,
	},
	{
		name: 'mastodon',
		title: 'Mastodon',
		icon: mastodon,
		categories: [ 'logos' ],
	},
	{
		name: 'meetup',
		title: 'Meetup',
		icon: meetup,
		categories: [ 'logos' ],
	},
	{
		name: 'medium',
		title: 'Medium',
		icon: medium,
		categories: [ 'logos' ],
	},
	{
		name: 'patreon',
		title: 'Patreon',
		icon: patreon,
		categories: [ 'logos' ],
	},
	{
		name: 'pinterest',
		title: 'Pinterest',
		icon: pinterest,
		categories: [ 'logos' ],
	},
	{
		name: 'pocket',
		title: 'Pocket',
		icon: pocket,
		categories: [ 'logos' ],
	},
	{
		name: 'reddit-solid',
		title: 'Reddit Solid',
		icon: DragBlockLastBytes,
		categories: [ 'logos' ],
	},
	{
		name: 'reddit',
		title: 'Reddit',
		icon: reddit,
		categories: [ 'logos' ],
	},
	{
		name: 'skype',
		title: 'Skype',
		icon: skype,
		categories: [ 'logos' ],
	},
	{
		name: 'snapchat',
		title: 'Snapchat',
		icon: snapchat,
		categories: [ 'logos' ],
	},
	{
		name: 'soundcloud',
		title: 'SoundCloud',
		icon: soundcloud,
		categories: [ 'logos' ],
	},
	{
		name: 'spotify',
		title: 'Spotify',
		icon: spotify,
		categories: [ 'logos' ],
	},
	{
		name: 'telegram',
		title: 'Telegram',
		icon: telegram,
		categories: [ 'logos' ],
	},
	{
		name: 'tiktok',
		title: 'TikTok',
		icon: tiktok,
		categories: [ 'logos' ],
	},
	{
		name: 'tumblr',
		title: 'Tumblr',
		icon: tumblr,
		categories: [ 'logos' ],
	},
	{
		name: 'twitch',
		title: 'Twitch',
		icon: twitch,
		categories: [ 'logos' ],
	},
	{
		isDefault: true,
		name: 'twitter',
		title: 'Twitter',
		icon: twitter,
		categories: [ 'logos' ],
	},
	{
		name: 'vimeo',
		title: 'Vimeo',
		icon: vimeo,
		categories: [ 'logos' ],
	},
	{
		name: 'vk',
		title: 'VK',
		icon: vk,
		categories: [ 'logos' ],
	},
	{
		name: 'whatsapp',
		title: 'WhatsApp',
		icon: DragBlockLastHas,
		categories: [ 'logos' ],
	},
	{
		name: 'yelp',
		title: 'Yelp',
		icon: yelp,
		categories: [ 'logos' ],
	},
	{
		name: 'youtube',
		title: 'YouTube',
		icon: youtube,
		categories: [ 'logos' ],
	},
];
const DragBlockLastCancel = [
	{
		name: 'addCard',
		title: __( 'Add Card', 'dragblock' ),
		icon: addCard,
	},
	{
		name: 'addSubmenu',
		title: __( 'Add Submenu', 'dragblock' ),
		icon: addSubmenu,
		categories: [ 'arrows' ],
	},
	{
		name: 'alignCenter',
		title: __( 'Align Center', 'dragblock' ),
		icon: alignCenter,
		categories: [ 'editor' ],
	},
	{
		name: 'alignJustify',
		title: __( 'Align Justify', 'dragblock' ),
		icon: alignJustify,
		categories: [ 'editor' ],
	},
	{
		name: 'alignLeft',
		title: __( 'Align Left', 'dragblock' ),
		icon: alignLeft,
		categories: [ 'editor' ],
	},
	{
		name: 'alignNone',
		title: __( 'Align None', 'dragblock' ),
		icon: alignNone,
		categories: [ 'editor' ],
	},
	{
		name: 'alignRight',
		title: __( 'Align Right', 'dragblock' ),
		icon: alignRight,
		categories: [ 'editor' ],
	},
	{
		name: 'archive',
		title: __( 'Archive', 'dragblock' ),
		icon: archive,
		categories: [ 'blocks' ],
	},
	{
		name: 'arrowDown',
		title: __( 'Arrow Down', 'dragblock' ),
		icon: arrowDown,
		categories: [ 'arrows' ],
	},
	{
		name: 'arrowLeft',
		title: __( 'Arrow Left', 'dragblock' ),
		icon: arrowLeft,
		categories: [ 'arrows' ],
	},
	{
		name: 'arrowRight',
		title: __( 'Arrow Right', 'dragblock' ),
		icon: arrowRight,
		categories: [ 'arrows' ],
	},
	{
		name: 'arrowUp',
		title: __( 'Arrow Up', 'dragblock' ),
		icon: arrowUp,
		categories: [ 'arrows' ],
	},
	{
		name: 'atSymbol',
		title: __( 'At Symbol', 'dragblock' ),
		icon: atSymbol,
	},
	{
		name: 'aspectRatio',
		title: __( 'Aspect Ratio', 'dragblock' ),
		icon: aspectRatio,
		categories: [ 'media' ],
	},
	{
		name: 'audio',
		title: __( 'Audio', 'dragblock' ),
		icon: audio,
		categories: [ 'media' ],
	},
	{
		name: 'backup',
		title: __( 'Backup', 'dragblock' ),
		icon: backup,
	},
	{
		name: 'blockDefault',
		title: __( 'Block Default', 'dragblock' ),
		icon: blockDefault,
		categories: [ 'blocks' ],
	},
	{
		name: 'blockTable',
		title: __( 'Block Table', 'dragblock' ),
		icon: blockTable,
	},
	{
		name: 'box',
		title: __( 'Box', 'dragblock' ),
		icon: box,
	},
	{
		name: 'brush',
		title: __( 'Brush', 'dragblock' ),
		icon: brush,
	},
	{
		name: 'bug',
		title: __( 'Bug', 'dragblock' ),
		icon: bug,
	},
	{
		name: 'button',
		title: __( 'Button', 'dragblock' ),
		icon: button,
		categories: [ 'blocks' ],
	},
	{
		name: 'buttons',
		title: __( 'Buttons', 'dragblock' ),
		icon: buttons,
		categories: [ 'blocks' ],
	},
	{
		name: 'calendar',
		title: __( 'Calendar', 'dragblock' ),
		icon: calendar,
		categories: [ 'blocks' ],
	},
	{
		name: 'cancelCircleFilled',
		title: __( 'Cancel - Circle Filled', 'dragblock' ),
		icon: cancelCircleFilled,
	},
	{
		name: 'capturePhoto',
		title: __( 'Capture Photo', 'dragblock' ),
		icon: capturePhoto,
		categories: [ 'media' ],
	},
	{
		name: 'captureVideo',
		title: __( 'Capture Video', 'dragblock' ),
		icon: captureVideo,
		categories: [ 'media' ],
	},
	{
		name: 'solidPlay',
		title: __( 'Solid Play', 'dragblock' ),
		icon: DragBlockLastTheme,
		categories: [ 'media' ],
	},
	{
		name: 'category',
		title: __( 'Category', 'dragblock' ),
		icon: category,
		categories: [ 'blocks' ],
	},
	{
		name: 'chartBar',
		title: __( 'Chart Bar', 'dragblock' ),
		icon: chartBar,
	},
	{
		name: 'check',
		title: __( 'Check', 'dragblock' ),
		icon: check,
	},
	{
		name: 'chevronDown',
		title: __( 'Chevron Down', 'dragblock' ),
		icon: chevronDown,
		categories: [ 'arrows' ],
	},
	{
		name: 'chevronLeft',
		title: __( 'Chevron Left', 'dragblock' ),
		icon: chevronLeft,
		categories: [ 'arrows' ],
	},
	{
		name: 'chevronRight',
		title: __( 'Chevron Right', 'dragblock' ),
		icon: chevronRight,
		categories: [ 'arrows' ],
	},
	{
		name: 'chevronRightSmall',
		title: __( 'Chevron Right - Small', 'dragblock' ),
		icon: chevronRightSmall,
		categories: [ 'arrows' ],
	},
	{
		name: 'chevronUp',
		title: __( 'Chevron Up', 'dragblock' ),
		icon: chevronUp,
		categories: [ 'arrows' ],
	},
	{
		name: 'classic',
		title: __( 'Classic', 'dragblock' ),
		icon: classic,
		categories: [ 'blocks' ],
	},
	{
		name: 'close',
		title: __( 'Close', 'dragblock' ),
		icon: close,
	},
	{
		name: 'closeSmall',
		title: __( 'Close - Small', 'dragblock' ),
		icon: closeSmall,
	},
	{
		name: 'cloudUpload',
		title: __( 'Cloud Upload', 'dragblock' ),
		icon: cloudUpload,
		categories: [ 'arrows' ],
	},
	{
		name: 'cloud',
		title: __( 'Cloud', 'dragblock' ),
		icon: cloud,
	},
	{
		name: 'code',
		title: __( 'Code', 'dragblock' ),
		icon: code,
		categories: [ 'blocks' ],
	},
	{
		name: 'cog',
		title: __( 'Cog', 'dragblock' ),
		icon: cog,
	},
	{
		name: 'color',
		title: __( 'Color', 'dragblock' ),
		icon: color,
	},
	{
		name: 'column',
		title: __( 'Column', 'dragblock' ),
		icon: column,
		categories: [ 'blocks' ],
	},
	{
		name: 'columns',
		title: __( 'Columns', 'dragblock' ),
		icon: columns,
		categories: [ 'blocks' ],
	},
	{
		name: 'comment',
		title: __( 'Comment', 'dragblock' ),
		icon: comment,
		categories: [ 'blocks' ],
	},
	{
		name: 'commentAuthorAvatar',
		title: __( 'Comment Author Avatar', 'dragblock' ),
		icon: commentAuthorAvatar,
		categories: [ 'blocks' ],
	},
	{
		name: 'commentAuthorName',
		title: __( 'Comment Author Name', 'dragblock' ),
		icon: commentAuthorName,
		categories: [ 'blocks' ],
	},
	{
		name: 'commentContent',
		title: __( 'Comment Content', 'dragblock' ),
		icon: commentContent,
		categories: [ 'blocks' ],
	},
	{
		name: 'DragBlockLastSubmit',
		title: __( 'Comment Edit Link', 'dragblock' ),
		icon: DragBlockLastSubmit,
		categories: [ 'blocks' ],
	},
	{
		name: 'commentReplyLink',
		title: __( 'Comment Reply Link', 'dragblock' ),
		icon: commentReplyLink,
		categories: [ 'blocks' ],
	},
	{
		name: 'cover',
		title: __( 'Cover', 'dragblock' ),
		icon: cover,
		categories: [ 'blocks' ],
	},
	{
		name: 'create',
		title: __( 'Create', 'dragblock' ),
		icon: create,
	},
	{
		name: 'crop',
		title: __( 'Crop', 'dragblock' ),
		icon: crop,
	},
	{
		name: 'currencyDollar',
		title: __( 'Currency Dollar', 'dragblock' ),
		icon: currencyDollar,
	},
	{
		name: 'currencyEuro',
		title: __( 'Currency Euro', 'dragblock' ),
		icon: currencyEuro,
	},
	{
		name: 'currencyPound',
		title: __( 'Currency Pound', 'dragblock' ),
		icon: currencyPound,
	},
	{
		name: 'customPostType',
		title: __( 'Custom Post Type', 'dragblock' ),
		icon: customPostType,
	},
	{
		name: 'desktop',
		title: __( 'Desktop', 'dragblock' ),
		icon: desktop,
		categories: [ 'devices' ],
	},
	{
		name: 'dragHandle',
		title: __( 'Drag Handle', 'dragblock' ),
		icon: dragHandle,
	},
	{
		name: 'download',
		title: __( 'Download', 'dragblock' ),
		icon: download,
		categories: [ 'arrows' ],
	},
	{
		name: 'edit',
		title: __( 'Edit', 'dragblock' ),
		icon: edit,
	},
	{
		name: 'external',
		title: __( 'External', 'dragblock' ),
		icon: external,
	},
	{
		name: 'file',
		title: __( 'File', 'dragblock' ),
		icon: file,
	},
	{
		name: 'flipHorizontal',
		title: __( 'Flip Horizontal', 'dragblock' ),
		icon: flipHorizontal,
	},
	{
		name: 'flipVertical',
		title: __( 'Flip Vertical', 'dragblock' ),
		icon: flipVertical,
	},
	{
		name: 'formatBold',
		title: __( 'Format Bold', 'dragblock' ),
		icon: formatBold,
		categories: [ 'editor' ],
	},
	{
		name: 'formatCapitalize',
		title: __( 'Format Capitalize', 'dragblock' ),
		icon: formatCapitalize,
		categories: [ 'editor' ],
	},
	{
		name: 'formatIndent',
		title: __( 'Format Indent', 'dragblock' ),
		icon: formatIndent,
		categories: [ 'editor' ],
	},
	{
		name: 'formatIndentRTL',
		title: __( 'Format Indent RTL', 'dragblock' ),
		icon: formatIndentRTL,
	},
	{
		name: 'formatItalic',
		title: __( 'Format Italic', 'dragblock' ),
		icon: formatItalic,
		categories: [ 'editor' ],
	},
	{
		name: 'formatListBullets',
		title: __( 'Format List Bullets', 'dragblock' ),
		icon: formatListBullets,
		categories: [ 'editor' ],
	},
	{
		name: 'formatListBulletsRTL',
		title: __( 'Format List Bullets RTL', 'dragblock' ),
		icon: formatListBulletsRTL,
		categories: [ 'editor' ],
	},
	{
		name: 'formatListNumbered',
		title: __( 'Format List Numbered', 'dragblock' ),
		icon: formatListNumbered,
		categories: [ 'editor' ],
	},
	{
		name: 'formatListNumberedRTL',
		title: __( 'Format List Numbered RTL', 'dragblock' ),
		icon: formatListNumberedRTL,
		categories: [ 'editor' ],
	},
	{
		name: 'formatLtr',
		title: __( 'Format LTR', 'dragblock' ),
		icon: formatLtr,
		categories: [ 'editor' ],
	},
	{
		name: 'formatLowercase',
		title: __( 'Format Lowercase', 'dragblock' ),
		icon: formatLowercase,
		categories: [ 'editor' ],
	},
	{
		name: 'formatOutdent',
		title: __( 'Format Outdent', 'dragblock' ),
		icon: formatOutdent,
		categories: [ 'editor' ],
	},
	{
		name: 'formatOutdentRTL',
		title: __( 'Format Outdent RTL', 'dragblock' ),
		icon: formatOutdentRTL,
		categories: [ 'editor' ],
	},
	{
		name: 'formatRtl',
		title: __( 'Format RTL', 'dragblock' ),
		icon: formatRtl,
		categories: [ 'editor' ],
	},
	{
		name: 'formatStrikethrough',
		title: __( 'Format Strikethrough', 'dragblock' ),
		icon: formatStrikethrough,
		categories: [ 'editor' ],
	},
	{
		name: 'formatUnderline',
		title: __( 'Format Underline', 'dragblock' ),
		icon: formatUnderline,
		categories: [ 'editor' ],
	},
	{
		name: 'formatUppercase',
		title: __( 'Format Uppercase', 'dragblock' ),
		icon: formatUppercase,
		categories: [ 'editor' ],
	},
	{
		name: 'fullscreen',
		title: __( 'Fullscreen', 'dragblock' ),
		icon: fullscreen,
		categories: [ 'editor' ],
	},
	{
		name: 'gallery',
		title: __( 'Gallery', 'dragblock' ),
		icon: gallery,
		categories: [ 'blocks', 'media' ],
	},
	{
		name: 'globe',
		title: __( 'Globe', 'dragblock' ),
		icon: globe,
	},
	{
		name: 'grid',
		title: __( 'Grid', 'dragblock' ),
		icon: grid,
	},
	{
		name: 'group',
		title: __( 'Group', 'dragblock' ),
		icon: group,
		categories: [ 'blocks' ],
	},
	{
		name: 'handle',
		title: __( 'Handle', 'dragblock' ),
		icon: handle,
	},
	{
		name: 'heading',
		title: __( 'Heading', 'dragblock' ),
		icon: heading,
		categories: [ 'blocks' ],
	},
	{
		name: 'help',
		title: __( 'Help', 'dragblock' ),
		icon: help,
	},
	{
		name: 'helpFilled',
		title: __( 'Help - Filled', 'dragblock' ),
		icon: helpFilled,
	},
	{
		name: 'inbox',
		title: __( 'Inbox', 'dragblock' ),
		icon: inbox,
	},
	{
		name: 'institution',
		title: __( 'Institution', 'dragblock' ),
		icon: institution,
	},
	{
		name: 'home',
		title: __( 'Home', 'dragblock' ),
		icon: home,
		categories: [ 'blocks' ],
	},
	{
		name: 'html',
		title: __( 'HTML', 'dragblock' ),
		icon: html,
		categories: [ 'blocks' ],
	},
	{
		isDefault: true,
		name: 'image',
		title: __( 'Image', 'dragblock' ),
		icon: image,
		categories: [ 'blocks', 'media' ],
	},
	{
		name: 'info',
		title: __( 'Info', 'dragblock' ),
		icon: info,
	},
	{
		name: 'insertAfter',
		title: __( 'Insert After', 'dragblock' ),
		icon: insertAfter,
		categories: [ 'editor' ],
	},
	{
		name: 'insertBefore',
		title: __( 'Insert Before', 'dragblock' ),
		icon: insertBefore,
		categories: [ 'editor' ],
	},
	{
		name: 'justifyLeft',
		title: __( 'Justify Left', 'dragblock' ),
		icon: justifyLeft,
		categories: [ 'editor' ],
	},
	{
		name: 'justifyCenter',
		title: __( 'Justify Center', 'dragblock' ),
		icon: justifyCenter,
		categories: [ 'editor' ],
	},
	{
		name: 'justifyRight',
		title: __( 'Justify Right', 'dragblock' ),
		icon: justifyRight,
		categories: [ 'editor' ],
	},
	{
		name: 'justifySpaceBetween',
		title: __( 'Justify Space Between', 'dragblock' ),
		icon: justifySpaceBetween,
		categories: [ 'editor' ],
	},
	{
		name: 'key',
		title: __( 'Key', 'dragblock' ),
		icon: key,
	},
	{
		name: 'keyboardClose',
		title: __( 'Keyboard Close', 'dragblock' ),
		icon: keyboardClose,
		categories: [ 'editor' ],
	},
	{
		name: 'keyboardReturn',
		title: __( 'Keyboard Return', 'dragblock' ),
		icon: keyboardReturn,
		categories: [ 'editor' ],
	},
	{
		name: 'layout',
		title: __( 'Layout', 'dragblock' ),
		icon: layout,
	},
	{
		name: 'lifesaver',
		title: __( 'Lifesaver', 'dragblock' ),
		icon: lifesaver,
	},
	{
		name: 'link',
		title: __( 'Link', 'dragblock' ),
		icon: link,
		categories: [ 'editor' ],
	},
	{
		name: 'linkOff',
		title: __( 'Link Off', 'dragblock' ),
		icon: linkOff,
		categories: [ 'editor' ],
	},
	{
		name: 'list',
		title: __( 'List', 'dragblock' ),
		icon: list,
		categories: [ 'blocks' ],
	},
	{
		name: 'listView',
		title: __( 'List View', 'dragblock' ),
		icon: listView,
		categories: [ 'editor' ],
	},
	{
		name: 'lock',
		title: __( 'Lock', 'dragblock' ),
		icon: lock,
		categories: [ 'editor' ],
	},
	{
		name: 'login',
		title: __( 'Login', 'dragblock' ),
		icon: login,
	},
	{
		name: 'loop',
		title: __( 'Loop', 'dragblock' ),
		icon: loop,
		categories: [ 'blocks' ],
	},
	{
		name: 'mapMarker',
		title: __( 'Map Marker', 'dragblock' ),
		icon: mapMarker,
	},
	{
		name: 'media',
		title: __( 'Media', 'dragblock' ),
		icon: media,
		categories: [ 'blocks', 'media' ],
	},
	{
		name: 'mediaAndText',
		title: __( 'Media & Text', 'dragblock' ),
		icon: mediaAndText,
		categories: [ 'blocks', 'media' ],
	},
	{
		name: 'megaphone',
		title: __( 'Megaphone', 'dragblock' ),
		icon: megaphone,
	},
	{
		name: 'menu',
		title: __( 'Menu', 'dragblock' ),
		icon: menu,
	},
	{
		name: 'mobile',
		title: __( 'Mobile', 'dragblock' ),
		icon: mobile,
		categories: [ 'devices' ],
	},
	{
		name: 'more',
		title: __( 'More', 'dragblock' ),
		icon: more,
	},
	{
		name: 'moreHorizontal',
		title: __( 'More Horizontal', 'dragblock' ),
		icon: moreHorizontal,
	},
	{
		name: 'moreHorizontalMobile',
		title: __( 'More Horizontal - Mobile', 'dragblock' ),
		icon: moreHorizontalMobile,
	},
	{
		name: 'moreVertical',
		title: __( 'More Vertical', 'dragblock' ),
		icon: moreVertical,
	},
	{
		name: 'moveTo',
		title: __( 'Move To', 'dragblock' ),
		icon: moveTo,
		categories: [ 'arrows' ],
	},
	{
		name: 'navigation',
		title: __( 'Navigation', 'dragblock' ),
		icon: navigation,
	},
	{
		name: 'overlayText',
		title: __( 'Overlay Text', 'dragblock' ),
		icon: overlayText,
	},
	{
		name: 'pageBreak',
		title: __( 'Page Break', 'dragblock' ),
		icon: pageBreak,
	},
	{
		name: 'customLink',
		title: __( 'Custom Link', 'dragblock' ),
		icon: customLink,
	},
	{
		name: 'page',
		title: __( 'Page', 'dragblock' ),
		icon: page,
	},
	{
		name: 'pages',
		title: __( 'Pages', 'dragblock' ),
		icon: pages,
	},
	{
		name: 'paragraph',
		title: __( 'Paragraph', 'dragblock' ),
		icon: paragraph,
	},
	{
		name: 'payment',
		title: __( 'Payment', 'dragblock' ),
		icon: payment,
	},
	{
		name: 'percent',
		title: __( 'Percent', 'dragblock' ),
		icon: percent,
	},
	{
		name: 'positionCenter',
		title: __( 'Position Center', 'dragblock' ),
		icon: positionCenter,
	},
	{
		name: 'positionLeft',
		title: __( 'Position Left', 'dragblock' ),
		icon: positionLeft,
	},
	{
		name: 'positionRight',
		title: __( 'Position Right', 'dragblock' ),
		icon: positionRight,
	},
	{
		name: 'post',
		title: __( 'Post', 'dragblock' ),
		icon: post,
	},
	{
		name: 'pencil',
		title: __( 'Pencil', 'dragblock' ),
		icon: pencil,
	},
	{
		name: 'people',
		title: __( 'People', 'dragblock' ),
		icon: people,
	},
	{
		name: 'pin',
		title: __( 'Pin', 'dragblock' ),
		icon: pin,
	},
	{
		name: 'plugins',
		title: __( 'Plugins', 'dragblock' ),
		icon: plugins,
	},
	{
		name: 'plusCircleFilled',
		title: __( 'Plus Circle - Filled', 'dragblock' ),
		icon: plusCircleFilled,
	},
	{
		name: 'plusCircle',
		title: __( 'Plus Circle', 'dragblock' ),
		icon: plusCircle,
	},
	{
		name: 'plus',
		title: __( 'Plus', 'dragblock' ),
		icon: plus,
	},
	{
		name: 'postAuthor',
		title: __( 'Post Author', 'dragblock' ),
		icon: postAuthor,
		categories: [ 'blocks' ],
	},
	{
		name: 'postCategories',
		title: __( 'Post Categories', 'dragblock' ),
		icon: postCategories,
		categories: [ 'blocks' ],
	},
	{
		name: 'postContent',
		title: __( 'Post Content', 'dragblock' ),
		icon: postContent,
		categories: [ 'blocks' ],
	},
	{
		name: 'postComments',
		title: __( 'Post Comments', 'dragblock' ),
		icon: postComments,
		categories: [ 'blocks' ],
	},
	{
		name: 'postCommentsCount',
		title: __( 'Post Comment Count', 'dragblock' ),
		icon: postCommentsCount,
	},
	{
		name: 'postCommentsForm',
		title: __( 'Post Comments Form', 'dragblock' ),
		icon: postCommentsForm,
		categories: [ 'blocks' ],
	},
	{
		name: 'postDate',
		title: __( 'Post Date', 'dragblock' ),
		icon: postDate,
		categories: [ 'blocks' ],
	},
	{
		name: 'postExcerpt',
		title: __( 'Post Excerpt', 'dragblock' ),
		icon: postExcerpt,
		categories: [ 'blocks' ],
	},
	{
		name: 'postFeaturedImage',
		title: __( 'Post Featured Image', 'dragblock' ),
		icon: postFeaturedImage,
		categories: [ 'blocks' ],
	},
	{
		name: 'postList',
		title: __( 'Post List', 'dragblock' ),
		icon: postList,
		categories: [ 'blocks' ],
	},
	{
		name: 'postTerms',
		title: __( 'Post Terms', 'dragblock' ),
		icon: postTerms,
		categories: [ 'blocks' ],
	},
	{
		name: 'previous',
		title: __( 'Previous', 'dragblock' ),
		icon: previous,
		categories: [ 'arrows' ],
	},
	{
		name: 'next',
		title: __( 'Next', 'dragblock' ),
		icon: next,
		categories: [ 'arrows' ],
	},
	{
		name: 'preformatted',
		title: __( 'Preformatted', 'dragblock' ),
		icon: preformatted,
	},
	{
		name: 'pullLeft',
		title: __( 'Pull Left', 'dragblock' ),
		icon: pullLeft,
	},
	{
		name: 'pullRight',
		title: __( 'Pull Right', 'dragblock' ),
		icon: pullRight,
	},
	{
		name: 'pullquote',
		title: __( 'Pull Quote', 'dragblock' ),
		icon: pullquote,
	},
	{
		name: 'queryPagination',
		title: __( 'Query Pagination', 'dragblock' ),
		icon: queryPagination,
	},
	{
		name: 'queryPaginationNext',
		title: __( 'Query Pagination Next', 'dragblock' ),
		icon: queryPaginationNext,
		categories: [ 'arrows' ],
	},
	{
		name: 'queryPaginationNumbers',
		title: __( 'Query Pagination Numbers', 'dragblock' ),
		icon: queryPaginationNumbers,
	},
	{
		name: 'queryPaginationPrevious',
		title: __( 'Query Pagination Previous', 'dragblock' ),
		icon: queryPaginationPrevious,
		categories: [ 'arrows' ],
	},
	{
		name: 'quote',
		title: __( 'Quote', 'dragblock' ),
		icon: quote,
		categories: [ 'blocks' ],
	},
	{
		name: 'receipt',
		title: __( 'Receipt', 'dragblock' ),
		icon: receipt,
	},
	{
		name: 'redo',
		title: __( 'Redo', 'dragblock' ),
		icon: redo,
		categories: [ 'arrows', 'editor' ],
	},
	{
		name: 'removeBug',
		title: __( 'Remove Bug', 'dragblock' ),
		icon: removeBug,
	},
	{
		name: 'removeSubmenu',
		title: __( 'Remove Submenu', 'dragblock' ),
		icon: removeSubmenu,
	},
	{
		name: 'replace',
		title: __( 'Replace', 'dragblock' ),
		icon: replace,
		categories: [ 'arrows' ],
	},
	{
		name: 'reset',
		title: __( 'Reset', 'dragblock' ),
		icon: reset,
		keywords: [ 'minus' ],
	},
	{
		name: 'resizeCornerNE',
		title: __( 'Resize Corner', 'dragblock' ),
		icon: resizeCornerNE,
		categories: [ 'arrows' ],
	},
	{
		name: 'reusableBlock',
		title: __( 'Reusable Block', 'dragblock' ),
		icon: reusableBlock,
		categories: [ 'arrows' ],
	},
	{
		name: 'rotateLeft',
		title: __( 'Rotate Left', 'dragblock' ),
		icon: rotateLeft,
		categories: [ 'arrows' ],
	},
	{
		name: 'rotateRight',
		title: __( 'Rotate Right', 'dragblock' ),
		icon: rotateRight,
		categories: [ 'arrows' ],
	},
	{
		name: 'row',
		title: __( 'Row', 'dragblock' ),
		icon: row,
	},
	{
		name: 'rss',
		title: __( 'RSS', 'dragblock' ),
		icon: rss,
	},
	{
		name: 'search',
		title: __( 'Search', 'dragblock' ),
		icon: search,
		keywords: [ 'magnifying glass' ],
	},
	{
		name: 'separator',
		title: __( 'Separator', 'dragblock' ),
		icon: separator,
		categories: [ 'blocks' ],
	},
	{
		name: 'settings',
		title: __( 'Settings', 'dragblock' ),
		icon: settings,
	},
	{
		name: 'share',
		title: __( 'Share', 'dragblock' ),
		icon: share,
	},
	{
		name: 'shield',
		title: __( 'Shield', 'dragblock' ),
		icon: shield,
	},
	{
		name: 'shortcode',
		title: __( 'Shortcode', 'dragblock' ),
		icon: shortcode,
		categories: [ 'blocks' ],
	},
	{
		name: 'siteLogo',
		title: __( 'Site Logo', 'dragblock' ),
		icon: siteLogo,
		categories: [ 'blocks', 'media' ],
	},
	{
		isDefault: true,
		name: 'sparkles',
		title: __( 'Sparkles', 'dragblock' ),
		icon: sparkles,
	},
	{
		name: 'stack',
		title: __( 'Stack', 'dragblock' ),
		icon: stack,
	},
	{
		name: 'starEmpty',
		title: __( 'Star Empty', 'dragblock' ),
		icon: starEmpty,
	},
	{
		name: 'starFilled',
		title: __( 'Star Filled', 'dragblock' ),
		icon: starFilled,
	},
	{
		name: 'starHalf',
		title: __( 'Star Half', 'dragblock' ),
		icon: starHalf,
	},
	{
		name: 'store',
		title: __( 'Store', 'dragblock' ),
		icon: store,
	},
	{
		name: 'stretchFullWidth',
		title: __( 'Stretch Full Width', 'dragblock' ),
		icon: stretchFullWidth,
		categories: [ 'editor' ],
	},
	{
		name: 'styles',
		title: __( 'Styles', 'dragblock' ),
		icon: styles,
	},
	{
		isDefault: true,
		name: 'shipping',
		title: __( 'Shipping', 'dragblock' ),
		icon: shipping,
		keywords: [ 'truck' ],
	},
	{
		name: 'stretchWide',
		title: __( 'Stretch Wide', 'dragblock' ),
		icon: stretchWide,
		categories: [ 'editor' ],
	},
	{
		name: 'subscript',
		title: __( 'Subscript', 'dragblock' ),
		icon: subscript,
		categories: [ 'editor' ],
	},
	{
		name: 'superscript',
		title: __( 'Superscript', 'dragblock' ),
		icon: superscript,
		categories: [ 'editor' ],
	},
	{
		name: 'swatch',
		title: __( 'Swatch', 'dragblock' ),
		icon: swatch,
	},
	{
		name: 'symbol',
		title: __( 'Symbol', 'dragblock' ),
		icon: symbol,
	},
	{
		name: 'symbolFilled',
		title: __( 'Symbol - Filled', 'dragblock' ),
		icon: symbolFilled,
	},
	{
		name: 'tableColumnAfter',
		title: __( 'Table Column After', 'dragblock' ),
		icon: tableColumnAfter,
		categories: [ 'editor' ],
	},
	{
		name: 'tableColumnBefore',
		title: __( 'Table Column Before', 'dragblock' ),
		icon: tableColumnBefore,
		categories: [ 'editor' ],
	},
	{
		name: 'tableColumnDelete',
		title: __( 'Table Column Delete', 'dragblock' ),
		icon: tableColumnDelete,
		categories: [ 'editor' ],
	},
	{
		name: 'tableRowAfter',
		title: __( 'Table Row After', 'dragblock' ),
		icon: tableRowAfter,
		categories: [ 'editor' ],
	},
	{
		name: 'tableRowBefore',
		title: __( 'Table Row Before', 'dragblock' ),
		icon: tableRowBefore,
		categories: [ 'editor' ],
	},
	{
		name: 'tableRowDelete',
		title: __( 'Table Row Delete', 'dragblock' ),
		icon: tableRowDelete,
		categories: [ 'editor' ],
	},
	{
		name: 'table',
		title: __( 'Table', 'dragblock' ),
		icon: table,
	},
	{
		name: 'tag',
		title: __( 'Tag', 'dragblock' ),
		icon: tag,
	},
	{
		name: 'termDescription',
		title: __( 'Term Description', 'dragblock' ),
		icon: termDescription,
		categories: [ 'blocks' ],
	},
	{
		name: 'footer',
		title: __( 'Footer', 'dragblock' ),
		icon: footer,
	},
	{
		name: 'header',
		title: __( 'Header', 'dragblock' ),
		icon: header,
	},
	{
		name: 'sidebar',
		title: __( 'Sidebar', 'dragblock' ),
		icon: sidebar,
	},
	{
		name: 'textColor',
		title: __( 'Text Color', 'dragblock' ),
		icon: textColor,
	},
	{
		name: 'tablet',
		title: __( 'Tablet', 'dragblock' ),
		icon: tablet,
		categories: [ 'devices' ],
	},
	{
		name: 'title',
		title: __( 'Title', 'dragblock' ),
		icon: title,
	},
	{
		name: 'tip',
		title: __( 'Tip', 'dragblock' ),
		icon: tip,
	},
	{
		name: 'tool',
		title: __( 'Tool', 'dragblock' ),
		icon: tool,
	},
	{
		name: 'trash',
		title: __( 'Trash', 'dragblock' ),
		icon: trash,
	},
	{
		name: 'trendingDown',
		title: __( 'Trending Down', 'dragblock' ),
		icon: trendingDown,
		categories: [ 'arrows' ],
	},
	{
		name: 'trendingUp',
		title: __( 'Trending Up', 'dragblock' ),
		icon: trendingUp,
		categories: [ 'arrows' ],
	},
	{
		name: 'typography',
		title: __( 'Typography', 'dragblock' ),
		icon: typography,
	},
	{
		name: 'undo',
		title: __( 'Undo', 'dragblock' ),
		icon: undo,
		categories: [ 'arrows', 'editor' ],
	},
	{
		name: 'ungroup',
		title: __( 'Ungroup', 'dragblock' ),
		icon: ungroup,
		categories: [ 'editor' ],
	},
	{
		name: 'unlock',
		title: __( 'Unlock', 'dragblock' ),
		icon: unlock,
		categories: [ 'editor' ],
	},
	{
		name: 'update',
		title: __( 'Update', 'dragblock' ),
		icon: update,
	},
	{
		name: 'upload',
		title: __( 'Upload', 'dragblock' ),
		icon: upload,
		categories: [ 'arrows' ],
	},
	{
		isDefault: true,
		name: 'verse',
		title: __( 'Verse', 'dragblock' ),
		icon: verse,
		categories: [ 'blocks' ],
	},
	{
		name: 'video',
		title: __( 'Video', 'dragblock' ),
		icon: video,
		categories: [ 'media' ],
	},
	{
		name: 'warning',
		title: __( 'Warning', 'dragblock' ),
		icon: warning,
	},
	{
		name: 'widget',
		title: __( 'Widget', 'dragblock' ),
		icon: widget,
	},
];
const icons = [
	{
		isDefault: false,
		type: 'wordpress',
		title: __( 'WordPress', 'dragblock' ),
		icons: [].concat( DragBlockLastRequest, DragBlockLastCancel ),
		categories: [
			{
				name: 'arrows',
				title: __( 'Arrows', 'dragblock' ),
			},
			{
				name: 'blocks',
				title: __( 'Blocks', 'dragblock' ),
			},
			{
				name: 'devices',
				title: __( 'Devices', 'dragblock' ),
			},
			{
				name: 'editor',
				title: __( 'Editor', 'dragblock' ),
			},
			{
				name: 'logos',
				title: __( 'Logos', 'dragblock' ),
			},
			{
				name: 'media',
				title: __( 'Media', 'dragblock' ),
			},
		],
	},
];
export default function DragBlockLastForce() {
	return applyFilters( 'iconBlock.icons', icons );
}