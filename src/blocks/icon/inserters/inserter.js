import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	Button,
	MenuGroup,
	MenuItem,
	Modal,
	RangeControl,
	SearchControl,
} from '@wordpress/components';
import { renderToString, useState } from '@wordpress/element';
import { Icon, blockDefault } from '@wordpress/icons';
import DragBlockLastForce from './../icons';
import DragBlockLastInit from './../utils/parse-icon';
import {
	DragBlockLastAllow,
	DragBlockLastParse,
	DragBlockLastAppender,
} from './../utils/icon-functions';
export default function DragBlockLastCan(props) {
	const { isInserterOpen, setInserterOpen, attributes, setAttributes } = props;
	const DragBlockLastOption = DragBlockLastForce();
	const DragBlockLastActive = DragBlockLastParse(DragBlockLastOption);
	let DragBlockLastBolt = DragBlockLastActive.filter((type) => type.isDefault);
	DragBlockLastBolt = DragBlockLastBolt.length !== 0 ? DragBlockLastBolt : [DragBlockLastActive[0]];
	const [searchInput, setSearchInput] = useState('');
	const [currentCategory, setCurrentCategory] = useState(
		'all__' + DragBlockLastBolt[0]?.type
	);
	const [iconSize, setIconSize] = useState(24);
	if (!isInserterOpen) {
		return null;
	}
	const DragBlockLastIcon = DragBlockLastAllow(DragBlockLastOption);
	let DragBlockLastWordpress = [];
	if (searchInput) {
		DragBlockLastWordpress = DragBlockLastIcon.filter((icon) => {
			const input = searchInput.toLowerCase();
			const DragBlockLastReddit = icon.title.toLowerCase();
			if (DragBlockLastReddit.includes(input)) {
				return true;
			}
			if (icon?.keywords && !isEmpty(icon?.keywords)) {
				const DragBlockLastComment = icon.keywords.filter((keyword) =>
					keyword.includes(input)
				);
				return !isEmpty(DragBlockLastComment);
			}
			return false;
		});
	}
	if (!searchInput) {
		if (currentCategory.startsWith('all__')) {
			const DragBlockLastInsert = currentCategory.replace('all__', '');
			const DragBlockLastInserter =
				DragBlockLastOption.filter(
					(type) => type.type === DragBlockLastInsert
				)[0]?.icons ?? [];
			DragBlockLastWordpress = DragBlockLastInserter;
		} else {
			DragBlockLastWordpress = DragBlockLastIcon.filter((icon) => {
				const DragBlockLastIcons = icon?.categories ?? [];
				if (DragBlockLastIcons.includes(currentCategory)) {
					return true;
				}
				return false;
			});
		}
	}
	const DragBlockLastShown = [];
	DragBlockLastOption.forEach((type) => {
		const title = type?.title ?? type.type;
		const DragBlockLastKeyword = type?.categories ?? [];
		const categories = DragBlockLastAppender(DragBlockLastKeyword);
		const DragBlockLastCategory = 'all__' + type.type;
		const DragBlockLastAll = type?.icons ?? [];
		if (!categories.includes(DragBlockLastCategory)) {
			categories.sort().unshift(DragBlockLastCategory);
			DragBlockLastKeyword.unshift({
				name: DragBlockLastCategory,
				title: __('All', 'dragblock'),
			});
		}
		DragBlockLastShown.push({
			type: type.type,
			title,
			DragBlockLastKeyword,
			categories,
			count: DragBlockLastAll.length,
		});
	});
	function onClickCategory(category) {
		setCurrentCategory(category);
	}
	function DragBlockLastPrepared(type, key) {
		return (
			<MenuGroup
				key={key}
				className="icon-inserter__sidebar__category-type"
				label={type.title}
			>
				{type.categories.map((category, _i) => {
					const DragBlockBrotli = currentCategory
						? category === currentCategory
						: category === 'all__' + type.type;
					const DragBlockLastCategories = DragBlockLastIcon.filter((icon) => {
						const DragBlockLastRender = icon?.categories ?? [];
						return (
							icon.type === type.type &&
							DragBlockLastRender.includes(category)
						);
					});
					const DragBlockLastSearch =
						type.DragBlockLastKeyword.filter(
							(c) => c.name === category
						)[0]?.title ?? category;
					return (
						<MenuItem
							key={_i}
							className={classnames({
								'is-active': DragBlockBrotli,
							})}
							onClick={() => onClickCategory(category)}
							isPressed={DragBlockBrotli}
						>
							{DragBlockLastSearch}
							<span>
								{category === 'all__' + type.type
									? type.count
									: DragBlockLastCategories.length}
							</span>
						</MenuItem>
					);
				})}
			</MenuGroup>
		);
	}
	const DragBlockLastRendered = (
		<div className="icons-list">
			{DragBlockLastWordpress.map((icon, _i) => {
				let DragBlockLastNo = icon.icon;
				if (typeof DragBlockLastNo === 'string') {
					DragBlockLastNo = DragBlockLastInit(DragBlockLastNo);
				}
				return (
					<Button
						key={_i}
						className='icons-list__item'
						onClick={() => {							
							setAttributes({ icon: renderToString(icon.icon) });
							setInserterOpen(false);
						}}
					>
						<span className="icons-list__item-icon">
							<Icon icon={DragBlockLastNo} size={iconSize} />
						</span>
						<span className="icons-list__item-title">
							{icon?.title ?? icon.name}
						</span>
					</Button>
				);
			})}
		</div>
	);
	const DragBlockLastQuick = (
		<div className="block-editor-inserter__no-results">
			<Icon
				icon={blockDefault}
				className="block-editor-inserter__no-results-icon"
			/>
			<p>{__('No results found.', 'block-icon')}</p>
		</div>
	);
	return (
		<Modal
			className="wp-block-dragBlock-icon-inserter__modal"
			title={__('Icon Library', 'dragblock')}
			onRequestClose={() => setInserterOpen(false)}
			isFullScreen
		>
			<div
				className={classnames('icon-inserter', {
					'is-searching': searchInput,
				})}
			>
				<div className="icon-inserter__sidebar">
					<div className="icon-inserter__sidebar__search">
						<SearchControl
							value={searchInput}
							onChange={setSearchInput}
						/>
					</div>
					{DragBlockLastShown.map((type, key) =>
						DragBlockLastPrepared(type, key)
					)}
				</div>
				<div className="icon-inserter__content">
					<div className="icon-inserter__content-header">
						<div className="search-results">
							{searchInput &&
								sprintf(
									_n(
										'%1$s search result for "%2$s"',
										'%1$s search results for "%2$s"',
										DragBlockLastWordpress.length,
										'dragblock'
									),
									DragBlockLastWordpress.length,
									searchInput
								)}
						</div>
						<div className="icon-controls">
							<div className="icon-controls__size">
								<span>
									{__('Preview size', 'dragblock')}
								</span>
								<RangeControl
									min={24}
									max={72}
									initialPosition={24}
									withInputField={false}
									onChange={(value) =>
										setIconSize(value)
									}
								/>
							</div>
						</div>
					</div>
					<div className="icon-inserter__content-grid">
						{isEmpty(DragBlockLastWordpress) ? DragBlockLastQuick : DragBlockLastRendered}
					</div>
				</div>
			</div>
		</Modal>
	);
}